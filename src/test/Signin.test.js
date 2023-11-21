import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../pages/Login";

test("入力ラベルが存在するか", () => {
  render(<Login />);

  const mailForm = screen.getByLabelText(/メールアドレス/i);
  const passwordForm = screen.getByLabelText(/パスワード/i);

  expect(mailForm).toBeInTheDocument();
  expect(passwordForm).toBeInTheDocument();
});

test("ボタンの数", async () => {
  render(<Login />);
  const buttonList = await screen.findAllByRole("button");
  expect(buttonList).toHaveLength(1);
});
