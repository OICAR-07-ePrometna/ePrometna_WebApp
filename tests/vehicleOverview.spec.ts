import { test, expect } from '@playwright/test';
import { defaultOsobaCredentials, loginAsUser } from './test-utils';

const TEST_VEHICLE_PLATE1 = 'ZG1234AA';
const TEST_VEHICLE_PLATE2 = 'ZG5678BB';

test('should pass technical check', async ({ page }) => {
    // Login as regular user with default user credentials
    await loginAsUser(page, defaultOsobaCredentials);

    // Navigate to vehicles page by clicking the menu item
    await page.click('div.v-list-item:nth-child(4) > div:nth-child(3)')

    // Wait for navigation to complete
    await page.waitForURL('/vehicles');

    // Expect to have a vehicle shown
    await expect(page.locator('.v-table__wrapper > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1)'))
    .toContainText(TEST_VEHICLE_PLATE1 || TEST_VEHICLE_PLATE2)
});