import React, { useEffect } from "react";
import { navigate } from "raviger";

const Home = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-full">
      <p className="text-2xl font-bold">Home</p>
    </div>
  );
};

export default Home;
