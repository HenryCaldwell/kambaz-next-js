"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as attemptClient from "../../../quizAttemptClient";
import * as quizClient from "../../../quizClient";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  ) as { currentUser: any };

  const [quiz, setQuiz] = useState<any>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [latestAttempt, setLatestAttempt] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const isFaculty = currentUser?.role === "FACULTY";

  const fetchQuiz = async () => {
    const data = await quizClient.findQuizById(qid as string);
    setQuiz(data);
  };

  const fetchAttemptInfo = async () => {
    if (!isFaculty) {
      const countData = await attemptClient.getAttemptCount(qid as string);
      setAttemptCount(countData.count);
      const latest = await attemptClient.getLatestAttempt(qid as string);
      setLatestAttempt(latest);
    }
  };

  useEffect(() => {
    fetchQuiz();
    fetchAttemptInfo();
  }, [qid]);

  if (!quiz) return <div>Loading...</div>;

  const canTakeQuiz = () => {
    if (isFaculty) return false;
    if (!quiz.multipleAttempts && attemptCount >= 1) return false;
    if (quiz.multipleAttempts && attemptCount >= quiz.howManyAttempts)
      return false;
    return true;
  };

  const formatDate = (date: string) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getAnswerForQuestion = (questionId: string) => {
    if (!latestAttempt) return null;
    return latestAttempt.answers.find((a: any) => a.questionId === questionId);
  };

  return (
    <div id="wd-quiz-details">
      {/* Faculty buttons */}
      {isFaculty && (
        <div className="d-flex justify-content-center gap-2 mb-3">
          <Button
            variant="secondary"
            onClick={() =>
              router.push(`/courses/${cid}/quizzes/${qid}/preview`)
            }
          >
            Preview
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/editor`)}
          >
            Edit
          </Button>
        </div>
      )}

      <hr />

      <h3>{quiz.title}</h3>

      {/* Quiz properties table */}
      <table className="table">
        <tbody>
          <tr>
            <td className="text-end" style={{ width: "250px" }}>
              <strong>Quiz Type</strong>
            </td>
            <td>{quiz.quizType || "Graded Quiz"}</td>
          </tr>
          <tr>
            <td className="text-end">
              <strong>Points</strong>
            </td>
            <td>{quiz.points || 0}</td>
          </tr>
          <tr>
            <td className="text-end">
              <strong>Assignment Group</strong>
            </td>
            <td>{quiz.assignmentGroup || "QUIZZES"}</td>
          </tr>
          <tr>
            <td className="text-end">
              <strong>Shuffle Answers</strong>
            </td>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end">
              <strong>Time Limit</strong>
            </td>
            <td>{quiz.timeLimit || 20} Minutes</td>
          </tr>
          <tr>
            <td className="text-end">
              <strong>Multiple Attempts</strong>
            </td>
            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
          </tr>
          {quiz.multipleAttempts && (
            <tr>
              <td className="text-end">
                <strong>How Many Attempts</strong>
              </td>
              <td>{quiz.howManyAttempts || 1}</td>
            </tr>
          )}
          <tr>
            <td className="text-end">
              <strong>Show Correct Answers</strong>
            </td>
            <td>{quiz.showCorrectAnswers || "Immediately"}</td>
          </tr>
          {isFaculty && (
            <tr>
              <td className="text-end">
                <strong>Access Code</strong>
              </td>
              <td>{quiz.accessCode || "—"}</td>
            </tr>
          )}
          <tr>
            <td className="text-end">
              <strong>One Question at a Time</strong>
            </td>
            <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end">
              <strong>Webcam Required</strong>
            </td>
            <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end">
              <strong>Lock Questions After Answering</strong>
            </td>
            <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>

      {/* Dates table */}
      <table className="table">
        <thead>
          <tr>
            <th>Due</th>
            <th>For</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formatDate(quiz.dueDate)}</td>
            <td>Everyone</td>
            <td>{formatDate(quiz.availableDate)}</td>
            <td>{formatDate(quiz.untilDate)}</td>
          </tr>
        </tbody>
      </table>

      {/* Student section */}
      {!isFaculty && (
        <div className="mt-4">
          {latestAttempt && (
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5>
                  Last Attempt Score: {latestAttempt.score} / {quiz.points}
                </h5>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setShowResults(!showResults)}
                >
                  {showResults ? "Hide Results" : "View Results"}
                </Button>
              </div>
              <p className="text-muted">
                Attempts used: {attemptCount}
                {quiz.multipleAttempts ? ` / ${quiz.howManyAttempts}` : " / 1"}
              </p>
              <p className="text-muted">
                Submitted: {formatDate(latestAttempt.submittedAt)}
              </p>
            </div>
          )}

          {/* Past attempt results */}
          {showResults && latestAttempt && (
            <div className="mb-4">
              <h5>Your Answers</h5>
              {quiz.questions.map((question: any, index: number) => {
                const answer = getAnswerForQuestion(question._id);
                const isCorrect = answer?.isCorrect;

                return (
                  <div
                    key={question._id}
                    className={`border rounded p-3 mb-3 ${
                      answer
                        ? isCorrect
                          ? "border-success"
                          : "border-danger"
                        : ""
                    }`}
                  >
                    {/* Question header */}
                    <div className="d-flex justify-content-between mb-2">
                      <strong>Question {index + 1}</strong>
                      <div>
                        {answer && (
                          <span
                            className={
                              isCorrect ? "text-success" : "text-danger"
                            }
                          >
                            {isCorrect
                              ? `✓ ${answer.points} / ${question.points} pts`
                              : `✗ 0 / ${question.points} pts`}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Question text */}
                    <div className="mb-3">{question.question}</div>

                    {/* Multiple Choice answers */}
                    {question.type === "MULTIPLE_CHOICE" && (
                      <div>
                        {question.choices.map((choice: any) => {
                          const wasSelected = answer?.answer === choice._id;
                          let className = "";
                          if (answer) {
                            if (choice.isCorrect) {
                              className = "text-success fw-bold";
                            } else if (wasSelected && !isCorrect) {
                              className = "text-danger";
                            }
                          }

                          return (
                            <div
                              key={choice._id}
                              className="d-flex align-items-center gap-2 mb-2"
                            >
                              <input
                                type="radio"
                                checked={wasSelected}
                                disabled
                                style={{ accentColor: "#dc3545" }}
                              />
                              <span className={className}>
                                {choice.text}
                                {choice.isCorrect &&
                                  quiz.showCorrectAnswers !== "Never" &&
                                  " ✓"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* True/False answers */}
                    {question.type === "TRUE_FALSE" && (
                      <div>
                        {["true", "false"].map((option) => {
                          const wasSelected = answer?.answer === option;
                          const isCorrectOption =
                            String(question.correctAnswer) === option;
                          let className = "";
                          if (answer) {
                            if (isCorrectOption) {
                              className = "text-success fw-bold";
                            } else if (wasSelected && !isCorrect) {
                              className = "text-danger";
                            }
                          }

                          return (
                            <div
                              key={option}
                              className="d-flex align-items-center gap-2 mb-2"
                            >
                              <input
                                type="radio"
                                checked={wasSelected}
                                disabled
                                style={{ accentColor: "#dc3545" }}
                              />
                              <span className={className}>
                                {option.charAt(0).toUpperCase() +
                                  option.slice(1)}
                                {isCorrectOption &&
                                  quiz.showCorrectAnswers !== "Never" &&
                                  " ✓"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Fill in Blank answers */}
                    {question.type === "FILL_IN_BLANK" && (
                      <div>
                        <FormControl
                          value={answer?.answer || ""}
                          disabled
                          className={
                            answer
                              ? isCorrect
                                ? "border-success"
                                : "border-danger"
                              : ""
                          }
                        />
                        {quiz.showCorrectAnswers !== "Never" && !isCorrect && (
                          <div className="text-success mt-1 small">
                            Accepted answers: {question.blankAnswers.join(", ")}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Take quiz button */}
          {canTakeQuiz() ? (
            <div className="d-flex justify-content-center">
              <Button
                variant="danger"
                size="lg"
                onClick={() =>
                  router.push(`/courses/${cid}/quizzes/${qid}/take`)
                }
              >
                {attemptCount > 0 ? "Retake Quiz" : "Start Quiz"}
              </Button>
            </div>
          ) : (
            !latestAttempt && (
              <div className="text-center text-muted">
                <p>No more attempts available.</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
