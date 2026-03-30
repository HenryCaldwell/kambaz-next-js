"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  ListGroup,
  ListGroupItem,
  Modal,
} from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as client from "../../client";
import LessonControlButtons from "../modules/LessonControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { setAssignments } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer,
  );
  const dispatch = useDispatch();

  const [showDialog, setShowDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(
    null,
  );

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const confirmDelete = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDialog(true);
  };

  const handleDelete = async () => {
    if (assignmentToDelete) {
      await client.deleteAssignment(assignmentToDelete);
      dispatch(
        setAssignments(
          assignments.filter((a: any) => a._id !== assignmentToDelete),
        ),
      );
    }
    setShowDialog(false);
    setAssignmentToDelete(null);
  };

  return (
    <div>
      <div id="wd-assignments-controls" className="text-nowrap">
        <Link href={`/courses/${cid}/assignments/new`}>
          <Button
            id="wd-add-assignment"
            variant="danger"
            size="lg"
            className="me-1 float-end"
          >
            <FaPlus className="me-2" />
            Assignment
          </Button>
        </Link>

        <Button
          id="wd-add-group"
          variant="secondary"
          size="lg"
          className="me-2 float-end"
        >
          <FaPlus className="me-2" />
          Group
        </Button>

        <div className="position-relative w-50">
          <HiOutlineMagnifyingGlass className="position-absolute top-50 translate-middle-y ms-3" />
          <FormControl
            id="wd-search-assignment"
            placeholder="Search..."
            className="ps-5"
          />
        </div>
      </div>

      <br />

      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS
            <AssignmentControlButtons />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {assignments.map((a: any) => (
              <ListGroupItem key={a._id} className="wd-lesson p-3 ps-1">
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    <FaRegEdit className="me-3 fs-4 text-success" />
                  </div>

                  <div>
                    <Link
                      href={`/courses/${cid}/assignments/${a._id}`}
                      className="text-decoration-none text-dark"
                    >
                      <div className="fw-bold fs-4">{a.title}</div>
                    </Link>

                    <div className="text-secondary">
                      <span className="text-danger">Multiple Modules</span>
                      <span className="mx-2">|</span>
                      <span>
                        Not available until {a.availableFrom || "N/A"}
                      </span>
                      <span className="mx-2">|</span>
                    </div>

                    <div className="text-secondary">
                      <span>Due {a.dueDate || "N/A"}</span>
                      <span className="mx-2">|</span>
                      <span>{a.points || 100} pts</span>
                    </div>
                  </div>

                  <div className="ms-auto d-flex align-items-center">
                    <FaTrash
                      className="text-danger me-3 cursor-pointer"
                      onClick={() => confirmDelete(a._id)}
                    />
                    <LessonControlButtons />
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>

      <Modal show={showDialog} onHide={() => setShowDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this assignment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
