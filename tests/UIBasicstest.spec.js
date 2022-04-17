const { test, expect } = require('@playwright/test'); // import {test} from '@playwright/test';



// test annotation is used to describe a test case.coming from @playwright/test
// browser is a global variable that is available in all test cases.
//Line 10 and 12 are the same concept with line 8 ({browser,page} unless we do not want to inject any cookie from the previous tab
test('Page First Playwright test', async ({ browser, page }) =>
// Since javascript asyncronus we have to write await command to exucute the code in order 
{
    //Creates a new browser instance context. It won't share cookies/cache with other browser contexts.
    //const context = await browser.newContext();
    // Creates a new page in the browser context.
    //const page = await context.newPage();  
    // Navigates to the given url.
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.type('rahulshettyacademy');
    await password.type("learning");

    //This method line:29 will wait all the elements loaded for product page after clicking on the button
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
    //console.log(await cardTitles.first().textContent());
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

test('UI Controls', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const blink = page.locator('.blinkingText'); //or =>[href*='documents-request']
    //("select.form-control")=> selector is the tagname comes before class name
    const dropdown = page.locator("select.form-control")
    // pass the value of the element
    await dropdown.selectOption("consult");
    //since execution is so fast we put a pause
    // after exucing this code we will see Playeright Inspector in the browser
    // since there is two radio button we will click on the second one
    await page.locator(".radiotextsty").last().click();
    // this is a web based pop up window 
    await page.locator("#okayBtn").click();
    //return true or false 
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked()
    await page.locator("#terms").click();
    console.log(await page.locator("#terms").isChecked());
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    // since the action isChecked performed iside tha bracket we have to wait inside the bracket
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    //checks the element attribute based on class value 
    await expect(blink).toHaveAttribute('class', 'blinkingText');



    await page.pause();







});

test(' Child windows hadl', async ({browser})=> {
  const context =await browser.newContext(); 
  const page= await context.newPage(); 
  const userName= page. locator('#username');
  const password = page.locator("[type='password']");
  const signIn = page.locator("#signInBtn");

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const documentLink = page. locator("[href*='documents-request']");

    //we put promise because after clicking the link new window will open and we have to create a new
    // browser context to handle that new window and then we can use that context to navigate 
    //to the new page those two methods wait each others work to be done to proceed to the next step
    // and we aasign new page to a variable newPage for the other tab 
    //and focus of this newPage browser instance  will be new opened window
    // we put the newPage to array maybe new page would be open more than one 
    const [newPage]=await Promise.all(
    [    
        context.waitForEvent('page'),
        documentLink.click(),
    ])
    // beatuy of playwright is we can handle multiple tabs with new browser instance s
     text = await newPage.locator(".red").textContent(); 
     console.log(text);
     const arrayText=text.split("@") //it will split the text from the  @
     // it will bring right side of that split text
     // and again split it from the wide space and bring first element of the array
     const domain=arrayText[1].split(" ")[0]
     console.log(domain);
     const username =domain.split(".")[0]
     //Now tricky part is we capture the domain and using first page  (line 125) browser instance
     //we will paste this domain to the username field which is first window 
     // scope of fist page instance is only first  window
     await page1.locator("#username").type(username);
     await page.locator("#password").type("learning");
     await page.locator("#signInBtn").click();
    
     await newPage.pause();
    


   
   


});

// npx playwright test --headed
//npx playwright show-report
//npx playwright test tests/UIBasicstest.spec.js --debug => test will start in debug mode 
// npx playwright codegen http://google.com => this will generate the code for the page
//https://trace.playwright.dev/ => open trace zip file 