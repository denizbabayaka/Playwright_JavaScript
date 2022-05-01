const { test, expect } = require('@playwright/test'); // import {test} from '@playwright/test';




test.only('Page First Playwright test', async ({ browser, page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();
    // we are checking satate of an element  hidden elemet by clicking on the button
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page. locator ("#hide-textbox").click();
    await expect (page. locator("#displayed-text")).toBeHidden();
    //await page.pause();
    //This method handles java popups 
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    
    //page.on('dialog', dialog => dialog.dismiss()); // it will click cancel button on the popup
    // hover over the element 
    await page. locator ("#mousehover").hover();
    //This memethod will switch to the iframe 
    const framesPage = page.frameLocator("#courses-iframe");
    //playwright wiil focus only visible locator 
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    // we are grabbinkg the text
    const textCheck= await framesPage.locator(".text h2").textContent();
    // we are splitting the text and checking the second  element
    console.log(textCheck.split(" ")[1]);
    

    















});