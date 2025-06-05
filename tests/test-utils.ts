import { Page, expect } from '@playwright/test';

/**
 * Interface defining the structure for user login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Default credentials for the superadmin user
 * Used for administrative operations and system management
 */
export const defaultSuperAdminCredentials: LoginCredentials = {
  email: 'superadmin@test.hr',
  password: 'Pa$$w0rd'
};

/**
 * Default credentials for the regular user (osoba)
 * Used for testing regular user operations and permissions
 */
export const defaultOsobaCredentials: LoginCredentials = {
  email: 'osoba@test.hr',
  password: 'Pa$$w0rd'
};

export const defaultHakCredentials: LoginCredentials = {
  email: 'hak@test.hr',
  password: 'Pa$$w0rd'
};

/**
 * Utility function to handle user login process
 * @param page - Playwright page object
 * @param credentials - User credentials for login
 *
 * This function:
 * 1. Navigates to the login page
 * 2. Fills in the login form with provided credentials
 * 3. Submits the form
 * 4. Verifies successful login by checking:
 *    - URL redirect to home page
 *    - Welcome message presence
 */
export async function loginAsUser(page: Page, credentials: LoginCredentials) {
  // Navigate to the login page
  await page.goto('/login');

  // Fill in the email field
  await page.fill('#input-7', credentials.email);

  // Fill in the password field
  await page.fill('#input-9', credentials.password);

  // Accept privacy
  await page.click('button.v-btn:nth-child(3)');

  // Click the login button
  await page.click('button.v-btn:nth-child(6)');

  // Wait for navigation to complete
  await page.waitForURL('/');

  // Verify successful login
  await expect(page.locator('.center-container > h1:nth-child(1)')).toHaveText(" Dobrodošli u ePrometna");
  expect(page.url()).toBe('http://localhost:8091/');
}

export const TEST_VEHICLE_INFO = {
  vehicleType: "Car",
  model: "A4",
  mark: "Audi",
  vehicleCategory: "M1",
  chassisNumber: "WAUZZZ8K9BA123456",
  bodyShape: "Sedan",
  vehicleUse: "Personal",
  dateFirstRegistration: "2021-03-20",
  engineCapacity: "1968",
  enginePower: "150",
  fuelOrPowerSource: "Diesel",
  numberOfSeats: "5",
  colourOfVehicle: "Black",
  homologationType: "e1*2007/46*0063*00",
  tradeName: "Audi A4 2.0 TDI",
  firstRegistrationInCroatia: "2021-03-20",
  technicallyPermissibleMaximumLadenMass: "2100",
  permissibleMaximumLadenMass: "2100",
  unladenMass: "1650",
  permissiblePayload: "450",
  typeApprovalNumber: "e1*2007/46*0063*00",
  ratedEngineSpeed: "4200",
  length: "4762",
  width: "1847",
  height: "1436",
  maximumNetPower: "110",
  numberOfAxles: "2",
  numberOfDrivenAxles: "2",
  mb: "Audi",
  stationaryNoiseLevel: "71",
  engineSpeedForStationaryNoiseTest: "2750",
  co2Emissions: "114",
  ecCategory: "M1",
  tireSize: "225/50R17",
  uniqueModelCode: "8K",
  additionalTireSizes: "225/45R18",
  registration: {
      registration: "ZG5678BB"
  }
};