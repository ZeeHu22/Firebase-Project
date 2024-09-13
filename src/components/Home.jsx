import React, { useState } from "react";
import PostsList from "./PostsList";
import PostById from "./PostById.jsx";

export default function Home({ createPost, getAllPosts, getPostById }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [postId, setPostId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      createPost(title, description);
      setTitle(""); // Clear form fields
      setDescription("");
    } else {
      alert("Please fill out both fields.");
    }
  };

  const handleGetAllPosts = async () => {
    const fetchedPosts = await getAllPosts();
    setPosts(fetchedPosts); // Update state with the fetched posts
  };

  const handleGetPostById = async () => {
    if (postId) {
      const fetchedPost = await getPostById(postId);
      setPost(fetchedPost); // Update state with the fetched post
    } else {
      alert("Please enter a valid Post ID");
    }
  };

  return (
    <div className="home">
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>

      <hr />

      <div>
        <button onClick={handleGetAllPosts}>Get All Posts</button>
        <PostsList posts={posts} />
      </div>

      <hr />

      <div>
        <input
          type="text"
          placeholder="Enter Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
        />
        <button onClick={handleGetPostById}>Get Post by ID</button>
        <PostById post={post} />
      </div>
    </div>
  );
}
