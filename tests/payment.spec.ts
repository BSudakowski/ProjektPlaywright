import {test, expect} from '@playwright/test';
import {loginData} from "../test-data/login.data";

test.describe('Payment Tests', () => {
    test.beforeEach(async ({page}) => {
        const userID = loginData.userID;
        const userPassword = loginData.password;

        await page.goto('/');
        await page.getByTestId('login-input').fill(userID);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();
        await page.getByRole('link', {name: 'płatności'}).click();
    });

    test('simple payment', async ({page}) => {
        //Arrange
        const transferReceiver = 'Jan Kowalski';
        const transferAccount = '12 3456 7890 1234 5678 9087';
        const transferAmount = '222';
        const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Kowalski`;
        //Act
        await page.getByTestId('transfer_receiver').fill(transferReceiver);
        await page.getByTestId('form_account_to').fill(transferAccount);
        await page.getByTestId('form_amount').fill(transferAmount);
        await page.getByRole('button', {name: 'wykonaj przelew'}).click();
        await page.getByTestId('close-button').click();
        //Assert
        await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
    });
});
