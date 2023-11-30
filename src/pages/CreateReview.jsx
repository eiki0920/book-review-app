import { useState } from "react";
import { useCookies } from "react-cookie";
import Header from "../component/Header";

import "../style/CreateReview.css";

function CreateReview() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");

  const [cookie] = useCookies();

  const token = cookie.token;

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

  const PostReview = () => {
    if (token) {
      fetch(`https://railway.bookreview.techtrain.dev/books`, {
        method: "POST",
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
        .then((ans) => {
          console.log(ans);
        });
    }
  };

  return (
    <div className="create-review">
      <Header />

      <h3>レビュー作成</h3>
      <form className="create-review-form">
        <label htmlFor="title">
          タイトル
          <br />
          <input type="text" id="title" onChange={handleTitleChange} />
        </label>

        <br />

        <label htmlFor="url">
          URL
          <br />
          <input type="text" id="url" onChange={handleUrlChange} />
        </label>

        <br />

        <label htmlFor="detail">
          本の詳細
          <br />
          <input type="text" id="detail" onChange={handleDetailChange} />
        </label>

        <br />

        <label htmlFor="review">
          レビュー
          <br />
          <input type="text" id="review" onChange={handleReviewChange} />
        </label>

        <br />

        <button type="button" id="create-review-button" onClick={PostReview}>
          作成
        </button>
      </form>
    </div>
  );
}

export default CreateReview;
