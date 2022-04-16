const { test, expect } = require('@playwright/test'); // import {test} from '@playwright/test';



// test annotation is used to describe a test case.coming from @playwright/test
// browser is a global variable that is available in all test cases.
//Line 10 and 12 are the same concept with line 8 ({browser,page} unless we do not want to inject any cookie from the previous tab
test.only('Page First Playwright test', async ({ browser, page }) =>
// Since javascript asyncronus we have to write await command to exucute the code in order 
{
    //Creates a new browser instance context. It won't share cookies/cache with other browser contexts.
    //const context = await browser.newContext();
    // Creates a new page in the browser context.
    //const page = await context.newPage();  
    // Navigates to the given url.
    const userName = page. locator('#username');
    const password = page. locator("[type='password']");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.type('rahulshettyacademy');
    await password.type("learning");
    
    //This method line:29 will wait all the elements loaded before clicking on the button
    //we are not allowing to step further until this 2 steps are done we are wrapping them in array
    await Promise.all(
    [    
        page.waitForNavigation(),
        signIn.click(),
    ]
    );
    //This element is not visible on the page everytime so playwright will wait it 
    //until it is visible without writing wait command bsed on the configuration we have set.
    //timeout: 30 * 1000, comin from playwright.config.js
    // console.log(await page.locator("[style*='block']").textContent());
    // await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    // //type-fill
    // await userName.fill("");
    // await userName.fill("deniz");
    // await signIn.click();
    //This will return first element text
    //console.log(await page.locator(".card-body a").nth(0).textContent());
    console.log(await cardTitles.first().textContent());
    //This will grab all the titles on this element list  and print them out as an array
    // we have to use this method after line 35 or 36 because we have to wait those elements attached to the DOM
    console.log(await cardTitles.allTextContents());

    




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