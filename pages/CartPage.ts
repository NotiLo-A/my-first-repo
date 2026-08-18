import { Page, Locator } from '@playwright/test';

export class CartPage {
    page: Page;
    cartItems: Locator;
    checkoutButton: Locator;
    continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }

    async getCartItemNames() {
        return this.cartItems.locator('.inventory_item_name').allTextContents();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }
}