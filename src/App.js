import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { auth } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

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
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/register" element={<Register register={register} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;