"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  FormCheck,
  FormControl,
  FormSelect,
  Nav,
  NavItem,
  NavLink,
} from "react-bootstrap";
import * as quizClient from "../../../../quizClient";
import QuestionsEditor from "./QuestionsEditor";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [quiz, setQuiz] = useState<any>(null);

  const fetchQuiz = async () => {
    const data = await quizClient.findQuizById(qid as string);
    setQuiz(data);
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  if (!quiz) return <div>Loading...</div>;

  const handleSave = async () => {
    await quizClient.updateQuiz(qid as string, quiz);
    router.push(`/courses/${cid}/quizzes/${qid}`);
  };

  const handleSaveAndPublish = async () => {
    await quizClient.updateQuiz(qid as string, { ...quiz, published: true });
    router.push(`/courses/${cid}/quizzes`);
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/quizzes`);
  };

  return (
    <div id="wd-quiz-editor">
      <style>{`
        .wd-quiz-editor-check .form-check-input:checked {
          background-color: #dc3545;
          border-color: #dc3545;
        }
        .wd-quiz-editor-check .form-check-input:focus {
          border-color: #dc3545;
          box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
        }
      `}</style>

      {/* Points and Published status */}
      <div className="d-flex justify-content-end align-items-center mb-3 gap-3">
        <span>Points {quiz.points || 0}</span>
        <span>{quiz.published ? "✅ Published" : "🚫 Not Published"}</span>
      </div>

      {/* Tabs */}
      <Nav variant="tabs" className="mb-3">
        <NavItem>
          <NavLink
            active={activeTab === "details"}
            onClick={() => setActiveTab("details")}
            style={{
              cursor: "pointer",
              color: activeTab === "details" ? undefined : "#dc3545",
            }}
          >
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={activeTab === "questions"}
            onClick={() => setActiveTab("questions")}
            style={{
              cursor: "pointer",
              color: activeTab === "questions" ? undefined : "#dc3545",
            }}
          >
            Questions
          </NavLink>
        </NavItem>
      </Nav>

      {/* Details Tab */}
      {activeTab === "details" && (
        <div className="wd-quiz-editor-check">
          {/* Title */}
          <FormControl
            className="mb-3"
            value={quiz.title || ""}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            placeholder="Quiz Title"
          />

          {/* Description */}
          <label className="form-label">Quiz Instructions</label>
          <FormControl
            as="textarea"
            rows={4}
            className="mb-3"
            value={quiz.description || ""}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            placeholder="Quiz instructions..."
          />

          {/* Quiz Type and Assignment Group side by side */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Quiz Type</label>
              <FormSelect
                value={quiz.quizType || "Graded Quiz"}
                onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
              >
                <option value="Graded Quiz">Graded Quiz</option>
                <option value="Practice Quiz">Practice Quiz</option>
                <option value="Graded Survey">Graded Survey</option>
                <option value="Ungraded Survey">Ungraded Survey</option>
              </FormSelect>
            </div>
            <div className="col-md-6">
              <label className="form-label">Assignment Group</label>
              <FormSelect
                value={quiz.assignmentGroup || "QUIZZES"}
                onChange={(e) =>
                  setQuiz({ ...quiz, assignmentGroup: e.target.value })
                }
              >
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="PROJECT">Project</option>
              </FormSelect>
            </div>
          </div>

          {/* Options */}
          <h5>Options</h5>

          <FormCheck
            className="mb-2"
            type="checkbox"
            label="Shuffle Answers"
            checked={quiz.shuffleAnswers ?? true}
            onChange={(e) =>
              setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
            }
          />

          {/* Time Limit */}
          <div className="d-flex align-items-center mb-2 gap-2">
            <FormCheck
              type="checkbox"
              label="Time Limit"
              checked={quiz.timeLimit > 0}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  timeLimit: e.target.checked ? 20 : 0,
                })
              }
            />
            {quiz.timeLimit > 0 && (
              <div className="d-flex align-items-center gap-2">
                <FormControl
                  type="number"
                  style={{ width: "80px" }}
                  value={quiz.timeLimit}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      timeLimit: parseInt(e.target.value) || 0,
                    })
                  }
                />
                <span>Minutes</span>
              </div>
            )}
          </div>

          {/* Multiple Attempts */}
          <FormCheck
            className="mb-2"
            type="checkbox"
            label="Allow Multiple Attempts"
            checked={quiz.multipleAttempts ?? false}
            onChange={(e) =>
              setQuiz({ ...quiz, multipleAttempts: e.target.checked })
            }
          />

          {quiz.multipleAttempts && (
            <div className="d-flex align-items-center mb-2 ms-4 gap-2">
              <label>How Many Attempts:</label>
              <FormControl
                type="number"
                style={{ width: "80px" }}
                value={quiz.howManyAttempts || 1}
                onChange={(e) =>
                  setQuiz({
                    ...quiz,
                    howManyAttempts: parseInt(e.target.value) || 1,
                  })
                }
              />
            </div>
          )}

          {/* Show Correct Answers */}
          <div className="mb-2">
            <label className="form-label">Show Correct Answers</label>
            <FormSelect
              value={quiz.showCorrectAnswers || "Immediately"}
              onChange={(e) =>
                setQuiz({ ...quiz, showCorrectAnswers: e.target.value })
              }
            >
              <option value="Immediately">Immediately</option>
              <option value="After Due Date">After Due Date</option>
              <option value="Never">Never</option>
            </FormSelect>
          </div>

          {/* Access Code */}
          <div className="mb-2">
            <label className="form-label">Access Code</label>
            <FormControl
              value={quiz.accessCode || ""}
              onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
              placeholder="Leave blank for no access code"
            />
          </div>

          {/* One Question at a Time */}
          <FormCheck
            className="mb-2"
            type="checkbox"
            label="One Question at a Time"
            checked={quiz.oneQuestionAtATime ?? true}
            onChange={(e) =>
              setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })
            }
          />

          {/* Webcam Required */}
          <FormCheck
            className="mb-2"
            type="checkbox"
            label="Webcam Required"
            checked={quiz.webcamRequired ?? false}
            onChange={(e) =>
              setQuiz({ ...quiz, webcamRequired: e.target.checked })
            }
          />

          {/* Lock Questions After Answering */}
          <FormCheck
            className="mb-3"
            type="checkbox"
            label="Lock Questions After Answering"
            checked={quiz.lockQuestionsAfterAnswering ?? false}
            onChange={(e) =>
              setQuiz({
                ...quiz,
                lockQuestionsAfterAnswering: e.target.checked,
              })
            }
          />

          {/* Dates */}
          <h5>Assign</h5>
          <div className="border rounded p-3 mb-3">
            <div className="mb-3">
              <label className="form-label">
                <strong>Due</strong>
              </label>
              <FormControl
                type="datetime-local"
                value={
                  quiz.dueDate
                    ? new Date(quiz.dueDate).toISOString().slice(0, 16)
                    : ""
                }
                onChange={(e) =>
                  setQuiz({
                    ...quiz,
                    dueDate: e.target.value
                      ? new Date(e.target.value).toISOString()
                      : null,
                  })
                }
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  <strong>Available from</strong>
                </label>
                <FormControl
                  type="datetime-local"
                  value={
                    quiz.availableDate
                      ? new Date(quiz.availableDate).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      availableDate: e.target.value
                        ? new Date(e.target.value).toISOString()
                        : null,
                    })
                  }
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  <strong>Until</strong>
                </label>
                <FormControl
                  type="datetime-local"
                  value={
                    quiz.untilDate
                      ? new Date(quiz.untilDate).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      untilDate: e.target.value
                        ? new Date(e.target.value).toISOString()
                        : null,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Questions Tab */}
      {activeTab === "questions" && <QuestionsEditor quizId={qid as string} />}

      <hr />

      {/* Bottom buttons */}
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="outline-danger" onClick={handleSaveAndPublish}>
          Save & Publish
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
