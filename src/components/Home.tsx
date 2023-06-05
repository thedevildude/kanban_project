import React, { useEffect } from "react";
import Header from "./base/Header";
import { navigate } from "raviger";

const Home = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
};

export default Home;
