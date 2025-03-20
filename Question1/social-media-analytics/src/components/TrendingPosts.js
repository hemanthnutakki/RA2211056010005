import React, { useEffect, useState } from "react";
import { fetchUsers, fetchPostsByUser, fetchCommentsByPost } from "../api/api";

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const loadTrendingPosts = async () => {
      const users = await fetchUsers();
      let postsWithComments = [];

      for (const userId in users) {
        const posts = await fetchPostsByUser(userId);

        for (const post of posts) {
          const comments = await fetchCommentsByPost(post.id);
          postsWithComments.push({ ...post, commentCount: comments.length });
        }
      }

      const maxComments = Math.max(...postsWithComments.map(p => p.commentCount));
      const topTrending = postsWithComments.filter(p => p.commentCount === maxComments);

      setTrendingPosts(topTrending);
    };

    loadTrendingPosts();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">Trending Posts</h2>
      {trendingPosts.map((post) => (
        <div key={post.id} className="border p-3 my-2 rounded-lg">
          <p>{post.content}</p>
          <p className="text-sm text-gray-500">{post.commentCount} Comments</p>
        </div>
      ))}
    </div>
  );
};

export default TrendingPosts;
