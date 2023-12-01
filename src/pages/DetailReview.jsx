import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

import Header from "../component/Header";
import "../style/DetailReview.css";

function DetailReview() {
  const [cookies] = useCookies();
  const [isLoading, setIsLoading] = useState(false);
  const [bookInfo, setBookInfo] = useState({});

  const token = cookies.token;
  const id = useParams().id;

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((book) => {
        console.log(book);
        setBookInfo(book);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="detail-review">
      <Header />
      {isLoading ? (
        <h2>ロード中...</h2>
      ) : (
        <>
          <h2>レビュー詳細</h2>
          <ul>
            <li>title: {bookInfo.title}</li>
            <li>url: {bookInfo.url}</li>
            <li>detail: {bookInfo.detail}</li>
            <li>review: {bookInfo.review}</li>
            <li>reviewer: {bookInfo.reviewer}</li>
          </ul>
        </>
      )}
    </div>
  );
}

export default DetailReview;
