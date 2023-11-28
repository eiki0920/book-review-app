import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

import "../style/Home.scss";

function Home() {
  const [bookList, setBookList] = useState([]);
  const [page, setPage] = useState(0);
  const location = useLocation();
  const token = location.state ? location.state.token : null;

  const handlePage = (e) => {
    const type = e.target.value;
    if (type === "before") {
      setPage(page - 10);
      return;
    } else {
      setPage(page + 10);
      return;
    }
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    console.log(page);

    fetch(`https://railway.bookreview.techtrain.dev/books?offset=${page}`, {
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
  }, [token, page]);

  if (!token) {
    return <Navigate to="/login" />;
  }

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

      <div className="home__button">
        {page > 0 && (
          <button onClick={handlePage} value={"before"}>
            前へ
          </button>
        )}
        <button onClick={handlePage} value={"next"}>
          次へ
        </button>
      </div>
    </div>
  );
}

export default Home;
