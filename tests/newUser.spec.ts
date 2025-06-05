import { expect, test } from "@playwright/test";
import { defaultSuperAdminCredentials, loginAsUser, } from "./test-utils";

const TEST_NEW_USER = {
    FirstName: "New",
    LastName: "User", 
    Email: "nuser@test.hr",
    OIB: "35355901340",
    Residence: "Zagreb",
    Password: "Pa$$w0rd"
};

test('should create new user', async ({ page }) => {
    // Login as regular user with default superadmin credentials
    await loginAsUser(page, defaultSuperAdminCredentials);

    // Navigate to new user page by clicking the menu item
    await page.click('div.v-list-item:nth-child(6) > div:nth-child(3)');

    // Wait for navigation to complete
    await page.waitForURL('/new-user');

    // Wait for the form to be visible
    await page.waitForSelector('div.v-text-field', { state: 'visible' });

    // Fill in first name
    await page.getByLabel('First Name').fill(TEST_NEW_USER.FirstName);

    // Fill in last name
    await page.getByLabel('Last Name').fill(TEST_NEW_USER.LastName);

    // Fill in OIB
    await page.getByLabel('OIB').fill(TEST_NEW_USER.OIB);

    // Fill in residence
    await page.getByLabel('Residence').fill(TEST_NEW_USER.Residence);

    // Fill in birth date
    await page.getByLabel('Birth Date').click();
    await page.locator('div.v-date-picker-month__day:nth-child(17) > button:nth-child(1) > span:nth-child(3)').click();

    // Fill in email
    await page.getByLabel('Email').fill(TEST_NEW_USER.Email);

    // Fill in password - using a more specific selector
    await page.getByRole('textbox', { name: 'Password' }).fill(TEST_NEW_USER.Password);

    // Click the Create User button
    await page.getByRole('button', { name: 'Create User' }).click();

    // Wait for and verify the success message
    const expectedMessage = `User ${TEST_NEW_USER.Email} created successfully!`;
    await page.waitForSelector(`text=${expectedMessage}`, { timeout: 10000 });
    await expect(page.locator(`text=${expectedMessage}`)).toBeVisible();
});