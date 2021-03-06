const { test, expect, request } = require('@playwright/test'); // import {test} from '@playwright/test';
//in this test we are using the request package to make a request to the server
// and we are using the response json package to check the response elements 
// later we are using the token to login to the website without using the username and password from UI
//whatever information we send  from the UI we can send it fro-m the API 

//This is a javaScript object so no need to put double qoute to the key 
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" }
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "620c7dee48767f1f1215d2de" }] };
let token = null;
let orderId = null;


test.beforeAll(async () => {

    // we are using this method to open a request context inside api and assign it to a variable
    const apiContext = await request.newContext();
    // making a post call to this end point and assign the response to a variable loginResponse
    // basically this variable has loaded every data  regarding the API call 
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: loginPayLoad // we are passing the loginPayLoad object to the post method
        });
    //checking the status code of the response from response object
    expect(loginResponse.ok()).toBeTruthy();
    //grab the response body and assign it to a variable
    const loginResponseJson = await loginResponse.json();
    //grab the token from the response body and assign it to a variable
    token = loginResponseJson.token;
    console.log(token);

    //
    //This will open a new APi context
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: orderPayLoad,
        //we are sending header inside token and payload as json
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
    })
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId =  orderResponseJson.orders[0];


});



test.beforeEach(() => {


});




test('Place the order', async ({ browser, page }) => {

    //This method wiil insert the script into the local storage of the browser
    //This is a method of javascript it will store 'token' as a key and token var as a value'
    //inspect=>Application=>localStorage=>'token':token( this is the  place we are inserting token)
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client")
    // await page.locator("#userEmail").fill(email);
    // await page.locator("#userPassword").type("Iamking@000");
    // await page.locator("[value='Login']").click(); 
    //\const productName = 'zara coat 3';
    const email = "anshika@gmail.com";
    const products = page.locator(".card-body");

    //Since html works on API calls this code will wait all elements  until all the get calls are done
    //and page fully loaded and DOM is ready basically this code mekes an API call and waits for the response
    // if we use that code we do not need to use line 21 
    //Those method works for service based web application which allow API call to the other 
    //third parties
    //\await page.waitForLoadState("networkidle");
    //\await page.locator(".card-body b").nth(0).textContent();
    //\const allTextContents = await page.locator(".card-body b").allTextContents();
    //\console.log(allTextContents);
    //\const count = await products.count();
    //\for (let i = 0; i < count; i++) {
    //This will reach the b tag which has got the text of this element in the same div tag
    // and extract the text from that tag
    //\if (await products.nth(i).locator("b").textContent() === productName) {
    // This will find the element which has got the text of this element in the same div tag
    //this tecnique we call locator chain
    //\await products.nth(i).locator("text= Add To Cart").click();
    //\break;
    //\}

    //\}



    //\await page.locator("[routerlink*='cart']").click();

    //This locator will wait until the first element is visible on the page for loading
    //\await page.locator("div li").last().waitFor();

    //since there could be more than one "Zara Coat 4" text in other div tags
    //we are giving the specific tag of that method to get the text
    //Those locating methods belong to Playwright API
    //\const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    //\expect(bool).toBeTruthy();

    //Those are 2 ways to get the text locator of the checkout button
    //await page.locator("button:has-text('Checkout')").click();
    //\await page.locator('button[type="button"]').nth(1).click();
    //This delay method will type the chracters in the text box in order to synchronize with the
    //text box otherwise page can not catch the playwright 
    //\await page.locator('[placeholder="Select Country"]').type("ind", { delay: 100 });
    // we will get all the results from dropdown
    //\const dropdown = page.locator('.ta-results')
    // wait for the dropdown to be visible
    //\await dropdown.waitFor();
    // get the count index of the dropdown options 
    //\const optionsCount = await dropdown.locator("button").count();
    //loop through the options
    //\for (let i = 0; i < optionsCount; ++i) {
    // get the text of the options based on index
    //\text = await dropdown.locator("button").nth(i).textContent();
    //Inside DOM this element text has got a space be aware of that
    //\if (text === " India") {
    //\await dropdown.locator("button").nth(i).click();
    //\break;
    //\}
    //\}



    //.user_name [type='text'] => chaining css locator
    //\await expect(page.locator("label[type='text']")).toHaveText(email);
    //\await page.locator('.action__submit').click();

    //\await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); //
     //\const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
     //\console.log(orderId);

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
    await page.pause();
    //This will check from the new page  if the orderIdDetails includes the orderId 
    expect(orderId.includes(orderIdDetails)).toBeTruthy();








});

//npx playwright test tests/ClientApp.spec.js =>run specific file in the folder