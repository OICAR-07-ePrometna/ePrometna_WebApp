
export interface VehicleOwnerSummary {
    firstName: string;
    lastName: string;
    residence: string;
    licenceHolderType: string;
    registrationPlate: string;
    dateOfRegistration: string;
    oib: string;
    issuedBy: string;
    issuedDate: string;
  }
  
  export interface RegistrationLogs{
    dateOfValidation: Date;
    expirationDate: Date;
    mileage: string;
    note: string
  }

