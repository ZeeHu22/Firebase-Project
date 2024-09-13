import React from "react";

export default function PostsList({ posts }) {
  return (
    <div className="posts-list">
      <h3>All Posts</h3>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.description}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}
