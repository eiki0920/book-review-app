import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../pages/Login";
import { BrowserRouter } from "react-router-dom";

test("入力ラベルが存在するか", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const mailForm = screen.getByText(/メールアドレス/i);
  const passwordForm = screen.getByLabelText(/パスワード/i);

  expect(mailForm).toBeInTheDocument();
  expect(passwordForm).toBeInTheDocument();
});

test("ボタンの数", async () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const buttonList = await screen.findAllByRole("button");
  expect(buttonList).toHaveLength(1);
});
