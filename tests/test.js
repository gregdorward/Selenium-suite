const {Browser, By, Key, until} = require("selenium-webdriver");
const {suite} = require("selenium-webdriver/testing");
var expect = require('chai').expect;
const RsvpPage = require('../tests/pageObjects');
const methods = require('../tests/methods');

suite(function (env) {

    describe('The react app', function() {


        let driver;
        let page;

        before(async () => {
            driver = await env.builder().build();
            page = await new RsvpPage(driver);
            await page.open();
        });

        it('contains the correct page title', async () => {
            let element = await driver.getTitle();

            expect(element).to.equal('React App');
        });

        it('displays the amount of products found', async () => {
            await driver.wait(until.elementLocated(page.locators.productsFound));
            let element = await driver.findElement(page.locators.productsFound).getText();
            expect(element).to.include('Product(s) found');
        });

        it('displays an empty trolley initially', async () => {
            await driver.wait(until.elementLocated(page.locators.trolleyIcon));
            let element = await driver.findElement(page.locators.trolleyIcon);
            await element.click();
            let emptyState = await driver.findElement(page.locators.emptyState).getText();
            expect(emptyState).to.include('Add some product in the bag');
            let closeTrolley = await driver.findElement(page.locators.closeTrolley);
            await closeTrolley.click();
        });

        it('contains a feature to sort products', async () => {
            await driver.wait(until.elementLocated(page.locators.sortFeature));
            let sortFeature = driver.findElement(page.locators.sortFeature);
            expect(sortFeature).to.exist;
        });

        it('displays a list of sizes to filter by', async () => {
            await driver.wait(until.elementLocated(page.locators.sizes));
            let sizes = driver.findElement(page.locators.sizes);
            expect(sizes).to.exist;
        });

        it('contains a list of all sizes', async () => {
            await driver.wait(until.elementLocated(page.locators.sizes));
            let sizes = await driver.findElement(page.locators.sizes).getText();
            console.log(sizes);
            expect(sizes).to.include('XXL');
           // sizes.should('include', 'XS' + 'S' + 'M' + 'ML' + 'L' + 'XL' + 'XXL');
        });




        it('allows a user to add an item to their trolley', async () => {
            await driver.wait(until.elementLocated(page.locators.addToTrolley));
            let addToTrolley = await driver.findElement(page.locators.addToTrolley);
            let size = await driver.findElement(page.locators.XS);

            await size.click();
            await addToTrolley.click();

            await driver.wait(until.elementLocated(page.locators.trolleyContents));
            let trolleyContents = await driver.findElement(page.locators.trolleyContents).getText();
            await console.log(trolleyContents);
            expect(trolleyContents).to.include('Quantity: 1');
        });

        it.only('can be viewed on a mobile', async () => {

            await driver.takeScreenshot();
            // screenshot will be output to this path
        });

        after(async () => {
            driver.quit();
        });
    });

    // describe('the RSVP site', function() {
    //
    //     let driver;
    //     let page;
    //
    //     before(async () => {
    //         driver = await env.builder().build();
    //         page = new RsvpPage(driver);
    //         await page.open();
    //     });
    //
    //     it('should have an invitee list', async () => {
    //         let elements = await driver.findElements(page.locators.invitedList);
    //         assert(elements.length > 0);
    //     });
    //
    //     it('should have a registrar list', async () => {
    //         let elements = await driver.findElements(page.locators.registrationForm);
    //         assert(elements.length > 0);
    //     });
    //
    //     it('should show invitees', async () => {
    //         let list = await driver.findElement(page.locators.invitedList);
    //         await driver.wait(until.elementLocated(page.locators.invitees));
    //         let text = await list.getText();
    //         assert(text.includes('Craig Dennis'));
    //     });
    //
    //     after(async () => {
    //         driver.quit();
    //     });
    // });
});