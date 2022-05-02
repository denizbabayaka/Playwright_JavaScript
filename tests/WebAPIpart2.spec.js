const { test, expect, request } = require('@playwright/test'); // import {test} from '@playwright/test';
//in this test we are using the request package to make a request to the server
// and we are using the response json package to check the response elements 
// later we are using the token to login to the website without using the username and password from UI
//whatever information we send  from the UI we can send it fro-m the API 

//This is a javaScript object so no need to put double qoute to the key 
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" }
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "620c7dee48767f1f1215d2de" }] };
//in global (class) variable we use let keyword for later initalization
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
    //uP TO THIS STEP EVER DATA IS FEEDED TO THE APP BY API POST REQUEST WE ARE ONLY
    //VALIDATING THE ORDER ID FROM NOW ON
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator('text="ORDERS"').click();
    await page.locator("tbody").waitFor();

    // it will grab the rows of the body of the table
    const rows = await page.locator("tbody tr")
    // loop through the rows
    for (let i = 0; i < await rows.count(); ++i) {
        // get the textContent of the inside the row
        const roworderId = await rows.nth(i).locator("th").textContent();
        //This order id is coming from the API post  (line 44) call 
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



    
