"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, Button, FormControl } from "react-bootstrap";
import * as attemptClient from "../../../quizAttemptClient";
import * as quizClient from "../../../quizClient";

export default function QuizTaker({
  cid,
  qid,
  isPreview,
}: {
  cid: string;
  qid: string;
  isPreview: boolean;
}) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const fetchQuiz = async () => {
    const data = await quizClient.findQuizById(qid);
    if (data.shuffleAnswers) {
      data.questions = data.questions.map((q: any) => {
        if (q.type === "MULTIPLE_CHOICE" && q.choices) {
          return { ...q, choices: shuffleArray(q.choices) };
        }
        return q;
      });
    }
    setQuiz(data);
    if (data.timeLimit && data.timeLimit > 0) {
      setTimeLeft(data.timeLimit * 60);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  // Timer
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  if (!quiz) return <div>Loading...</div>;

  const oneAtATime = quiz.oneQuestionAtATime;
  const totalQuestions = quiz.questions.length;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const setAnswer = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    const answerArray = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer,
    }));

    if (isPreview) {
      const graded = answerArray.map((a) => {
        const question = quiz.questions.find(
          (q: any) => q._id === a.questionId,
        );
        if (!question) return { ...a, isCorrect: false, points: 0 };

        let isCorrect = false;
        if (question.type === "MULTIPLE_CHOICE") {
          const choice = question.choices.find((c: any) => c._id === a.answer);
          isCorrect = choice ? choice.isCorrect : false;
        } else if (question.type === "TRUE_FALSE") {
          isCorrect =
            String(question.correctAnswer) === String(a.answer).toLowerCase();
        } else if (question.type === "FILL_IN_BLANK") {
          isCorrect = question.blankAnswers.some(
            (b: string) =>
              b.toLowerCase().trim() === String(a.answer).toLowerCase().trim(),
          );
        }

        return {
          ...a,
          isCorrect,
          points: isCorrect ? question.points : 0,
        };
      });

      const score = graded.reduce((sum: number, a: any) => sum + a.points, 0);
      setResult({ answers: graded, score });
    } else {
      const attempt = await attemptClient.submitAttempt(qid, answerArray);
      setResult(attempt);
    }

    setSubmitted(true);
  };

  const getQuestionResult = (questionId: string) => {
    if (!result) return null;
    return result.answers.find((a: any) => a.questionId === questionId);
  };

  const renderQuestion = (question: any, index: number) => {
    const qResult = getQuestionResult(question._id);

    return (
      <div
        key={question._id}
        className={`border rounded p-3 mb-3 ${
          submitted && qResult
            ? qResult.isCorrect
              ? "border-success"
              : "border-danger"
            : ""
        }`}
      >
        {/* Question header */}
        <div className="d-flex justify-content-between mb-2">
          <strong>Question {index + 1}</strong>
          <span>{question.points} pts</span>
        </div>

        {/* Question text */}
        <div className="mb-3">{question.question}</div>

        {/* Multiple Choice */}
        {question.type === "MULTIPLE_CHOICE" && (
          <div>
            {question.choices.map((choice: any) => (
              <div
                key={choice._id}
                className="d-flex align-items-center gap-2 mb-2"
              >
                <input
                  type="radio"
                  name={`question-${question._id}`}
                  value={choice._id}
                  checked={answers[question._id] === choice._id}
                  onChange={() => setAnswer(question._id, choice._id)}
                  disabled={submitted}
                  style={{ accentColor: "#dc3545" }}
                />
                <span
                  className={
                    submitted && qResult
                      ? choice.isCorrect
                        ? "text-success fw-bold"
                        : answers[question._id] === choice._id &&
                            !qResult.isCorrect
                          ? "text-danger"
                          : ""
                      : ""
                  }
                >
                  {choice.text}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* True/False */}
        {question.type === "TRUE_FALSE" && (
          <div>
            {["true", "false"].map((option) => (
              <div
                key={option}
                className="d-flex align-items-center gap-2 mb-2"
              >
                <input
                  type="radio"
                  name={`question-${question._id}`}
                  value={option}
                  checked={answers[question._id] === option}
                  onChange={() => setAnswer(question._id, option)}
                  disabled={submitted}
                  style={{ accentColor: "#dc3545" }}
                />
                <span
                  className={
                    submitted && qResult
                      ? String(question.correctAnswer) === option
                        ? "text-success fw-bold"
                        : answers[question._id] === option && !qResult.isCorrect
                          ? "text-danger"
                          : ""
                      : ""
                  }
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Fill in Blank */}
        {question.type === "FILL_IN_BLANK" && (
          <div>
            <FormControl
              value={answers[question._id] || ""}
              onChange={(e) => setAnswer(question._id, e.target.value)}
              disabled={submitted}
              placeholder="Type your answer..."
            />
          </div>
        )}

        {/* Result feedback */}
        {submitted && qResult && (
          <div
            className={`mt-2 ${qResult.isCorrect ? "text-success" : "text-danger"}`}
          >
            {qResult.isCorrect
              ? `✓ Correct (+${qResult.points} pts)`
              : "✗ Incorrect (0 pts)"}
          </div>
        )}
      </div>
    );
  };

  return (
    <div id="wd-quiz-taker">
      {isPreview && (
        <Alert variant="danger">
          This is a preview of the published version of the quiz.
        </Alert>
      )}

      <h3>{quiz.title}</h3>

      {quiz.description && (
        <div className="mb-3 text-muted">{quiz.description}</div>
      )}

      {/* Timer */}
      {timeLeft !== null && !submitted && (
        <div className="d-flex justify-content-end mb-3">
          <span
            className={`fs-5 fw-bold ${timeLeft < 60 ? "text-danger" : ""}`}
          >
            Time Left: {formatTime(timeLeft)}
          </span>
        </div>
      )}

      {/* Questions */}
      {!submitted && oneAtATime ? (
        // One question at a time mode
        <div>
          {renderQuestion(
            quiz.questions[currentQuestionIndex],
            currentQuestionIndex,
          )}

          {/* Question navigation */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Button
              variant="secondary"
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
            >
              Previous
            </Button>

            <span className="text-muted">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <Button
                variant="secondary"
                onClick={() =>
                  setCurrentQuestionIndex(currentQuestionIndex + 1)
                }
              >
                Next
              </Button>
            ) : (
              <div style={{ width: "80px" }} />
            )}
          </div>

          <div className="border rounded p-3 mb-3">
            <strong className="mb-2 d-block">Questions:</strong>
            <div className="d-flex flex-wrap gap-2">
              {quiz.questions.map((_: any, index: number) => (
                <Button
                  key={index}
                  variant={
                    index === currentQuestionIndex
                      ? "danger"
                      : answers[quiz.questions[index]._id]
                        ? "outline-success"
                        : "outline-secondary"
                  }
                  size="sm"
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </div>
      ) : !submitted ? (
        // All questions at once mode
        <div>
          {quiz.questions.map((question: any, index: number) =>
            renderQuestion(question, index),
          )}
        </div>
      ) : (
        // After submission, show all questions with results
        <div>
          {quiz.questions.map((question: any, index: number) =>
            renderQuestion(question, index),
          )}
        </div>
      )}

      {/* Submit / Results */}
      {!submitted ? (
        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        </div>
      ) : (
        <div>
          <hr />
          <div className="text-center">
            <h4>
              Score: {result.score} / {quiz.points}
            </h4>
            {isPreview && (
              <Button
                variant="outline-secondary"
                className="mt-3"
                onClick={() =>
                  router.push(`/courses/${cid}/quizzes/${qid}/editor`)
                }
              >
                Keep Editing This Quiz
              </Button>
            )}
            {!isPreview && (
              <Button
                variant="outline-secondary"
                className="mt-3"
                onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}
              >
                Back to Quiz Details
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
