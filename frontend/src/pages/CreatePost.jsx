import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function CreatePost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  // 🔒 Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // 🔒 safety check
    if (!token) {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    try {
      await API.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Post Created Successfully");
      navigate("/");
    } catch (error) {
      console.log("Create Post Error:", error);
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
          required
        />

        <br /><br />

        <textarea
          name="content"
          placeholder="Write your blog content..."
          rows="6"
          cols="50"
          value={formData.content}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;