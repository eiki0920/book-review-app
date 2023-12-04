import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Header from "../component/Header";

import "../style/Home.scss";

function Home() {
  const [bookList, setBookList] = useState([]);

  const [page, setPage] = useState(0);
  const [cookies] = useCookies();
  const [isMine, setIsMine] = useState();

  const navigate = useNavigate();

  const token = cookies.token;

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
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    }
  }, [token, page]);

  return (
    <div className="home">
      <div className="home__bookList">
        <Header />

        {token && (
          <button
            type="button"
            className="create-review-link"
            onClick={() => {
              navigate("/new");
            }}
          >
            レビューを作成
          </button>
        )}

        <h2 className="home__bookList--heading">書籍一覧</h2>

        <div>
          {bookList.map((book) => (
            <>
              {token ? (
                book.isMine ? (
                  <Link to={`/edit/${book.id}`} key={book.id}>
                    <li>{book.title}</li>
                  </Link>
                ) : (
                  <Link to={`/detail/${book.id}`} key={book.id}>
                    <li>{book.title}</li>
                  </Link>
                )
              ) : (
                <Link to={`/detail/${book.id}`} key={book.id}>
                  <li className="home__bookList--title">{book.title}</li>
                </Link>
              )}
            </>
          ))}
        </div>
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
