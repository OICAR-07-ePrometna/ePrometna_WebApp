import { expect, test } from '@playwright/test';
import { defaultOsobaCredentials, loginAsUser } from './test-utils';

test('should unregister device', async ({ page }) => {
  await loginAsUser(page, defaultOsobaCredentials);

    await page.click('div.v-list-item:nth-child(3) > div:nth-child(3)')

    await page.waitForURL('/devices')

    await expect(page.locator('.mdi-cellphone-check')).toBeVisible()

    await page.click('span.v-btn__content:nth-child(4)')

    await page.click('button.v-btn--elevated:nth-child(3) > span:nth-child(3)')

    await expect(page.locator('.mdi-cellphone-remove')).toBeVisible()

});
