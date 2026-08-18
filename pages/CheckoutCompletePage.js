export class CheckoutCompletePage {
    constructor(page) {
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
