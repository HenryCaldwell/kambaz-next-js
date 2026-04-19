"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as quizClient from "../../quizClient";
import QuizControls from "./QuizControls";
import QuizListItem from "./QuizListItem";
import { removeQuiz, setQuizzes, togglePublish } from "./reducer";

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  ) as { currentUser: any };
  const isFaculty = currentUser?.role === "FACULTY";

  const fetchQuizzes = async () => {
    const quizzes = await quizClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const handleAddQuiz = async () => {
    const newQuiz = await quizClient.createQuiz(cid as string, {
      title: "Unnamed Quiz",
      description: "",
      published: false,
    });
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}`);
  };

  const handleDeleteQuiz = async (quizId: string) => {
    await quizClient.deleteQuiz(quizId);
    dispatch(removeQuiz(quizId));
  };

  const handleTogglePublish = async (quizId: string, published: boolean) => {
    const updatedQuiz = await quizClient.publishQuiz(quizId, published);
    dispatch(togglePublish(updatedQuiz));
  };

  return (
    <div id="wd-quizzes">
      {isFaculty && <QuizControls onAddQuiz={handleAddQuiz} />}
      <br />
      <ListGroup className="rounded-0" id="wd-quiz-list">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Assignment Quizzes
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {quizzes.length === 0 && (
              <ListGroupItem className="p-3 text-muted">
                {isFaculty
                  ? "No quizzes yet. Click + Quiz to add one."
                  : "No quizzes available."}
              </ListGroupItem>
            )}
            {quizzes.map((quiz: any) => (
              <QuizListItem
                key={quiz._id}
                quiz={quiz}
                isFaculty={isFaculty}
                courseId={cid as string}
                onDelete={handleDeleteQuiz}
                onTogglePublish={handleTogglePublish}
              />
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
