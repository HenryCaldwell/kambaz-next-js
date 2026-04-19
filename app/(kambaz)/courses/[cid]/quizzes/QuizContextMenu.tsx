"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaBan, FaCheckCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";

export default function QuizContextMenu({
  quiz,
  courseId,
  onDelete,
  onTogglePublish,
}: {
  quiz: any;
  courseId: string;
  onDelete: (quizId: string) => void;
  onTogglePublish: (quizId: string, published: boolean) => void;
}) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="position-relative d-flex align-items-center" ref={menuRef}>
      <span
        className="me-2"
        onClick={(e) => {
          e.stopPropagation();
          onTogglePublish(quiz._id, !quiz.published);
        }}
        style={{ cursor: "pointer" }}
      >
        {quiz.published ? (
          <FaCheckCircle className="text-success fs-5" />
        ) : (
          <FaBan className="text-secondary fs-5" />
        )}
      </span>

      <IoEllipsisVertical
        className="fs-4"
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu(!showMenu);
        }}
      />

      {showMenu && (
        <div
          className="position-absolute bg-white border rounded shadow-sm p-2"
          style={{
            right: 0,
            top: "100%",
            zIndex: 1000,
            minWidth: "150px",
          }}
        >
          <div
            className="p-2"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(false);
              router.push(`/courses/${courseId}/quizzes/${quiz._id}`);
            }}
          >
            Edit
          </div>
          <div
            className="p-2"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(false);
              if (
                window.confirm(
                  `Are you sure you want to delete "${quiz.title}"?`,
                )
              ) {
                onDelete(quiz._id);
              }
            }}
          >
            Delete
          </div>
          <div
            className="p-2"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(false);
              onTogglePublish(quiz._id, !quiz.published);
            }}
          >
            {quiz.published ? "Unpublish" : "Publish"}
          </div>
        </div>
      )}
    </div>
  );
}
