import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../style/Profile.css";

function Profile() {
  const [userName, setUserName] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const token = localStorage.getItem("Token");

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const UpdateUserData = () => {
    fetch(`https://railway.bookreview.techtrain.dev/users`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((ans) => {
        console.log(ans);
      });
  };

  useEffect(() => {
    if (token) {
      fetch(`https://railway.bookreview.techtrain.dev/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((user) => {
          setUserName(user.name);
          setIconUrl(user.iconUrl);
        });
    }
  }, []);
  return (
    <>
      <header>
        <h2 className="app-title">書籍レビューアプリ</h2>
        <div className="header-right">
          <Link to="/">トップへ戻る</Link>
        </div>
      </header>
      <div className="profile">
        <h1>プロフィール</h1>
        <img src={iconUrl} alt="アイコン画像" className="user-icon" />
        <form className="profile-form">
          <label htmlFor="name">
            名前
            <br />
            <input
              type="name"
              className="name-input"
              id="name"
              value={userName}
              onChange={handleNameChange}
            />
          </label>
          <br />

          <button type="button" id="signin-button" onClick={UpdateUserData}>
            更新する
          </button>
        </form>
      </div>
    </>
  );
}

export default Profile;
