import React from "react";
import Home from "./pages/Home/Home";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import styles from "./App.module.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <div className={styles.layout}>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <div className={styles.main}>
                  <Home />
                </div>
              }
            />
            <Route
              path="/crypto"
              element={<div className={styles.main}>Crypto Page</div>}
            />
            <Route
              path="/blogs"
              element={<div className={styles.main}>Blogs</div>}
            />
            <Route
              path="/submit"
              element={<div className={styles.main}>Submit a Blog</div>}
            />
            <Route
              path="/log-in"
              element={<div className={styles.main}>Login</div>}
            />
            <Route
              path="/sign-up"
              element={<div className={styles.main}>SignUp</div>}
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
