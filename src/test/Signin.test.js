import React from "react";
import { render, screen } from "@testing-library/react";
import SignIn from "../pages/Login";

test("入力ラベルが存在するか", () => {
  render(<SignIn />);

  const mailForm = screen.getByLabelText(/メールアドレス/i);
  const passwordForm = screen.getByLabelText(/パスワード/i);

  expect(mailForm).toBeInTheDocument();
  expect(passwordForm).toBeInTheDocument();
});

test("ボタンの数", async () => {
  render(<SignIn />);
  const buttonList = await screen.findAllByRole("button");
  expect(buttonList).toHaveLength(1);
});
