import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

import Header from "../component/Header";
import "../style/EditReview.css";

function DetailReview() {
  const [cookies] = useCookies();
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");

  const token = cookies.token;
  const id = useParams().id;

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const UpdateReviewData = () => {
    console.log(`hello: ${id},${title}`);

    fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        url: url,
        detail: detail,
        review: review,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        alert("レビューが更新されました");
      });
  };

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
        setTitle(book.title);
        setUrl(book.url);
        setDetail(book.detail);
        setReview(book.review);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      {isLoading ? (
        <h2>ロード中・・・</h2>
      ) : (
        <div className="review-edit">
          <h1>レビュー詳細</h1>

          <form className="review-form">
            <label htmlFor="title">
              タイトル
              <br />
              <input
                type="text"
                className="review-input"
                id="title"
                value={title}
                onChange={handleTitleChange}
              />
            </label>
            <br />

            <label htmlFor="url">
              URL
              <br />
              <input
                type="text"
                className="review-input"
                id="url"
                value={url}
                onChange={handleUrlChange}
              />
            </label>
            <br />

            <label htmlFor="detail">
              詳細
              <br />
              <input
                type="text"
                className="review-input"
                id="detail"
                value={detail}
                onChange={handleDetailChange}
              />
            </label>
            <br />

            <label htmlFor="review">
              レビュー
              <br />
              <input
                type="title"
                className="review-input"
                id="review"
                value={review}
                onChange={handleReviewChange}
              />
            </label>
            <br />

            <button type="button" id="signin-button" onClick={UpdateReviewData}>
              更新する
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default DetailReview;
