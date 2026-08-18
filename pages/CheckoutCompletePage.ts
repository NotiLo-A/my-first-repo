import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
    page: Page;
    completeHeader: Locator;
    backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.completeHeader = page.locator('.complete-header');
        this.backHomeButton = page.locator('#back-to-products');
    }

    async getCompletionMessage() {
        return this.completeHeader.textContent();
    }

    async backHome() {
        await this.backHomeButton.click();
    }
}