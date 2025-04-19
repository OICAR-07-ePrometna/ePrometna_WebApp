interface summeryType {
  vehicleCategory: boolean; // Kategorija vozila // J
  mark: boolean; // Marka // D1
  homologationType: boolean; // Homologacijski tip // D2
  tradeName: boolean; // Trgovački naziv // D3
  chassisNumber: boolean; // Broj šasije // E
  bodyShape: boolean; // Oblik karoserije // (2)
  vehicleUse: boolean; // Namjena vozila // (3)
  dateFirstRegistration: boolean; // Datum prve registracije // B
  firstRegistrationInCroatia: boolean; // Prva registracija u Hrvatskoj // (4)
  technicallyPermissibleMaximumLadenMass: boolean; // Tehnički dopuštena najveća masa // F1
  permissibleMaximumLadenMass: boolean; // Dopuštena najveća masa // F2
  unladenMass: boolean; // Masa praznog vozila // G
  permissiblePayload: boolean; // Dopuštena nosivost // (5)
  typeApprovalNumber: boolean; // Broj homologacije // K
  engineCapacity: boolean; // Obujam motora // P1
  enginePower: boolean; // Snaga motora // P2
  fuelOrPowerSource: boolean; // Gorivo ili izvor energije // P3
  ratedEngineSpeed: boolean; // Nazivni broj okretaja motora // P4
  numberOfSeats: boolean; // Broj sjedala // S1
  colourOfVehicle: boolean; // Boja vozila // R
  length: boolean; // Dužina // (6)
  width: boolean; // Širina // (7)
  height: boolean; // Visina // (8)
  maximumNetPower: boolean; // Najveća neto snaga // T
  numberOfAxles: boolean; // Broj osovina // L
  numberOfDrivenAxles: boolean; // Broj pogonskih osovina // (9)
  mb: boolean; // MB (pretpostavka: proizvođač) // (13)
  stationaryNoiseLevel: boolean; // Razina buke u stacionarnom stanju // U1
  engineSpeedForStationaryNoiseTest: boolean; // Broj okretaja motora pri ispitivanju buke u stacionarnom stanju // U2
  co2Emissions: boolean; // Emisija CO2 // V7
  ecCategory: boolean; // EC kategorija // V9
  tireSize: boolean; // Dimenzije guma // (11)
  uniqueModelCode: boolean; // Jedinstvena oznaka modela // (12)
  model: boolean; // Model // (14)
  additionalTireSizes: boolean; // Dodatne dimenzije guma // (15)
  vehicleType: boolean; // Tip vozila (16) // (16)
}

export const create: summeryType = {
  vehicleCategory: false,
  mark: false,
  homologationType: false,
  tradeName: false,
  chassisNumber: false,
  bodyShape: false,
  vehicleUse: false,
  dateFirstRegistration: false,
  firstRegistrationInCroatia: false,
  technicallyPermissibleMaximumLadenMass: false,
  permissibleMaximumLadenMass: false,
  unladenMass: false,
  permissiblePayload: false,
  typeApprovalNumber: false,
  engineCapacity: false,
  enginePower: false,
  fuelOrPowerSource: false,
  ratedEngineSpeed: false,
  numberOfSeats: false,
  colourOfVehicle: false,
  length: false,
  width: false,
  height: false,
  maximumNetPower: false,
  numberOfAxles: false,
  numberOfDrivenAxles: false,
  mb: false,
  stationaryNoiseLevel: false,
  engineSpeedForStationaryNoiseTest: false,
  co2Emissions: false,
  ecCategory: false,
  tireSize: false,
  uniqueModelCode: false,
  model: false,
  additionalTireSizes: false,
  vehicleType: false
}
export const display: summeryType = {
  vehicleCategory: true,
  mark: true,
  homologationType: true,
  tradeName: true,
  chassisNumber: true,
  bodyShape: true,
  vehicleUse: true,
  dateFirstRegistration: true,
  firstRegistrationInCroatia: true,
  technicallyPermissibleMaximumLadenMass: true,
  permissibleMaximumLadenMass: true,
  unladenMass: true,
  permissiblePayload: true,
  typeApprovalNumber: true,
  engineCapacity: true,
  enginePower: true,
  fuelOrPowerSource: true,
  ratedEngineSpeed: true,
  numberOfSeats: true,
  colourOfVehicle: true,
  length: true,
  width: true,
  height: true,
  maximumNetPower: true,
  numberOfAxles: true,
  numberOfDrivenAxles: true,
  mb: true,
  stationaryNoiseLevel: true,
  engineSpeedForStationaryNoiseTest: true,
  co2Emissions: true,
  ecCategory: true,
  tireSize: true,
  uniqueModelCode: true,
  model: true,
  additionalTireSizes: true,
  vehicleType: true
}

/**
 * Configuration for edit mode - only selected fields are editable.
 * Fields like vehicle category, mark, chassis number, and dates are editable,
 * while technical specifications remain read-only.
 */
export const edit: summeryType = {
  vehicleCategory: true,
  mark: true,
  homologationType: false,
  tradeName: true,
  chassisNumber: true,
  bodyShape: false,
  vehicleUse: false,
  dateFirstRegistration: true,
  firstRegistrationInCroatia: true,
  technicallyPermissibleMaximumLadenMass: false,
  permissibleMaximumLadenMass: false,
  unladenMass: false,
  permissiblePayload: false,
  typeApprovalNumber: false,
  engineCapacity: false,
  enginePower: false,
  fuelOrPowerSource: false,
  ratedEngineSpeed: false,
  numberOfSeats: false,
  colourOfVehicle: false,
  length: false,
  width: false,
  height: false,
  maximumNetPower: false,
  numberOfAxles: false,
  numberOfDrivenAxles: false,
  mb: false,
  stationaryNoiseLevel: false,
  engineSpeedForStationaryNoiseTest: false,
  co2Emissions: false,
  ecCategory: false,
  tireSize: true,
  uniqueModelCode: true,
  model: true,
  additionalTireSizes: false,
  vehicleType: true
}
