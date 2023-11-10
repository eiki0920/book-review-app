import React, { useState } from "react";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState();

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
        // setToken(token);
        setErrorMessage("");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.ErrorMessageJP);
      });
  };

  return (
    <div className="main">
      <h2>サインイン</h2>
      <p className="error-message">{errorMessage}</p>

      <form className="signin-form">
        <label htmlFor="email">
          メールアドレス
          <br />
          <input
            type="email"
            className="email-input"
            id="email"
            onChange={handleEmailChange}
          />
        </label>

        <br />

        <label htmlFor="password">
          パスワード
          <br />
          <input
            type="password"
            className="password-input"
            id="password"
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="button" id="signin-button" onClick={onSignIn}>
          サインイン
        </button>
      </form>
    </div>
  );
}

export default SignIn;
