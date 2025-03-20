import React, { useEffect, useState } from "react";
import { fetchUsers, fetchPostsByUser } from "../api/api";
import io from "socket.io-client";

const socket = io("ws://20.244.56.144");

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadInitialPosts = async () => {
      const users = await fetchUsers();
      let allPosts = [];

      for (const userId in users) {
        const userPosts = await fetchPostsByUser(userId);
        allPosts.push(...userPosts);
      }

      allPosts.sort((a, b) => b.id - a.id);
      setPosts(allPosts);
    };

    loadInitialPosts();

    socket.on("newPost", (newPost) => {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">Live Feed</h2>
      {posts.map((post) => (
        <div key={post.id} className="border p-3 my-2 rounded-lg">
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
