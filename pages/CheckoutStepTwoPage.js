export class CheckoutStepTwoPage {
    constructor(page) {
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
