import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [, setCookie] = useCookies();

  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSignIn = () => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error;
          });
        }
        return res.json();
      })
      .then((token) => {
        setErrorMessage("");

        // localStorage.setItem("Token", token.token);
        setCookie("token", token.token);

        navigation("/");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.ErrorMessageJP);
      });
  };

  return (
    <div className="main">
      <h2>サインイン</h2>
      <a href="/signup">ユーザー登録</a>
      <p className="error-message">{errorMessage}</p>

      <form className="signin-form">
        <label htmlFor="email">
          メールアドレス
          <br />
          <input
            type="email"
            className="email-input"
            id="email"
            {...register("mail", {
              required: "メールアドレスを入力してください",
              onChange: handleEmailChange,
            })}
          />
        </label>
        <div>{errors.name?.mail}</div>

        <br />

        <label htmlFor="password-form">
          パスワード
          <br />
          <input
            type="password"
            className="password-input"
            id="password-form"
            {...register("password", {
              required: "パスワードを入力してください",
              onChange: handlePasswordChange,
            })}
          />
        </label>
        <div>{errors.password?.message}</div>
        <br />
        <button
          type="button"
          id="signin-button"
          onClick={handleSubmit(onSignIn)}
        >
          サインイン
        </button>
      </form>
    </div>
  );
}

export default Login;
