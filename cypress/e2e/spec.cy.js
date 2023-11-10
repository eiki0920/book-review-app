describe("template spec", () => {
  it("空欄でボタンを押した場合", () => {
    cy.visit("/signin");
    cy.get("#email").type(" ");
    cy.get("#password").type(" ");
    cy.get("#signin-button").click();
    cy.get(".error-message").should("be.visible");
  });

  it("適切な入力", () => {
    cy.visit("/signin");
    cy.get("#email").type("hogehoge");
    cy.get("#password").type("hogehoge");
    cy.get("#signin-button").click();
    cy.get(".error-message").should("not.be.visible");
  });

  it("登録されていないメールアドレスを入力した場合", () => {
    cy.visit("/signin");
    cy.get("#email").type("hogehog");
    cy.get("#password").type("hogehoge");
    cy.get("#signin-button").click();
    cy.get(".error-message").should("be.visible");
    cy.get(".error-message").should("have.text", "そのユーザは存在しません");
  });

  it("誤ったパスワードを送信したとき", () => {
    cy.visit("/signin");
    cy.get("#email").type("hogehoge");
    cy.get("#password").type("hogeh");
    cy.get("#signin-button").click();
    cy.get(".error-message").should("be.visible");
    cy.get(".error-message").should(
      "have.text",
      "パスワードが正しくありません。"
    );
  });
});
