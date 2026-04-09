"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as client from "../../client";
import PeopleTable from "./Table";

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const fetchUsers = async () => {
    const cidString = Array.isArray(cid) ? cid[0] : cid;
    const users = await client.findUsersForCourse(cidString);
    setUsers(users.filter((user: any) => user !== null));
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <h3>People</h3>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
