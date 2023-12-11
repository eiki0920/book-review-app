import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import Header from "../component/Header";

import "../style/CreateReview.scss";

function CreateReview() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
          console.log(errors);

          alert("レビューが作成されました");
        });
    }
  };

  return (
    <div className="createReview">
      <Header />

      <h2>レビュー作成</h2>
      <form className="createReview__form">
        <label htmlFor="title">
          タイトル
          <br />
          <input
            type="text"
            id="title"
            {...register("title", {
              required: "タイトルを入力してください",
              onChange: handleTitleChange,
              minLength: {
                value: 4,
                message: "タイトルは4文字以上にしてください",
              },
            })}
          />
        </label>

        <br />

        <label htmlFor="url">
          URL
          <br />
          <input
            type="text"
            id="url"
            {...register("url", {
              required: "アイコンを入力してください",
              onChange: handleUrlChange,
            })}
          />
        </label>

        <br />

        <label htmlFor="detail">
          本の詳細
          <br />
          <input
            type="text"
            id="detail"
            {...register("detail", {
              required: "詳細を入力してください",
              onChange: handleDetailChange,
            })}
          />
        </label>

        <br />

        <label htmlFor="review">
          レビュー
          <br />
          <input
            type="text"
            id="review"
            {...register("review", {
              required: "レビューを入力してください",
              onChange: handleReviewChange,
            })}
          />
        </label>

        <br />

        <button type="button" onClick={handleSubmit(PostReview)}>
          作成
        </button>
      </form>
    </div>
  );
}

export default CreateReview;
