import React, { useEffect, useState } from "react";
import { fetchUsers, fetchPostsByUser } from "../api/api";

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const users = await fetchUsers();
      const userPostCounts = [];

      for (const id in users) {
        const posts = await fetchPostsByUser(id);
        userPostCounts.push({ id, name: users[id], postCount: posts.length });
      }

      userPostCounts.sort((a, b) => b.postCount - a.postCount);
      setTopUsers(userPostCounts.slice(0, 5));
    };

    loadUsers();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">Top 5 Users</h2>
      <ul>
        {topUsers.map((user) => (
          <li key={user.id} className="border p-3 my-2 rounded-lg">
            {user.name} - {user.postCount} Posts
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;
