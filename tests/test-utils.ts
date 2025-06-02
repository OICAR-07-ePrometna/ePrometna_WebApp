import { Page, expect } from '@playwright/test';

export interface LoginCredentials {
  email: string;
  password: string;
}

export const defaultSuperAdminCredentials: LoginCredentials = {
  email: 'superadmin@test.hr',
  password: 'Pa$$w0rd'
};

export const defaultOsobaCredentials: LoginCredentials = {
    email: 'osoba@test.hr',
    password: 'Pa$$w0rd'
  };


export async function loginAsUser(page: Page, credentials: LoginCredentials) {
  // Navigate to the login page
  await page.goto('/login');

  // Fill in the email field
  await page.fill('#input-7', credentials.email);

  // Fill in the password field
  await page.fill('#input-9', credentials.password);

  // Click the login button
  await page.click('button.v-btn:nth-child(6)');

  // Wait for navigation to complete
  await page.waitForURL('/');

  // Verify successful login
  await expect(page.locator('.center-container > h1:nth-child(1)')).toHaveText(" Dobrodošli u ePrometna");
  expect(page.url()).toBe('http://localhost:8091/');
} 