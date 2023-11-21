import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const token = location.state.token;
  console.log(token);

  useEffect(() => {
    fetch("https://railway.bookreview.techtrain.dev/books?offset=1");
  }, []);

  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
}

export default Home;
