import React from "react";

export default function PostById({ post }) {
  return (
    <div className="post-by-id">
      <h3>Post by ID</h3>
      {post ? (
        <div>
          <h4>{post.title}</h4>
          <p>{post.description}</p>
        </div>
      ) : (
        <p>No post found with this ID</p>
      )}
    </div>
  );
}
