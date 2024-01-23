import { test, expect } from '@playwright/test';

test.describe('User login to demobank', () => {
  test('Login Happy Path', async ({ page }) => {
    //Arange
    const url = 'https://demo-bank.vercel.app/';
    const userID = 'testerBS';
    const userPassword = 'bartekkk';
    const expectedUserName = 'Jan Demobankowy';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('Login unsucesfull - too short name', async ({ page }) => {
    //Arange
    const url = 'https://demo-bank.vercel.app/';
    const incorrectUserID = 'teste';
    const expectedErorrMessage = 'identyfikator ma min. 8 znaków';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(incorrectUserID);
    await page.getByTestId('login-input').blur();

    //Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedErorrMessage,
    );
  });

  test('Login unsucesfull - too short password', async ({ page }) => {
    //Arange
    const url = 'https://demo-bank.vercel.app/';
    const userID = 'testerBS';
    const incorrectUserPassword = 'bar';
    const expectedErrorPasswordMessage = 'hasło ma min. 8 znaków';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(incorrectUserPassword);
    await page.getByTestId('password-input').blur();

    //Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedErrorPasswordMessage,
    );
  });
});
