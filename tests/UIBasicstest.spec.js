const { test } = require('@playwright/test'); // import {test} from '@playwright/test';

// test annotation is used to describe a test case.coming from @playwright/test
// browser is a global variable that is available in all test cases.
test('First Playwright test', async ({browser}) =>
// Since javascript asyncronus we have to write await command to exucute the code in order 
{
   //Creates a new browser instance context. It won't share cookies/cache with other browser contexts.
   const context = browser.newContext();
   // Creates a new page in the browser context.
    context.newPage();  
   
   

});