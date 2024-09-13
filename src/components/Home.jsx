import React from 'react'

export default function Home({ createPost, getAllPosts, getPostById }) {
  return (
    <div>
        <h1>Home</h1>
        <button onClick={createPost}>Create Post</button>
        <button onClick={getAllPosts}>Get All Posts</button>
        <button onClick={getPostById}>Get Post By ID</button>
    </div>
  )
}