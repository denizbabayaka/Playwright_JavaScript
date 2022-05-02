const {test, expect, request} = require('@playwright/test');
// we are importing the APIUtils.js from utils folder 
const {APIUtils}=require('./utils/APIUtils');
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" }
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "620c7dee48767f1f1215d2de" }] };
let response;

test.beforeAll(async () => {
    
    const apiContext =await request.newContext();
    const apiUtils =new APIUtils(apiContext,loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);


});

test('Place the order', async ({ browser, page }) => {
   
    //This method wiil insert the script into the local storage of the browser
    //This is a method of javascript it will store 'token' as a key and token var as a value'
    //inspect=>Application=>localStorage=>'token':token( this is the  place we are inserting token)
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
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
        if (response.orderId.includes(roworderId)) {
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
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();








});