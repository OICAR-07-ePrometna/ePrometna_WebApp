import { test, expect } from '@playwright/test';
import { defaultHakCredentials, loginAsUser } from './test-utils';

const TEST_VEHICLE_VIN = 'WVWZZZ1KZAW123456';
const TEST_PLACEHOLDER = 'JH4DC4360SS001610';
const TEST_PLACEHOLDER2 = '12345678901'
const TEST_NEW_OWNER = '89190011773'

test('should change owner', async ({ page }) => {
    // Login as regular user with default HAK credentials
    await loginAsUser(page, defaultHakCredentials);
  
    // Navigate to technical check page by clicking the menu item
    await page.click('div.v-list-item:nth-child(3) > div:nth-child(3)');
  
    // Wait for navigation to complete
    await page.waitForURL('/ownership-change');
  
    // Enter the test vehicle VIN number
    await page.getByPlaceholder(TEST_PLACEHOLDER).fill(TEST_VEHICLE_VIN);
  
    // Press Enter to search for the vehicle
    await page.getByPlaceholder(TEST_PLACEHOLDER).press('Enter');

    // Enter the owner to be oib
    await page.getByPlaceholder(TEST_PLACEHOLDER2).fill(TEST_NEW_OWNER);
  
    // Press Enter to search for the new owner
    await page.getByPlaceholder(TEST_PLACEHOLDER2).press('Enter');
  
    // Click the elevated button to proceed with ownership change
    await page.click('.v-btn--elevated > span:nth-child(3)');
  
    // Verify that the success message appears in the overlay
    await expect(page.locator('.v-overlay-container')).toContainText('Promjena vlasništva uspješno izvršena ');
  });
  