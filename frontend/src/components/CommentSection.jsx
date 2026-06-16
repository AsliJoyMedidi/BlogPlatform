import { useEffect, useState } from "react";
import API from "../api";

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${postId}`);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/comments",
        {
          text,
          post: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setText("");

      fetchComments();
    } catch (error) {
      console.log(error);
      alert("Failed to add comment");
    }
  };

  return (
    <div>
      <h3>Comments</h3>

      <input
        type="text"
        placeholder="Write a comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addComment}>
        Add Comment
      </button>

      <hr />

      {comments.map((comment) => (
        <div key={comment._id}>
          <strong>{comment.user?.username}</strong>

          <p>{comment.text}</p>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default CommentSection;