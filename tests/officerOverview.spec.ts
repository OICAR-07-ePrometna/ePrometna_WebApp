import { test, expect } from '@playwright/test';
import { defaultMupAdminCredentials, loginAsUser } from './test-utils';

const TEST_OFFICER_OIB = '22978358568'

test('should display mup officers', async ({ page }) => {
    // Login as regular user with default user credentials
    await loginAsUser(page, defaultMupAdminCredentials);

    // Navigate to vehicles page by clicking the menu item
    await page.click('div.v-list-item:nth-child(3) > div:nth-child(3)')

    // Wait for navigation to complete
    await page.waitForURL('/officer-overview');

    // expect to find officer
    await expect(page.locator('.v-table__wrapper > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2)'))
        .toContainText(TEST_OFFICER_OIB)

    }
);