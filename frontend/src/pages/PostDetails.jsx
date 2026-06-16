import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../api";
import CommentSection from "../components/CommentSection";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const res = await API.get(`/posts/${id}`);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Post Deleted Successfully");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  if (!post) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>{post.title}</h1>

      <p>{post.content}</p>

      <hr />

      <h3>Author</h3>
      <p>{post.author?.username}</p>

      <br />

      <Link to={`/edit-post/${id}`}>
        <button>Edit Post</button>
      </Link>

      <button onClick={handleDelete}>
        Delete Post
      </button>

      <hr />

      <CommentSection postId={id} />
    </div>
  );
}

export default PostDetails;