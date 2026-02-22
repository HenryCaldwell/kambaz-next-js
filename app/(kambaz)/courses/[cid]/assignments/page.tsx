"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import * as db from "../../../database";
import LessonControlButtons from "../modules/LessonControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";

export default function Assignments() {
  const { cid } = useParams();

  const courseAssignments = db.assignments.filter((a: any) => a.course === cid);

  return (
    <div>
      <div id="wd-assignments-controls" className="text-nowrap">
        <Button
          id="wd-add-assignment"
          variant="danger"
          size="lg"
          className="me-1 float-end"
        >
          <FaPlus className="me-2" />
          Assignment
        </Button>

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
            {courseAssignments.map((a: any) => (
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
                      <span>Not available until May 6 at 12:00am</span>
                      <span className="mx-2">|</span>
                    </div>

                    <div className="text-secondary">
                      <span>Due May 13 at 11:59pm</span>
                      <span className="mx-2">|</span>
                      <span>100 pts</span>
                    </div>
                  </div>

                  <div className="ms-auto d-flex align-items-center">
                    <LessonControlButtons />
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
