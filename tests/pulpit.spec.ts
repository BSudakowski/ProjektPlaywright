import {test, expect} from '@playwright/test';
import {loginData} from "../test-data/login.data";

test.describe('Pulpit Tests', () => {
    test.beforeEach(async ({page}) => {
        const userID = loginData.userID;
        const userPassword = loginData.password;

        await page.goto('/');
        await page.getByTestId('login-input').fill(userID);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();
    });

    test('Payment Happy Path', async ({page}) => {
        //Arange
        const receiverId = '2';
        const transferAmount = '150';
        const transferTitle = 'pizza';
        const expectedTransferReceiver = 'Chuck Demobankowy';

        //Act
        await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
        await page.locator('#widget_1_transfer_amount').fill(transferAmount);
        await page.locator('#widget_1_transfer_title').fill(transferTitle);

        await page.getByRole('button', {name: 'wykonaj'}).click();
        await page.getByTestId('close-button').click();

        //Assert
        await expect(page.locator('#show_messages')).toHaveText(
            `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
        );
    });

    test('Mobile Top-up Happy Path', async ({page}) => {
        //Arange
        const topupReceiver = '502 xxx xxx';
        const topupAmount = '19';
        const expectedMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`;

        //Act
        await page.locator('#widget_1_topup_receiver').selectOption(topupReceiver);
        await page.locator('#widget_1_topup_amount').fill(topupAmount);
        await page.locator('#uniform-widget_1_topup_agreement span').click();
        await page.getByRole('button', {name: 'doładuj telefon'}).click();
        await page.getByTestId('close-button').click();

        //Assert
        await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
    });

    test('Mobile Top-up Happy Path with ballance check', async ({page}) => {
        //Arange
        const topupReceiver = '502 xxx xxx';
        const topUpAmount = '19';
        const initialBalance = await page.locator('#money_value').innerText();
        const expectedBalance = Number(initialBalance) - Number(topUpAmount);

        //Act
        await page.locator('#widget_1_topup_receiver').selectOption(topupReceiver);
        await page.locator('#widget_1_topup_amount').fill(topUpAmount);
        await page.locator('#uniform-widget_1_topup_agreement span').click();
        await page.getByRole('button', {name: 'doładuj telefon'}).click();
        await page.getByTestId('close-button').click();

        //Assert
        await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
    });
});
