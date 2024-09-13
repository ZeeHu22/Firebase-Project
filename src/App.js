import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  async function createPost(title, description) {
    try {
      const post = {
        title,
        description,
        uid: user.uid,
      };
      await addDoc(collection(db, "posts"), post);
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  async function getAllPosts() {
    try {
      const { docs } = await getDocs(collection(db, "posts"));
      const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
      return posts; // Return the posts array
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  async function getPostById(postId) {
    try {
      const postRef = doc(db, "posts", postId);
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        return postSnap.data(); // Return the post data
      } else {
        return null; // Return null if no post found
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function register(email, password) {
    createUserWithEmailAndPassword(auth, email, password).catch((error) => {
      console.error(error.code);
    });
  }

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => {
        const errorCode = error.code;
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
  }

  return (
    <Router>
      <div className="App">
        <Nav
          user={user}
          loading={loading}
          register={register}
          login={login}
          logout={logout}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                createPost={createPost}
                getAllPosts={getAllPosts}
                getPostById={getPostById}
              />
            }
          />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/register" element={<Register register={register} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
