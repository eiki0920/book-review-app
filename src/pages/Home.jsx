import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "../style/Home.scss";

function Home() {
  const [bookList, setBookList] = useState([]);
  const [userName, setUserName] = useState("");
  const [icon, setIcon] = useState("");
  const [page, setPage] = useState(0);

  const token = localStorage.getItem("Token");

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
      fetch(
        `https://railway.bookreview.techtrain.dev/public/books?offset=${page}`
      )
        .then((res) => {
          return res.json();
        })
        .then((books) => {
          setBookList(books);
          return;
        });
    } else {
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
        })
        .then(() => {
          fetch(`https://railway.bookreview.techtrain.dev/users`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => {
              return res.json();
            })
            .then((user) => {
              console.log(user);
              setUserName(user.name);
              setIcon(user.iconUrl);
            });
        });
    }
  }, [token, page]);

  // if (!token) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div className="home">
      <div className="home__bookList">
        <header>
          <h2 className="app-title">書籍レビューアプリ</h2>
          <div className="header-right">
            {token ? (
              <>
                <p>{userName}</p>
                <Link to="/profile">
                  <img src={icon} alt="" />
                </Link>
              </>
            ) : (
              <Link to="/login">ログイン</Link>
            )}
          </div>
        </header>
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
