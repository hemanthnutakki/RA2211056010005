import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TopUsers from "./components/TopUsers";
import TrendingPosts from "./components/TrendingPosts";
import Feed from "./components/Feed";

const App = () => {
  return (
    <Router>
      <div className="p-5">
        <nav className="mb-5">
          <Link className="mx-2 text-blue-500" to="/">Top Users</Link>
          <Link className="mx-2 text-blue-500" to="/trending">Trending Posts</Link>
          <Link className="mx-2 text-blue-500" to="/feed">Live Feed</Link>
        </nav>

        <Routes>
          <Route path="/" element={<TopUsers />} />
          <Route path="/trending" element={<TrendingPosts />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
