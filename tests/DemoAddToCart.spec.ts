import { test, expect } from '@playwright/test';

// Test Case: Complete Guest Checkout Flow
test('Verify Guest Checkout Flow on Demo Web Shop', async ({ page }) => {
  test.setTimeout(60000); // extend timeout for full checkout flow

  // STEP 1: Navigate to Home Page
  await page.goto('https://demowebshop.tricentis.com/');
  await expect(page.getByRole('link', { name: 'Tricentis Demo Web Shop' })).toBeVisible();

  // STEP 2: Verify top navigation menu
  await expect(page.getByRole('link', { name: 'Books' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Computers' }).first()).toBeVisible();
  await expect(page.getByText('Electronics Camera, photo').first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Apparel & Shoes' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Digital downloads' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Jewelry' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Gift Cards' }).first()).toBeVisible();

  // STEP 3: Click on “Books” category
  await page.getByRole('link', { name: 'Books' }).first().click();
  await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible();
  await expect(page.getByText('Home / Books')).toBeVisible();

  // STEP 4: Add first available book to cart
  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  // NEW: Wait for green success notification (ensures item was added)
  await expect(page.locator('.bar-notification.success')).toBeVisible();

  // NEW: Click the “Shopping cart” link inside that notification (most reliable)
  await page.locator('.bar-notification.success a').click();

  // STEP 5: Wait until Shopping Cart page loads
  await page.waitForURL('**/cart');
  await expect(page.locator('.cart-item-row')).toBeVisible(); // verify product is in cart

  // STEP 6: Agree to terms and proceed to Checkout
  await page.waitForSelector('#termsofservice', { state: 'visible' });
  await page.locator('#termsofservice').check();
  await page.getByRole('button', { name: 'Checkout' }).click();

  // STEP 7: Proceed as Guest
  await expect(page.getByRole('heading', { name: 'Welcome, Please Sign In!' })).toBeVisible();
  await page.getByRole('button', { name: 'Checkout as Guest' }).click();

  // STEP 8: Fill Billing Address Form
  await page.getByRole('textbox', { name: 'First name:' }).fill('abc');
  await page.getByRole('textbox', { name: 'Last name:' }).fill('xyz');
  await page.getByRole('textbox', { name: 'Email:' }).fill('abc@gmail.com');
  await page.getByRole('textbox', { name: 'Company:' }).fill('abc');
  await page.getByLabel('Country:').selectOption('41'); // 41 = India
  await page.getByRole('textbox', { name: 'City:' }).fill('Bangalore');
  await page.getByRole('textbox', { name: 'Address 1:' }).fill('#123, Main Street');
  await page.getByRole('textbox', { name: 'Address 2:' }).fill('Near Park');
  await page.getByRole('textbox', { name: 'Zip / postal code:' }).fill('560001');
  await page.getByRole('textbox', { name: 'Phone number:' }).fill('9876543210');
  await page.getByRole('textbox', { name: 'Fax number:' }).fill('123');

  // STEP 9: Continue to Shipping Method
  await page.getByRole('button', { name: 'Continue' }).click();

  /// STEP 10: Shipping Method
  await page.getByRole('checkbox', { name: 'In-Store Pickup' }).check();
  await page.getByRole('button', { name: 'Continue' }).click();

    // STEP 11: Payment Method
  const codOption = page.getByLabel('Cash On Delivery (COD) (7.00)');
  await codOption.check(); // re-select COD to trigger site JS
  
  // Wait for Continue button to be enabled
  const paymentContinueBtn = page.locator('input.button-1.payment-method-next-step-button');
  await paymentContinueBtn.waitFor({ state: 'visible' });
  await expect(paymentContinueBtn).toBeEnabled();

  // Click Continue after enabling
  await paymentContinueBtn.click();

  // STEP 12: Payment Information
  await expect(page.getByText('You will pay by COD')).toBeVisible();
  await page.getByRole('button', { name: 'Continue' }).click();

  // STEP 13: Confirm Order
  await expect(page.getByRole('cell', { name: 'Product(s)' })).toBeVisible();
  await page.getByRole('button', { name: 'Confirm' }).click();

  // STEP 14: Verify Order Completion
  await expect(page.getByRole('heading', { name: 'Thank you' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue' }).click();

  // STEP 15: Final Confirmation - Back to Home Page
  await expect(page.getByRole('link', { name: 'Tricentis Demo Web Shop' })).toBeVisible();
  console.log(' Guest checkout flow completed successfully!');
});