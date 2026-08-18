import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    page: Page;
    pageTitle: Locator;
    cartIcon: Locator;
    sortDropdown: Locator;
    inventoryItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.inventoryItems = page.locator('.inventory_item');
    }

    async getPageTitle() {
        return this.pageTitle.textContent();
    }

    async sortByPriceHighToLow() {
        await this.sortDropdown.selectOption('hilo');
    }

    async getMostExpensiveItemName() {
        await this.sortByPriceHighToLow();
        return this.inventoryItems.first().locator('.inventory_item_name').textContent();
    }

    async addItemToCart(itemName: string) {
        const item = this.inventoryItems.filter({ hasText: itemName });
        await item.getByRole('button', { name: 'Add to cart' }).click();
    }

    async openCart() {
        await this.cartIcon.click();
    }
}