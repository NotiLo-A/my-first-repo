import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test.describe('E2E тест для saucedemo.com', { tag: '@ui' }, () => {
    test('покупка самого дорогого товара', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        const checkoutCompletePage = new CheckoutCompletePage(page);

        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        expect(await inventoryPage.getPageTitle()).toBe('Products');

        const mostExpensiveItemName = await inventoryPage.getMostExpensiveItemName();
        await inventoryPage.addItemToCart(mostExpensiveItemName);

        await inventoryPage.openCart();

        const cartItemNames = await cartPage.getCartItemNames();
        expect(cartItemNames).toContain(mostExpensiveItemName);
        expect(cartItemNames).toHaveLength(1);

        await cartPage.goToCheckout();

        await checkoutStepOnePage.fillUserInfo('Test1', 'User1', '12345');
        await checkoutStepOnePage.continueCheckout();

        await checkoutStepTwoPage.finishCheckout();

        const completionMessage = await checkoutCompletePage.getCompletionMessage();
        expect(completionMessage).toBe('Thank you for your order!');
    });
});