import { test, expect } from '@playwright/test';

test.describe('Testy pulpitu', () => {

test('Przelew ścieżka pozytywna', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerLO');
    await page.getByTestId('password-input').fill('password');
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_transfer_receiver').selectOption('2');
    await page.locator('#widget_1_transfer_amount').fill('150');
    await page.locator('#widget_1_transfer_title').fill('pizza');

    await page.getByRole('button', { name: "wykonaj" }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza')

});

test.only('doładowanie telefonu ścieżka pozytywna', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerLO');
    await page.getByTestId('password-input').fill('password');
    await page.getByTestId('login-button').click();
    
    await page.locator('#widget_1_topup_receiver').selectOption('502 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill('19');
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 19,00PLN na numer 502 xxx xxx')

});

});