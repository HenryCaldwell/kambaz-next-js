"use client";

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import * as quizClient from "../../../../quizClient";
import QuestionEditor from "./QuestionEditor";

export default function QuestionsEditor({ quizId }: { quizId: string }) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchQuestions = async () => {
    const data = await quizClient.findQuestionsForQuiz(quizId);
    setQuestions(data);
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  const handleAddQuestion = async () => {
    const newQuestion = await quizClient.createQuestion(quizId, {
      title: "New Question",
      type: "MULTIPLE_CHOICE",
      points: 1,
      question: "",
      choices: [
        { text: "Option 1", isCorrect: true },
        { text: "Option 2", isCorrect: false },
        { text: "Option 3", isCorrect: false },
        { text: "Option 4", isCorrect: false },
      ],
    });
    setQuestions([...questions, newQuestion]);
    setEditingId(newQuestion._id);
  };

  const handleSaveQuestion = async (questionId: string, updates: any) => {
    const updated = await quizClient.updateQuestion(
      quizId,
      questionId,
      updates,
    );
    setQuestions(questions.map((q) => (q._id === questionId ? updated : q)));
    setEditingId(null);
  };

  const handleDeleteQuestion = async (questionId: string) => {
    await quizClient.deleteQuestion(quizId, questionId);
    setQuestions(questions.filter((q) => q._id !== questionId));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <span className="fs-5">Points: {totalPoints}</span>
      </div>

      {questions.length === 0 && (
        <p className="text-muted text-center">
          No questions yet. Click + New Question to add one.
        </p>
      )}

      {questions.map((question) => (
        <QuestionEditor
          key={question._id}
          question={question}
          isEditing={editingId === question._id}
          onEdit={() => setEditingId(question._id)}
          onSave={(updates) => handleSaveQuestion(question._id, updates)}
          onDelete={() => handleDeleteQuestion(question._id)}
          onCancel={handleCancelEdit}
        />
      ))}

      <hr />
      <div className="d-flex justify-content-center">
        <Button variant="outline-secondary" onClick={handleAddQuestion}>
          <FaPlus className="me-2" />
          New Question
        </Button>
      </div>
    </div>
  );
}
