import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Compressor from "compressorjs";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [icon, setIcon] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      new Compressor(file, {
        maxHeight: 300,
        convertSize: Infinity,
        success(result) {
          console.log(result);
          setIcon(result);
          setErrorMessage("");
        },
        error(err) {
          console.log(err);
          setErrorMessage(err.message);
        },
      });
    }
  };

  const onSignUp = () => {
    const iconPram = new FormData();
    iconPram.append("icon", icon);

    console.log(name);
    console.log(email);

    fetch(`https://railway.bookreview.techtrain.dev/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
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
      .then((token_data) => {
        console.log(token_data);
        setErrorMessage("");
        return token_data.token;
      })
      .then((token) => {
        fetch(`https://railway.bookreview.techtrain.dev/uploads`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: iconPram,
        })
          .then((res) => {
            if (!res.ok) {
              return res.json().then((error) => {
                throw error;
              });
            }
            return res.json();
          })
          .then((respo) => {
            console.log(respo);
            alert("ユーザーが登録されました。");
          });
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.ErrorMessageJP);
      });
  };

  return (
    <div className="main">
      <h2>サインアップ</h2>
      <Link to="/login">ログイン</Link>
      <p className="error-message">{errorMessage}</p>

      <form className="signup-form" onSubmit={handleSubmit(onSignUp)}>
        <label htmlFor="name">
          名前
          <br />
          <input
            type="text"
            className="name-input"
            id="name"
            onChange={handleNameChange}
            {...register("name", {
              required: true,
              minLength: { value: 2, message: "2文字以上にしてください" },
              maxLength: { value: 6, message: "6文字以下にしてください" },
              onChange: handleNameChange,
            })}
          />
        </label>
        <div>{errors.name?.message}</div>

        <br />

        <label htmlFor="email">
          メールアドレス
          <br />
          <input
            type="email"
            className="email-input"
            id="email"
            onChange={handleEmailChange}
            {...register("mail", {
              required: "メールを入力してください",
              onChange: handleEmailChange,
            })}
          />
        </label>
        <div>{errors.mail?.message}</div>

        <br />

        <label htmlFor="password">
          パスワード
          <br />
          <input
            type="password"
            className="password-input"
            id="password"
            onChange={handlePasswordChange}
            {...register("password", {
              required: "パスワードを入力してください",
              minLength: { value: 5, message: "5文字以上にしてください" },
              onChange: handlePasswordChange,
            })}
          />
        </label>
        <div>{errors.password?.message}</div>

        <br />

        <label htmlFor="icon">
          アイコン
          <br />
          <input
            type="file"
            className="icon-input"
            id="icon"
            accept=".jpg, .png"
            {...register("icon", {
              required: "アイコンを入力してください",
              onChange: handleIconChange,
            })}
          />
        </label>
        <br />
        <button type="submit" id="signup-button">
          サインアップ
        </button>
      </form>
    </div>
  );
}

export default SignUp;
