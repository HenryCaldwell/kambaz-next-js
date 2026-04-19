"use client";

import { useRouter } from "next/navigation";
import { ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { IoRocketOutline } from "react-icons/io5";
import QuizContextMenu from "./QuizContextMenu";

export default function QuizListItem({
  quiz,
  isFaculty,
  courseId,
  onDelete,
  onTogglePublish,
}: {
  quiz: any;
  isFaculty: boolean;
  courseId: string;
  onDelete: (quizId: string) => void;
  onTogglePublish: (quizId: string, published: boolean) => void;
}) {
  const router = useRouter();

  const getAvailability = () => {
    const now = new Date();
    const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const until = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (until && now > until) {
      return <strong>Closed</strong>;
    }
    if (available && now < available) {
      return (
        <span>
          <strong>Not available until</strong>{" "}
          {new Date(quiz.availableDate).toLocaleDateString()}
        </span>
      );
    }
    return <strong>Available</strong>;
  };

  const handleClick = () => {
    router.push(`/courses/${courseId}/quizzes/${quiz._id}`);
  };

  return (
    <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
      <div
        className="d-flex align-items-center"
        style={{ minWidth: 0, flex: 1 }}
      >
        <BsGripVertical className="me-2 fs-3 shrink-0" />
        <IoRocketOutline className="me-3 fs-4 text-success shrink-0" />

        <div onClick={handleClick} style={{ cursor: "pointer", minWidth: 0 }}>
          <div className="fw-bold">{quiz.title}</div>
          <div className="text-muted small">
            {getAvailability()}
            {quiz.dueDate && (
              <span>
                {" | "}
                <strong>Due</strong>{" "}
                {new Date(quiz.dueDate).toLocaleDateString()}
              </span>
            )}
            {" | "}
            {quiz.points || 0} pts
            {" | "}
            {quiz.questions?.length || 0} Questions
            {!isFaculty &&
              quiz.latestScore !== null &&
              quiz.latestScore !== undefined && (
                <span>
                  {" | "}
                  <strong>Score:</strong> {quiz.latestScore}
                </span>
              )}
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center ms-3 shrink-0">
        {isFaculty && (
          <QuizContextMenu
            quiz={quiz}
            courseId={courseId}
            onDelete={onDelete}
            onTogglePublish={onTogglePublish}
          />
        )}

        {!isFaculty && (
          <span className="me-2">{quiz.published ? "✅" : "🚫"}</span>
        )}
      </div>
    </ListGroupItem>
  );
}
