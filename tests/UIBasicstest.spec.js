const { test, expect } = require('@playwright/test'); // import {test} from '@playwright/test';



// test annotation is used to describe a test case.coming from @playwright/test
// browser is a global variable that is available in all test cases.
//Line 10 and 12 are the same concept with line 6 ({browser,page} unless we do not want to inject any cookie from the previous tab
test.only('Page First Playwright test', async ({ browser, page }) =>
// Since javascript asyncronus we have to write await command to exucute the code in order 
{
    //Creates a new browser instance context. It won't share cookies/cache with other browser contexts.
    //const context = await browser.newContext();
    // Creates a new page in the browser context.
    //const page = await context.newPage();  
    // Navigates to the given url.
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator('#username').type('deniz');
    await page.locator("[type='password']").type("12345");
    await page.locator("#signInBtn").click();

});

test('First Playwright test with browser context declaration', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://google.com");
    //get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
    //css . xpath
    /*
    If Id is present
    css -> tagname#id (or) #id
    If class attribute is present
    Css -> tagname.class (or) .class
    Write css based on any Attribute
    css -> [attribute='value']
    Write Css with traversing from Parent to child
    css -> parenttagname >> childtagname
    If needs to write the locator based on text
    text=''
    */
    


});

// npx playwright test --headed
//npx playwright show-report