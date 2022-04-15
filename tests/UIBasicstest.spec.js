const { test } = require('@playwright/test'); // import {test} from '@playwright/test';

// test annotation is used to describe a test case.coming from @playwright/test
// browser is a global variable that is available in all test cases.
//Line 10 and 12 are the same concept with line 6 ({browser,page} unless we do not want to inject any cookie from the previous tab
test('Page First Playwright test', async ({ browser, page }) =>
// Since javascript asyncronus we have to write await command to exucute the code in order 
{
    //Creates a new browser instance context. It won't share cookies/cache with other browser contexts.
    //const context = await browser.newContext();
    // Creates a new page in the browser context.
    //const page = await context.newPage();  
    // Navigates to the given url.
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

});

test.only('First Playwright test with browser context declaration', async ({ browser }) => {
    
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://google.com");
    //get title - assertion
    console.log (await page.title());
    //
});

// npx playwright test --headed
//npx playwright show-report