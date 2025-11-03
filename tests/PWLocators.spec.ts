
/*
page.getByRole(). to locate elements with explicit and implicet attritube
page.getByAltText() to locate elements from image 
page.getByText() to locate text Content
page.getByLable()  to locate form control by assosicate lables
page.getByPlaceholder() to loacte and input by placeholder
page.getByTitle() to locate an element by its attrictube
page.getByTestId() to locate element by its data -testid


i represents case insensitive
*/

import { test, expect, Page } from '@playwright/test';

test('Verify nopCommerce home page elements', async ({ page }: { page: Page }) => {
  // Navigate to the website
  await page.goto('https://demo.nopcommerce.com/');

  // Verify the main logo link is visible
  await expect(page.getByRole('link', { name: 'nopCommerce demo store' })).toBeVisible();

  // Verify body contains specific text
  await expect(page.locator('body')).toContainText('nopCommerce');

  // Verify heading is visible
  await expect(page.getByRole('heading', { name: 'Welcome to our store' })).toBeVisible();

  // Example: verify an image using alt text
  await expect(page.getByAltText('nopCommerce demo store')).toBeVisible();

  // Example: verify text content using getByText
  await expect(page.getByText('Welcome to our store')).toBeVisible();

  // Click on the heading (for interaction)
  await page.getByRole('heading', { name: 'Welcome to our store' }).click();

  await page.getByRole('link', { name: 'Register' }).click();  //get by role built-in locator

  //get by lable built-in locator examples in reguster page with first,last name and email.
  //await page.getByLabel('First name:').fill('dhanu');
  //await page.getByLabel('Last name:').fill('shree');
  //await page.getByLabel('Email:').fill('dhanushree@gmail.com');

});




test.setTimeout(60000);

test('Verify nopCommerce home page elements2', async ({ page }: { page: Page }) => {
  await page.goto('https://demo.nopcommerce.com/');

  await page.getByRole('link', { name: 'Register' }).click();

// Wait for the form to appear
await expect(page.getByLabel('First name:')).toBeVisible();

// Fill fields
await page.getByLabel('First name:').fill('dhanu');
await page.getByLabel('Last name:').fill('shree');
await page.getByLabel('Email:').fill('dhanushree@gmail.com');
});
