import { test, expect } from '@playwright/test';

test.describe('User login to demobank', () => {

  test('Logowanie ścieżka pozytywna', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerLO');
    await page.getByTestId('password-input').fill('bartekkk');
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
  });

  test('Logowanie ścieżka negatywna - za krótka nazwa', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('teste');
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');
  });

  test('Logowanie ścieżka negatywna - za krótki hasło', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerLO');
    await page.getByTestId('password-input').fill('bartk');
    await page.getByTestId('password-input').blur();
  
    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
  });

});