export interface FUser {
    type: string;
    displayName: string;
    email: string;
    uid: string;
    userRole: string;
}

export interface FBusinessUser extends FUser {
    userRole: 'business';
    business: Business;
}

export interface FCustomerUser extends FUser {
    userRole: 'customer';
}

export interface Business {
    location: { lat: number; lon: number };
    type: string;
    name: string;
}