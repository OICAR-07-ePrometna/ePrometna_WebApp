export interface VehicleSummaryDto {
    vehicleCategory: string;                                        // Kategorija vozila // J
    mark: string;                                                   // Marka // D1
    vehicleModel: string;                                           // Model // (14)
    homologationType: string;                                       // Homologacijski tip // D2
    tradeName: string;                                              // Trgovački naziv // D3
    chassisNumber: string;                                          // Broj šasije // E
    bodyShape: string;                                              // Oblik karoserije // (2)
    vehicleUse: string;                                             // Namjena vozila // (3)
    dateFirstRegistration: Date;                                    // Datum prve registracije // B
    firstRegistrationInCroatia: Date;                               // Prva registracija u Hrvatskoj // (4)
    technicallyPermissibleMaximumLadenMass: string;                 // Tehnički dopuštena najveća masa // F1
    permissibleMaximumLadenMass: string;                            // Dopuštena najveća masa // F2
    unladenMass: string;                                            // Masa praznog vozila // G
    permissablePayLoad: string;                                     // Dopuštena nosivost // (5)
    typeApprovalNumber: string;                                     // Broj homologacije // K
    engineCapacity: string;                                         // Obujam motora // P1
    enginePower: string;                                            // Snaga motora // P2
    fuelOrPowerSource: string;                                      // Gorivo ili izvor energije // P3
    ratedEngineSpeed: string;                                       // Nazivni broj okretaja motora // P4
    numberOfSeats: string;                                          // Broj sjedala // S1
    colourOfVehicle: string;                                        // Boja vozila // R
    length: string;                                                 // Dužina // (6)
    width: string;                                                  // Širina // (7)
    height: string;                                                 // Visina // (8)
    maximumPower: string;                                           // Najveća neto snaga // T
    numberOfAxles: string;                                          // Broj osovina // L
    numberOfDrivenAxles: string;                                    // Broj pogonskih osovina // (9)
    mb: string;                                                     // MB (pretpostavka: proizvođač) // (13)
    stationaryNoiseLevel: string;                                   // Razina buke u stacionarnom stanju // U1
    engineSpeedForStationaryNoiseTest: string;                      // Broj okretaja motora pri ispitivanju buke u stacionarnom stanju // U2
    co2Emissions: string;                                           // Emisija CO2 // V7
    ecCategory: string;                                             // EC kategorija // V9
    tireSize: string;                                               // Dimenzije guma // (11)
    unqiueModelCode: string;                                        // Jedinstvena oznaka modela // (12)
    additionalTireSizes: string;                                    // Dodatne dimenzije guma // (15)
    vehicleType: string;                                            // Tip vozila (16) // (16)
}