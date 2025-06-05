import { expect, test } from "@playwright/test";
import { defaultHakCredentials, loginAsUser, TEST_VEHICLE_INFO} from "./test-utils";

const TEST_OIB_PLACEHOLDER = '12345678'
const TEST_OWNER_OIB = '72352576276'

test('should create new vehicle', async ({ page }) => {
    // Login as regular user with default HAK credentials
    await loginAsUser(page, defaultHakCredentials);

    // Navigate to ownership chANGE page by clicking the menu item
    await page.click('div.v-list-item:nth-child(4) > div:nth-child(3)');

    // Wait for navigation to complete
    await page.waitForURL('/new-vehicle');

    // Enter the test owner oib
    await page.getByPlaceholder(TEST_OIB_PLACEHOLDER).fill(TEST_OWNER_OIB);

    // Press Enter to search for the OWNER
    await page.getByPlaceholder(TEST_OIB_PLACEHOLDER).press('Enter');

    // Wait for the owner data to load and registration field to be visible
    await page.waitForSelector('div.v-text-field', { state: 'visible' });

    // Insert new vehicle registration with retry logic
    const registrationField = page.locator('div.v-text-field')
        .filter({ has: page.locator('span', { hasText: 'A:' }) })
        .filter({ hasNot: page.locator('input[readonly]') })  // Exclude readonly inputs
        .locator('input');

    // Wait for the field and ensure it's the only match
    await registrationField.waitFor({ state: 'visible', timeout: 5000 });
    const count = await registrationField.count();
    if (count !== 1) {
        throw new Error(`Expected exactly one registration field, but found ${count}`);
    }

    await registrationField.fill(TEST_VEHICLE_INFO.registration.registration);

    // Verify the registration was entered correctly
    await expect(registrationField).toHaveValue(TEST_VEHICLE_INFO.registration.registration);

    // Click to proceed to the vehicle details input
    await page.click('div.v-col:nth-child(2) > button:nth-child(1) > span:nth-child(3)');

    // Wait for the vehicle details form to be visible
    await page.waitForSelector('div.v-text-field', { state: 'visible' });

    // Fill in vehicle category (J)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'J:' }) }).locator('input').fill(TEST_VEHICLE_INFO.vehicleCategory);

    // Fill in mark (D.1)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'D.1:' }) }).locator('input').fill(TEST_VEHICLE_INFO.mark);

    // Fill in homologation type (D.2)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'D.2:' }) }).locator('input').fill(TEST_VEHICLE_INFO.homologationType);

    // Fill in trade name (D.3)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'D.3:' }) }).locator('input').fill(TEST_VEHICLE_INFO.tradeName);

    // Fill in chassis number (E)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'E:' }) }).locator('input').fill(TEST_VEHICLE_INFO.chassisNumber);

    // Fill in body shape ((2))
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: '(2):' }) }).locator('input').fill(TEST_VEHICLE_INFO.bodyShape);

    // Fill in vehicle use ((3))
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: '(3):' }) }).locator('input').fill(TEST_VEHICLE_INFO.vehicleUse);

    // Fill in date first registration (B)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'B:' }) }).locator('input').fill(TEST_VEHICLE_INFO.dateFirstRegistration);

    // Fill in first registration in Croatia ((4))
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: '(4):' }) }).locator('input').fill(TEST_VEHICLE_INFO.firstRegistrationInCroatia);

    // Fill in technically permissible maximum laden mass (F.1)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'F.1:' }) }).locator('input').fill(TEST_VEHICLE_INFO.technicallyPermissibleMaximumLadenMass);

    // Fill in permissible maximum laden mass (F.2)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'F.2:' }) }).locator('input').fill(TEST_VEHICLE_INFO.permissibleMaximumLadenMass);

    // Fill in unladen mass (G)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'G:' }) }).locator('input').fill(TEST_VEHICLE_INFO.unladenMass);

    // Fill in permissible payload ((5))
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: '(5):' }) }).locator('input').fill(TEST_VEHICLE_INFO.permissiblePayload);

    // Fill in type approval number (K)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'K:' }) }).locator('input').fill(TEST_VEHICLE_INFO.typeApprovalNumber);

    // Fill in engine capacity (P.1)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'P.1:' }) }).locator('input').fill(TEST_VEHICLE_INFO.engineCapacity);

    // Fill in engine power (P.2)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'P.2:' }) }).locator('input').fill(TEST_VEHICLE_INFO.enginePower);

    // Fill in fuel or power source (P.3)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'P.3:' }) }).locator('input').fill(TEST_VEHICLE_INFO.fuelOrPowerSource);

    // Fill in rated engine speed (P.4)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'P.4:' }) }).locator('input').fill(TEST_VEHICLE_INFO.ratedEngineSpeed);

    // Fill in number of seats (S.1)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'S.1:' }) }).locator('input').fill(TEST_VEHICLE_INFO.numberOfSeats);

    // Fill in colour of vehicle (R)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'R:' }) }).locator('input').fill(TEST_VEHICLE_INFO.colourOfVehicle);

    // Fill in length ((6))
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: '(6):' }) }).locator('input').fill(TEST_VEHICLE_INFO.length);

    // Fill in width ((7))
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: '(7):' }) }).locator('input').fill(TEST_VEHICLE_INFO.width);

    // Fill in height ((8))
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: '(8):' }) }).locator('input').fill(TEST_VEHICLE_INFO.height);

    // Fill in maximum net power (T)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'T:' }) }).locator('input').fill(TEST_VEHICLE_INFO.maximumNetPower);

    // Fill in number of axles (L)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'L:' }) }).locator('input').fill(TEST_VEHICLE_INFO.numberOfAxles);

    // Fill in number of driven axles ((9))
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: '(9):' }) }).locator('input').fill(TEST_VEHICLE_INFO.numberOfDrivenAxles);

    // Fill in MB ((13))
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: '(13):' }) }).locator('input').fill(TEST_VEHICLE_INFO.mb);

    // Fill in stationary noise level (U.1)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'U.1:' }) }).locator('input').fill(TEST_VEHICLE_INFO.stationaryNoiseLevel);

    // Fill in engine speed for stationary noise test (U.2)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'U.2:' }) }).locator('input').fill(TEST_VEHICLE_INFO.engineSpeedForStationaryNoiseTest);

    // Fill in CO2 emissions (V.7)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'V.7:' }) }).locator('input').fill(TEST_VEHICLE_INFO.co2Emissions);

    // Fill in EC category (V.9)
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: 'V.9:' }) }).locator('input').fill(TEST_VEHICLE_INFO.ecCategory);

    // Fill in tire size ((11))
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: '(11):' }) }).locator('input').fill(TEST_VEHICLE_INFO.tireSize);

    // Fill in unique model code ((12))
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: '(12):' }) }).locator('input').fill(TEST_VEHICLE_INFO.uniqueModelCode);

    // Fill in model ((14))
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: '(14):' }) }).locator('input').fill(TEST_VEHICLE_INFO.model);

    // Fill in additional tire sizes ((15))
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: '(15):' }) }).locator('input').fill(TEST_VEHICLE_INFO.additionalTireSizes);

    // Fill in vehicle type ((16))
    await page.locator('div.v-text-field').filter({ has: page.locator('span', { hasText: '(16):' }) }).locator('input').fill(TEST_VEHICLE_INFO.vehicleType);

    // Click the Save Vehicle button 
    await page.click('button.v-btn--elevated');

    // Verify that the success message appears in the overlay
    await expect(page.locator('.v-overlay-container')).toContainText('Vehicle created successfully');

});