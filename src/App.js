import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { auth, db } from "./firebase/init";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
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

  function createPost() {
    const post = {
      title: "Hello World2",
      description: "This is a sample post2",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
  }

  async function getPostById() {
    const id = user.id;
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const post = postSnap.data();
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
    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
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
