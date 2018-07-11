const {Browser, By, Key, until} = require("selenium-webdriver");

const url = "http://localhost:3000";

class rsvpPage {
    constructor(driver){
        this.driver = driver;
        this.locators = {
            productsFound: By.xpath('//*[@id="root"]/div/main/div[2]/div[1]/small/span'),
            sortFeature: By.className('sort'),
            sizes: By.className('filters'),
            XS: By.xpath('//*[@id="root"]/div/main/div[1]/div[1]/label/span'),
            trolleyIcon: By.className('bag'),
            emptyState: By.className('shelf-empty'),
            addToTrolley: By.xpath('//*[@id="root"]/div/main/div[2]/div[2]/div[4]'),
            trolleyContents: By.className('float-cart__shelf-container'),
            closeTrolley: By.className('float-cart__close-btn'),

        };
    }
    open() {
        this.driver.get(url);
    }
}

module.exports = rsvpPage;

