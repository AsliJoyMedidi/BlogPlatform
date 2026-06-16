import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Blog Posts</h1>

      <Link to="/create-post">
        Create Post
      </Link>

      <hr />

      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>

          <p>{post.content}</p>

          <Link to={`/post/${post._id}`}>
            View Details
          </Link>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Home;