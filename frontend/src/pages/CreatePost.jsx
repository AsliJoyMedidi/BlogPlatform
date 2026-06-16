import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function CreatePost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Post Created Successfully");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div>
      <h2>Create Blog Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={formData.title}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="content"
          placeholder="Write your blog content..."
          rows="6"
          cols="50"
          value={formData.content}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;