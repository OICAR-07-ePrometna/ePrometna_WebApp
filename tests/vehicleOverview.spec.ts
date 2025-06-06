import { test, expect } from '@playwright/test';
import { defaultOsobaCredentials, loginAsUser } from './test-utils';

const TEST_VEHICLE_PLATE1 = 'ZG1234AA';
const TEST_VEHICLE_PLATE2 = 'ZG5678BB';
const TEST_NO_VEHICLE = 'Trenutno niste vlasnik ili povlašteni korisnik nijednog vozila.';

test('should display users vehicles or no vehicles message', async ({ page }) => {
    // Login as regular user with default user credentials
    await loginAsUser(page, defaultOsobaCredentials);

    // Navigate to vehicles page by clicking the menu item
    await page.click('div.v-list-item:nth-child(4) > div:nth-child(3)')

    // Wait for navigation to complete
    await page.waitForURL('/vehicles');

    // Check for either a vehicle plate or the no vehicles message
    const vehiclePlate = page.locator('.v-table__wrapper > table > tbody > tr > td:first-child');
    const noVehiclesMessage = page.getByText(TEST_NO_VEHICLE);

    // Wait for either element to be visible
    await expect(vehiclePlate.or(noVehiclesMessage)).toBeVisible();

    // If vehicle plate is visible, check its content
    if (await vehiclePlate.isVisible()) {
        +        await expect(vehiclePlate).toContainText(new RegExp(`${TEST_VEHICLE_PLATE1}|${TEST_VEHICLE_PLATE2}`));
    }
});