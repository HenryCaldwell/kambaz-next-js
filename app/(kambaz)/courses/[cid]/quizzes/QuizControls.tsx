"use client";

import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";

export default function QuizControls({ onAddQuiz }: { onAddQuiz: () => void }) {
  return (
    <div
      id="wd-quiz-controls"
      className="text-nowrap d-flex justify-content-end align-items-center gap-2"
    >
      <InputGroup className="w-50">
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <FormControl placeholder="Search for Quiz" />
      </InputGroup>
      <Button variant="danger" onClick={onAddQuiz} id="wd-add-quiz-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Quiz
      </Button>
    </div>
  );
}
