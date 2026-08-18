import { Page, Locator } from '@playwright/test';

export class CheckoutStepTwoPage {
    page: Page;
    summaryInfo: Locator;
    totalLabel: Locator;
    finishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.summaryInfo = page.locator('.summary_info');
        this.totalLabel = page.locator('.summary_total_label');
        this.finishButton = page.locator('#finish');
    }

    async getTotal() {
        return this.totalLabel.textContent();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
}