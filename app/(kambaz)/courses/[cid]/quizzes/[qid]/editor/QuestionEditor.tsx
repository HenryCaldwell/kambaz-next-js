"use client";

import { useEffect, useState } from "react";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import FillInBlankEditor from "./FillInBlankEditor";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";

export default function QuestionEditor({
  question,
  isEditing,
  onEdit,
  onSave,
  onDelete,
  onCancel,
}: {
  question: any;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (updates: any) => void;
  onDelete: () => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<any>({ ...question });

  useEffect(() => {
    setDraft({ ...question });
  }, [question, isEditing]);

  const handleTypeChange = (newType: string) => {
    const updated = { ...draft, type: newType };

    // Set appropriate defaults when switching types
    if (newType === "MULTIPLE_CHOICE") {
      updated.choices = updated.choices?.length
        ? updated.choices
        : [
            { text: "Option 1", isCorrect: true },
            { text: "Option 2", isCorrect: false },
          ];
      updated.correctAnswer = undefined;
      updated.blankAnswers = undefined;
    } else if (newType === "TRUE_FALSE") {
      updated.correctAnswer = updated.correctAnswer ?? true;
      updated.choices = undefined;
      updated.blankAnswers = undefined;
    } else if (newType === "FILL_IN_BLANK") {
      updated.blankAnswers = updated.blankAnswers?.length
        ? updated.blankAnswers
        : [""];
      updated.choices = undefined;
      updated.correctAnswer = undefined;
    }

    setDraft(updated);
  };

  // Preview mode
  if (!isEditing) {
    return (
      <div className="border rounded p-3 mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>{draft.title}</strong>
            <span className="text-muted ms-3">
              {draft.type.replace(/_/g, " ")}
            </span>
            <span className="text-muted ms-3">{draft.points} pts</span>
          </div>
          <div className="d-flex gap-2">
            <FaPencilAlt
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={onEdit}
            />
            <FaTrash
              className="text-danger"
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (window.confirm("Delete this question?")) {
                  onDelete();
                }
              }}
            />
          </div>
        </div>
        {draft.question && (
          <div className="mt-2 text-muted small">{draft.question}</div>
        )}
      </div>
    );
  }

  // Edit mode
  return (
    <div className="border rounded p-3 mb-3">
      {/* Top row: title, type dropdown, points */}
      <div className="d-flex align-items-center gap-3 mb-3">
        <FormControl
          style={{ maxWidth: "250px" }}
          value={draft.title || ""}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          placeholder="Question Title"
        />
        <FormSelect
          style={{ maxWidth: "200px" }}
          value={draft.type}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option value="MULTIPLE_CHOICE">Multiple Choice</option>
          <option value="TRUE_FALSE">True/False</option>
          <option value="FILL_IN_BLANK">Fill in the Blank</option>
        </FormSelect>
        <div className="d-flex align-items-center gap-1">
          <span>pts:</span>
          <FormControl
            type="number"
            style={{ width: "70px" }}
            value={draft.points || 0}
            onChange={(e) =>
              setDraft({ ...draft, points: parseInt(e.target.value) || 0 })
            }
          />
        </div>
      </div>

      {/* Question text */}
      <div className="mb-3">
        <label className="form-label">Question:</label>
        <FormControl
          as="textarea"
          rows={3}
          value={draft.question || ""}
          onChange={(e) => setDraft({ ...draft, question: e.target.value })}
          placeholder="Enter your question..."
        />
      </div>

      {/* Type-specific editor */}
      {draft.type === "MULTIPLE_CHOICE" && (
        <MultipleChoiceEditor draft={draft} setDraft={setDraft} />
      )}
      {draft.type === "TRUE_FALSE" && (
        <TrueFalseEditor draft={draft} setDraft={setDraft} />
      )}
      {draft.type === "FILL_IN_BLANK" && (
        <FillInBlankEditor draft={draft} setDraft={setDraft} />
      )}

      {/* Bottom buttons */}
      <div className="d-flex justify-content-end gap-2 mt-3">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => onSave(draft)}>
          Save/Update Question
        </Button>
      </div>
    </div>
  );
}
