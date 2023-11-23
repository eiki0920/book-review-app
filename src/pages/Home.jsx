import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import "../style/Home.scss";

function Home() {
  const [bookList, setBookList] = useState([]);
  const location = useLocation();
  const token = location.state.token;
  console.log(token);

  useEffect(() => {
    fetch("https://railway.bookreview.techtrain.dev/books?offset=1", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((books) => {
        console.log(books);
        setBookList(books);
      });
  }, []);

  return (
    <div className="home">
      <h1 className="home__heading">ホーム</h1>
      <div className="home__bookList">
        <h2 className="home__bookList--heading">書籍一覧</h2>
        <ul>
          {bookList.map((book) => (
            <li key={book.id} className="home__bookList--title">
              {book.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
