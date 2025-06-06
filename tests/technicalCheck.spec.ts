import { test, expect } from '@playwright/test';
import { defaultHakCredentials, loginAsUser } from './test-utils';

// Test vehicle VIN number for technical check
const TEST_VEHICLE_VIN = 'WVWZZZ1KZAW123456';
const TEST_VIN_PLACEHOLDER = 'JH4DC4360SS001610';

test('should pass technical check', async ({ page }) => {
  // Login as regular user with default HAK credentials
  await loginAsUser(page, defaultHakCredentials);

  // Navigate to technical check page by clicking the menu item
  await page.click('div.v-list-item:nth-child(5) > div:nth-child(3)');

  // Wait for navigation to complete
  await page.waitForURL('/technical-check');

  // Enter the test vehicle VIN number
  await page.getByPlaceholder(TEST_VIN_PLACEHOLDER).fill(TEST_VEHICLE_VIN);

  // Press Enter to search for the vehicle
  await page.getByPlaceholder(TEST_VIN_PLACEHOLDER).press('Enter');

  // Click the elevated button to proceed with technical check
  await page.click('.v-btn--elevated');

  // Click the second button in the sequence (likely for confirmation)
  await page.click('button.v-btn:nth-child(2) > span:nth-child(3)');

  // Enter the license plate number
  await page.getByLabel('Registracijska oznaka').fill('ZG-1234-AA');

  // Enter the mileage/kilometer reading
  await page.getByLabel('Prijeđena kilometraža').fill('50000');

  // Click the technical check pass confirmation
  await page.click('.v-label--clickable');

  // Click the final confirmation button in the third window item
  await page.click('div.v-window-item:nth-child(3) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > button:nth-child(1)')

  // Verify that the success message appears in the overlay
  await expect(page.locator('.v-overlay-container')).toContainText('Vozilo uspješno registrirano');
});
