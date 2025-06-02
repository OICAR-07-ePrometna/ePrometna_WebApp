import { expect, test } from '@playwright/test';
import { defaultOsobaCredentials, loginAsUser } from './test-utils';

/**
 * Test suite for device unregistration functionality
 * This test verifies the complete flow of unregistering a device:
 * 1. Login as a regular user
 * 2. Navigate to devices page
 * 3. Verify device is registered (check icon)
 * 4. Unregister the device
 * 5. Verify device is unregistered (check icon change)
 */
test('should unregister device', async ({ page }) => {
  // Login as regular user
  await loginAsUser(page, defaultOsobaCredentials);

  // Navigate to devices page by clicking the devices menu item
  await page.click('div.v-list-item:nth-child(3) > div:nth-child(3)');

  // Verify navigation to devices page
  await page.waitForURL('/devices');

  // Verify device is currently registered by checking for the registered device icon
  await expect(page.locator('.mdi-cellphone-check')).toBeVisible();

  // Click the unregister button
  await page.click('span.v-btn__content:nth-child(4)');

  // Confirm unregistration by clicking the confirmation button
  await page.click('button.v-btn--elevated:nth-child(3) > span:nth-child(3)');

  // Verify device is now unregistered by checking for the unregistered device icon
  await expect(page.locator('.mdi-cellphone-remove')).toBeVisible();
});
