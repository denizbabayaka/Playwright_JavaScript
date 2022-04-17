const { test, expect } = require('@playwright/test'); // import {test} from '@playwright/test';




test.only('Page First Playwright test', async ({ browser, page }) => {

    await page.goto("https://rahulshettyacademy.com/client")
    const productName = 'Zara Coat 4';
    const products = page.locator(".card-body");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").type("Iamking@000");
    await page.locator("[value='Login']").click();
    //Since html works on API calls this code will wait all elements  until all the get calls are done
    //and page fully loaded and DOM is ready basically this code mekes an API call and waits for the response
    // if we use that code we do not need to use line 20 
    //Those method works for service based web application which allow API call to the other 
    //third parties
    await page.waitForLoadState("networkidle");
    //await page.locator(".card-body b").nth(0).textContent();
    const allTextContents = await page.locator(".card-body b").allTextContents();
    console.log(allTextContents);
    const count = await products.count();
    for (let i = 0; i < count; i++) {
        //This will reach the b tag which has got the text of this element in the same div tag
        // and extract the text from that tag
        if (await products.nth(i).locator("b").textContent() === productName) {
            // This will find the element which has got the text of this element in the same div tag
            //this tecnique we call locator chain
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
        
    }
    await page. locator("[routerlink*='cart']").click();
    //This locator will wait until the first element is visible on the page
    await page. locator("div li").first().waitFor();

    //since there could be more than one "Zara Coat 4" text in other div tags
    //we are giving the specific tag of that method to get the text
    //Those locating methods belong to Playwright API
    const bool=await page.locator("h3:has-text('Zara Coat 4')").isVisible();
    expect(bool).toBeTruthy();
    
    //Those are 2 ways to get the text locator of the checkout button
    //await page.locator("button:has-text('Checkout')").click();
    await page.locator('button[type="button"]').nth(1).click();
    //This delay method will type the chracters in the text box in order to synchronize with the
    //text box otherwise page can not catch the playwright 
    await page.locator('[placeholder="Select Country"]').type("ind", { delay: 100 });
    // we will get all the results from dropdown
    const dropdown =  page.locator('.ta-results')
    // wait for the dropdown to be visible
    await dropdown.waitFor();
    // get the count index of the dropdown options 
    const optionsCount = await dropdown.locator("button").count();
    //loop through the options
    for(let i =0;i< optionsCount; ++i)
   {
       // get the text of the options based on index
     text = await dropdown. locator("button").nth(i).textContent();
     //Inside DOM this element text has got a space be aware of that
    if(text ===" India")
    {
        await dropdown.locator("button").nth(i).click();
        break;
    }
   }


     await page.pause();





});

//npx playwright test tests/ClientApp.spec.js =>run specific file in the folder