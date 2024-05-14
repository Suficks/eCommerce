export type SubmitData = {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
  surname: string;
  birthdate: string;
  shippingStreet: string;
  shippingCity: string;
  shippingCountry: 'Belarus' | 'Ukraine' | 'Poland';
  shippingPostal: string;
  shippingIsDefault: boolean;
  shippingAsBilling: boolean;
  billingStreet: string;
  billingCity: string;
  billingCountry: 'Belarus' | 'Ukraine' | 'Poland';
  billingPostal: string;
  billingIsDefault: boolean;
};
