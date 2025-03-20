import axios from "axios";

const API_BASE_URL = "http://20.244.56.144/test";

export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data.users;
};

export const fetchPostsByUser = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/users/${userId}/posts`);
  return response.data.posts;
};

export const fetchCommentsByPost = async (postId) => {
  const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`);
  return response.data.comments;
};
