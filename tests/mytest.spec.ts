

//syntax
/*
import {test,expect} from "@playwright/test";
//test ("title",() =>{

    //step 1
    //step 2
    //step 3
//})
*/


import { test, expect, Page } from '@playwright/test';

test.setTimeout(60000); // increase timeout to 60s

test('Verify page title and URL', async ({ page }: { page: Page }) => {
  // Navigate to the website
  await page.goto('http://www.automationpractice.pl/index.php');

  // Verify that the "My Shop" link is visible
  await expect(page.getByRole('link', { name: 'My Shop' })).toBeVisible();

  // Verify the page title
  await expect(page).toHaveTitle(/My Shop/i);

  // Verify the page URL
  await expect(page).toHaveURL('http://www.automationpractice.pl/index.php');
});
