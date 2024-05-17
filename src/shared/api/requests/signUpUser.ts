import { SubmitData } from '@/features/Registration';
import { apiRoot } from '../BuildClient';
import { countriesList } from '@/shared/const/Countries';

export async function signUpUser(props: SubmitData): Promise<void> {
  const {
    username,
    surname,
    password,
    email,
    shippingCountry,
    shippingCity,
    shippingStreet,
    billingCountry,
    billingCity,
    billingStreet,
    birthdate,
  } = props;
  let countryShippingAbbr = '';
  let countryBillingAbbr = '';

  countriesList.forEach((el) => {
    if (el.name === shippingCountry) {
      countryShippingAbbr = el.abbr;
    }
    if (el.name === billingCountry) {
      countryBillingAbbr = el.abbr;
    }
  });

  await apiRoot
    .customers()
    .post({
      body: {
        email,
        password,
        addresses: [
          {
            country: countryShippingAbbr,
            city: shippingCity,
            streetName: shippingStreet,
          },
          {
            country: countryBillingAbbr,
            city: billingCity,
            streetName: billingStreet,
          },
        ],
        shippingAddresses: [0],
        billingAddresses: [1],
        firstName: username,
        lastName: surname,
        salutation: `Hello, ${username}!`,
        dateOfBirth: `${birthdate}`,
      },
    })
    .execute();
}
