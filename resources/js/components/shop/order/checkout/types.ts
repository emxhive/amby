export interface Step {
  label: string;
}

export interface PersonalDetails {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    extraInfo?: string;
}

export interface PaymentMethod {
  id: string;
  label: string;
  description?: string;
}
