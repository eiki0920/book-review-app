import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

import "../style/Header.css";

function Header() {
  const [cookies, , removeCookie] = useCookies();
  const token = cookies.token;

  const [userName, setUserName] = useState("");
  const [icon, setIcon] = useState("");

  const navigate = useNavigate();

  const logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  useEffect(() => {
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
  }, []);
  return (
    <header>
      <Link to="/">
        <h2 className="app-title">書籍レビューアプリ</h2>
      </Link>

      <div className="header-right">
        {token ? (
          <>
            <p>{userName}</p>
            <Link to="/profile" aria-label="to-profile">
              <img src={icon} alt="アイコン画像" />
            </Link>
            <button className="logout-button" onClick={logout}>
              ログアウト
            </button>
          </>
        ) : (
          <Link to="/login">ログイン</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
