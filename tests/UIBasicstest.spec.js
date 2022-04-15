const {test}=require('@playwright/test'); // import {test} from '@playwright/test';

// test annotation is used to describe a test case.coming from @playwright/test
test('First Playwright test',  function()
{ 
  const browser = await t.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.google.com');
  await page.screenshot({path: 'google.png'});
  await browser.close();
});