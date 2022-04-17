const { test, expect } = require('@playwright/test'); // import {test} from '@playwright/test';




test.only('Page First Playwright test', async ({ browser, page }) => {

    await page.goto("https://rahulshettyacademy.com/client")
    const productName = 'Zara Coat 4';
    const products = page. locator(".card-body");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").type("Iamking@000");
    await page.locator("[value='Login']").click();
    //Since html works on API calls this code will wait all elements  until all the get calls are done
    //and page fully loaded and DOM is ready basically this code mekes an API call and waits for the response
    // if we use that code we do not need to use line 16 
    //Those method works for service based web application which allow API call to the other 
    //third parties
    await page1.waitForLoadState("networkidle");
    //await page.locator(".card-body b").nth(0).textContent();
    const allTextContents = await page.locator(".card-body b").allTextContents();
    console.log(allTextContents);
   const count = await products.count();
   for(let i = 0; i < count; i++){
       //This will reach the b tag which has got the text of this element in the same div tag
       // and extract the text from that tag
       const text = await products.nth(i).locator("b").textContent();
       console.log(text);
   }
   





});

//npx playwright test tests/ClientApp.spec.js =>run specific file in the folder