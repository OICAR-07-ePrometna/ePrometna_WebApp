import { test } from '@playwright/test';
import { defaultSuperAdminCredentials, loginAsUser } from './test-utils';

test('should log in as superadmin', async ({ page }) => {

  await loginAsUser(page, defaultSuperAdminCredentials);
});
