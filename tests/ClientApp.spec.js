const { test, expect } = require('@playwright/test'); // import {test} from '@playwright/test';




test.only('Page First Playwright test', async ({ browser, page }) => {

    await page.goto("https://rahulshettyacademy.com/client")
    await page. locator("#userEmail").fill("anshika@gmail.com");
    await page. locator("#userPassword").type("Iamking@000");
    await page.locator("[value='Login']").click();
    //Since html works on API calls this code will wait all elements  until all the get calls are done
    //and page fully loaded and DOM is ready basically this code mekes an API call and waits for the response
    // if we use that code we do not need to use line 16 
    await page.waitForLoadState("networkidle");
    //await page.locator(".card-body b").nth(0).textContent();
    const allTextContents = await page.locator(".card-body b").allTextContents();
    console.log(allTextContents);
    
    



});

//npx playwright test tests/ClientApp.spec.js =>run specific file in the folder