"use client";

import { useParams } from "next/navigation";
import { Table } from "react-bootstrap";
import * as db from "../../../database";

export default function PeopleTable() {
  const { cid } = useParams();
  const { users, enrollments } = db;

  const people = users.filter((user: any) =>
    enrollments.some(
      (enrollment: any) =>
        enrollment.user === user._id && enrollment.course === cid,
    ),
  );

  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {people.map((user: any) => (
            <tr key={user._id}>
              <td className="fw-semibold">
                {user.firstName} {user.lastName}
              </td>
              <td>{user.loginId}</td>
              <td>{user.section}</td>
              <td>{user.role}</td>
              <td>{user.lastActivity}</td>
              <td>{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
