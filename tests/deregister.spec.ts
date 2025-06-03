import { test, expect } from '@playwright/test';
import { defaultHakCredentials, loginAsUser } from './test-utils';

// Test vehicle VIN number for deregistration
const TEST_VEHICLE_VIN = 'WVWZZZ1KZAW123456';

test('should unregister device', async ({ page }) => {
    // Login as regular user with default HAK credentials
    await loginAsUser(page, defaultHakCredentials);

    // Navigate to vehicle deregistration page by clicking the vehicle deregisration menu item
    await page.click('div.v-list-item:nth-child(6) > div:nth-child(3)');

    // Navigate to input field to search for the vehicle
    await page.click('#input-28');

    // Input the chassis number (VIN) of the test vehicle
    await page.fill('#input-28', TEST_VEHICLE_VIN);

    // Press Enter to trigger the search
    await page.press('#input-28', 'Enter');

    // Wait for the search results to appear and verify the VIN is displayed correctly
    await expect(page.locator('#input-37')).toHaveValue(TEST_VEHICLE_VIN);

    // Click the deregister button to initiate the deregistration process
    await page.click('.text-primary > span:nth-child(3)');

    // Verify that the success message appears in the overlay
    await expect(page.locator('.v-overlay-container')).toContainText('Vozilo je uspješno odjavljeno ');
});
