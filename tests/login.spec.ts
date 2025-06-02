import { test, expect } from '@playwright/test';

test('should log in as superadmin', async ({ page }) => {
  // Navigate to the login page
  await page.goto('/login');

  // Fill in the email field
  // Replace '#email-input' with the actual selector for your email input field
  await page.fill('#input-7', 'superadmin@test.hr');

  // Fill in the password field
  // Replace '#password-input' with the actual selector for your password input field
  await page.fill('#input-9', 'Pa$$w0rd');

  // Click the login button
  // Replace '#login-button' with the actual selector for your login button
  await page.click('button.v-btn:nth-child(6)');

  // Wait for navigation to complete or for a specific element that indicates successful login.
  // For example, if successful login redirects to the homepage ('/'):
  await page.waitForURL('/');


  // Or, assert that an element specific to the logged-in state is visible
  // For example, a logout button or a user dashboard element
  // Replace '#dashboard-element' with a selector for an element visible after login
  await expect(page.locator('.center-container > h1:nth-child(1)')).toHaveText(" Dobrodošli u ePrometna");

  // Add further assertions as needed, for example, checking the URL
  //expect(page.url()).toBe(page.context().browser()!.contexts()[0].pages()[0].url().replace('/login', '/')); // Checks if it navigated to the home page
  //
  expect(page.url()).toBe('http://localhost:8091/');
});
