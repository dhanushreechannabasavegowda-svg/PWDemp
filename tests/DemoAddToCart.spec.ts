import { test, expect } from '@playwright/test';

// Test Case: Complete Guest Checkout Flow
test('Verify Guest Checkout Flow on Demo Web Shop', async ({ page }) => {
  test.setTimeout(60000); // extend timeout for full checkout flow

  // STEP 1: Navigate to Home Page
  await page.goto('https://demowebshop.tricentis.com/');
  await expect(page.getByRole('link', { name: 'Tricentis Demo Web Shop' })).toBeVisible();
  console.log(" Update: Navigated to Demo Web Shop home page");

  // STEP 2: Verify top navigation menu
  await expect(page.getByRole('link', { name: 'Books' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Computers' })).toBeVisible();
  await expect(page.getByText('Electronics Camera, photo')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Apparel & Shoes' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Digital downloads' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Jewelry' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Gift Cards' })).toBeVisible();
  console.log(" Update: Verified top navigation menu links");

  // STEP 3: Click on “Books” category
  await page.getByRole('link', { name: /^Books$/ }).click();
  await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible();
  await expect(page.getByText('Home / Books')).toBeVisible();
  console.log(" Update: Navigated to Books category");

  // STEP 4: Add first available book to cart
  const firstBookAddToCart = page.locator('.product-item input[value="Add to cart"]').nth(0);
  await firstBookAddToCart.click();
  console.log(" Update: Added first book to cart");

  // Wait for success notification
  await expect(page.locator('.bar-notification.success')).toBeVisible();
  console.log(" Update: Success notification appeared");

  // Click “Shopping cart” link in notification
  await page.locator('.bar-notification.success a[href*="cart"]').click();

  // STEP 5: Wait until Shopping Cart page loads
  await page.waitForURL('**/cart');
  await expect(page.locator('.cart-item-row')).toBeVisible();
  console.log(" Update: Shopping cart page loaded with item");

  // STEP 6: Agree to terms and proceed to Checkout
  await page.waitForSelector('#termsofservice', { state: 'visible' });
  await page.locator('#termsofservice').check();
  await page.getByRole('button', { name: /^Checkout$/ }).click();
  console.log(" Update: Proceeded to Checkout");

  // STEP 7: Proceed as Guest
  await expect(page.getByRole('heading', { name: 'Welcome, Please Sign In!' })).toBeVisible();
  await page.getByRole('button', { name: /^Checkout as Guest$/ }).click();
  console.log(" Update: Proceeded as Guest user");

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
  console.log("Update: Billing address details entered");

  // STEP 9: Continue to Shipping Method
  await page.getByRole('button', { name: /^Continue$/ }).click();

  // STEP 10: Shipping Method
  await page.getByRole('checkbox', { name: 'In-Store Pickup' }).check();
  await page.getByRole('button', { name: /^Continue$/ }).click();
  console.log(" Update: Shipping method selected");

  // STEP 11: Payment Method
  const codOption = page.getByLabel('Cash On Delivery (COD) (7.00)');
  await codOption.check(); // re-select COD to trigger JS
  const paymentContinueBtn = page.locator('input.button-1.payment-method-next-step-button');
  await paymentContinueBtn.waitFor({ state: 'visible' });
  await expect(paymentContinueBtn).toBeEnabled();
  await paymentContinueBtn.click();
  console.log(" Update: Payment method confirmed (COD)");

  // STEP 12: Payment Information
  await expect(page.getByText('You will pay by COD')).toBeVisible();
  await page.getByRole('button', { name: /^Continue$/ }).click();
  console.log(" Update: Payment information verified");

  // STEP 13: Confirm Order
  await expect(page.getByRole('cell', { name: 'Product(s)' })).toBeVisible();
  await page.getByRole('button', { name: /^Confirm$/ }).click();
  console.log(" Update: Order confirmation submitted");

  // STEP 14: Verify Order Completion
  await expect(page.getByRole('heading', { name: 'Thank you' })).toBeVisible();
  await page.getByRole('button', { name: /^Continue$/ }).click();
  console.log(" Update: Order completed successfully");

  // STEP 15: Final Confirmation - Back to Home Page
  await expect(page.getByRole('link', { name: 'Tricentis Demo Web Shop' })).toBeVisible();
  console.log(" Update: Guest checkout flow completed successfully!");
});
