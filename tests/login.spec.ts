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
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('teste');
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText(
      'identyfikator ma min. 8 znaków',
    );
  });

  test('Login unsucesfull - too short password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerLO');
    await page.getByTestId('password-input').fill('bartk');
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText(
      'hasło ma min. 8 znaków',
    );
  });
});
