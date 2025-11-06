import { test, expect } from '@playwright/test';

test('Automation Practice Demo with Waits', async ({ page }) => {

  const pause = (ms = 800) => page.waitForTimeout(ms);

  await page.goto('https://testautomationpractice.blogspot.com/');
  await pause();

  await expect(page.getByRole('heading', { name: 'Automation Testing Practice' })).toBeVisible();
  await pause();

  await expect(page.getByText('For Selenium, Cypress &')).toBeVisible();
  await pause();

  await expect(page.getByRole('link', { name: 'GUI Elements' })).toBeVisible();
  await pause();

  // Enter Name
  await page.getByRole('textbox', { name: 'Enter Name' }).click();
  await pause();
  await page.getByRole('textbox', { name: 'Enter Name' }).fill('');
  await pause();
  await page.getByRole('textbox', { name: 'Enter Name' }).press('CapsLock');
  await pause();
  await page.getByRole('textbox', { name: 'Enter Name' }).fill('Dhanushree');
  await pause();

  // Email
  await page.getByRole('textbox', { name: 'Enter EMail' }).click();
  await pause();
  await page.getByRole('textbox', { name: 'Enter EMail' }).fill('abc@gmail.com');
  await pause();

  // Phone
  await page.getByRole('textbox', { name: 'Enter Phone' }).click();
  await pause();
  await page.getByRole('textbox', { name: 'Enter Phone' }).fill('12345');
  await pause();

  // Address
  await page.getByRole('textbox', { name: 'Address:' }).click();
  await pause();
  await page.getByRole('textbox', { name: 'Address:' }).fill('#123, mysore');
  await pause();

  // Gender radio
  await page.getByRole('radio', { name: 'Female' }).check();
  await pause();

  // Days checkboxes
  await page.getByRole('checkbox', { name: 'Sunday' }).check();
  await pause();
  await page.getByRole('checkbox', { name: 'Tuesday' }).check();
  await pause();
  await page.getByRole('checkbox', { name: 'Thursday' }).check();
  await pause();

  // Dropdowns
  await page.getByLabel('Country:').selectOption('india');
  await pause();

  await page.getByLabel('Colors:').selectOption('white');
  await pause();

  await page.getByLabel('Sorted List:').selectOption('elephant');
  await pause();

  // DATE PICKER #1 (jQuery datepicker)
  await page.locator('#datepicker').click();
  await pause();

  // Select day 2
  await page.locator('#ui-datepicker-div')
    .getByRole('link', { name: '2', exact: true })
    .click();
  await pause();

  //  DATE PICKER #2 (inline calendar)
  await page.locator('#txtDate').click();
  await pause();

  // Select day 5
  await page.getByRole('link', { name: '5', exact: true }).click();
  await pause();

  //  DATE RANGE PICKER
  await page.getByPlaceholder('Start Date').click();
  await pause();
  await page.getByPlaceholder('Start Date').fill('2025-10-29');
  await pause();

  await page.getByPlaceholder('End Date').click();
  await pause();
  await page.getByPlaceholder('End Date').fill('2025-11-05');
  await pause();

  //  SUBMIT BUTTON
  await page
    .locator('#post-body-1307673142697428135')
    .getByRole('button', { name: 'Submit' })
    .click();
  await pause();

  console.log(" Date selection script executed successfully!");

});
