const { test, expect } = require('@playwright/test'); // import {test} from '@playwright/test';

let webContext;


test.beforeAll(async ({browser}) => {
    
/* This code is creating a new browser context and storing all the cookies in the browser and storing
them in a json file. */
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").type("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState("networkidle");
    //wThis method store all the cookies in the browser
    //and store theem in a json file 
    await context.storageState({path:'state.json'});
    //we are passing json file to new browser context
    //and assing it to the webContext var so new browser will have all the cookies like token 
    webContext = await browser.newContext({storageState:'state.json'});
 

})


test('Page First Playwright test', async () => {
    
    const email = "anshika@gmail.com";
    const productName = 'Soil';
    //we are defining page with new context includes all the storageState
    //so whwn the app opens in new url every information will be stored in the browser
    const page= await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client")
    const products = page.locator(".card-body");

    //Since html works on API calls this code will wait all elements  until all the get calls are done
    //and page fully loaded and DOM is ready basically this code mekes an API call and waits for the response
    // if we use that code we do not need to use line 21 
    //Those method works for service based web application which allow API call to the other 
    //third parties
   
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
    
    

    await page.locator("[routerlink*='cart']").click();
    
    //This locator will wait until the first element is visible on the page for loading
    await page.locator("div li").first().waitFor();

    //since there could be more than one "Zara Coat 4" text in other div tags
    //we are giving the specific tag of that method to get the text
    //Those locating methods belong to Playwright API
    const bool = await page.locator("h3:has-text('Soil')").isVisible();
    expect(bool).toBeTruthy();

    //Those are 2 ways to get the text locator of the checkout button
    //await page.locator("button:has-text('Checkout')").click();
    await page.locator('button[type="button"]').nth(1).click();
    //This delay method will type the chracters in the text box in order to synchronize with the
    //text box otherwise page can not catch the playwright 
    await page.locator('[placeholder="Select Country"]').type("ind", { delay: 100 });
    // we will get all the results from dropdown
    const dropdown = page.locator('.ta-results')
    // wait for the dropdown to be visible
    await dropdown.waitFor();
    // get the count index of the dropdown options 
    const optionsCount = await dropdown.locator("button").count();
    //loop through the options
    for (let i = 0; i < optionsCount; ++i) {
        // get the text of the options based on index
        text = await dropdown.locator("button").nth(i).textContent();
        //Inside DOM this element text has got a space be aware of that
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
   


    //.user_name [type='text'] => chaining css locator
    await expect(page.locator("label[type='text']")).toHaveText(email);
    await page.locator('.action__submit').click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator('text="ORDERS"').click();
    await page.locator("tbody").waitFor();

    // it will grab the rows of the body of the table
    const rows = await page.locator("tbody tr")
    // loop through the rows
    for (let i = 0; i < await rows.count(); ++i) {
        // get the textContent of the inside the row
        const roworderId = await rows.nth(i).locator("th").textContent();
        // we are using include method to check if the order id is present in the row
        if (orderId.includes(roworderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    //This method  will wait till all the elements stable in the page
    await page.waitForLoadState("networkidle");
    // This locator will grab the id of the order
    const orderIdDetails = await page.locator(".col-text").textContent();
    //This will check from the new page  if the orderIdDetails includes the orderId 
    expect(orderId.includes(orderIdDetails)).toBeTruthy();


    //await page.pause();





});

/* This is a test case which is testing the same functionality as the first test case. */
test('Test case2',async()=>
{
    const email="";
    const productName='Zara Coat4';
    const page=await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products=page.locator(".card-body");
    const titles=await page.locator(".card-body b").allTextContents();
    console.log(titles);

})


//npx playwright test tests/ClientApp.spec.js =>run specific file in the folder