import { test, expect, Page } from '@playwright/test';

test('Verify registration flow in Tricentis Demo Web Shop', async ({ page }: { page: Page }) => {
  // Navigate to the registration page
  await page.goto('https://demowebshop.tricentis.com/register');

  // Verify that the main logo link is visible
  await expect(page.getByRole('link', { name: 'Tricentis Demo Web Shop' })).toBeVisible();

  // Verify heading and section text
  await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();
  await expect(page.getByText('Your Personal Details')).toBeVisible();

  // Select gender
  await page.getByRole('radio', { name: 'Female' }).check();

  // Fill personal details
  await page.getByRole('textbox', { name: 'First name:' }).fill('Dhanu');
  await page.getByRole('textbox', { name: 'Last name:' }).fill('Shree');
  await page.getByRole('textbox', { name: 'Email:' }).fill('abc@gmail.com');

  // Password and confirm password
  await page.locator('#Password').fill('testing');
  await page.locator('#ConfirmPassword').fill('testing');

  // Verify Register button and click
  const registerButton = page.getByRole('button', { name: 'Register' });
  await expect(registerButton).toBeVisible();
  await registerButton.click();

});
