import { useEffect, useState } from "react";

import { useCookies } from "react-cookie";

import "../style/Profile.scss";
import Header from "../component/Header";

function Profile() {
  const [userName, setUserName] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [cookie] = useCookies();

  const token = cookie.token;

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
        alert("プロフィールが変更されました");
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
      <Header />

      <div className="profile">
        <h1>プロフィール</h1>
        <img src={iconUrl} alt="アイコン画像" className="profile__icon" />
        <form className="profile__form">
          <label htmlFor="name">
            名前
            <br />
            <input
              type="name"
              className="profile__form--input"
              id="name"
              value={userName}
              onChange={handleNameChange}
            />
          </label>
          <br />

          <button
            type="button"
            id="signin-button"
            onClick={UpdateUserData}
            className="profile__form--button"
          >
            更新する
          </button>
        </form>
      </div>
    </>
  );
}

export default Profile;
