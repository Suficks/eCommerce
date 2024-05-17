export type CountryType = 'Belarus' | 'Russia' | 'Poland';

interface Country {
  name: CountryType;
  abbr: string;
  indexError: string;
  regularForIndex: RegExp;
}

type CountriesList = Country[];

export const countriesList: CountriesList = [
  {
    name: 'Poland',
    abbr: 'PL',
    indexError: 'Index format 5 digits XY-ZZZ',
    regularForIndex: /^\d{2}[- ]{0,1}\d{3}$/,
  },
  {
    name: 'Russia',
    abbr: 'RU',
    indexError: 'Index format 6 digits XXXYYY',
    regularForIndex: /^\d{6}$/,
  },
  {
    name: 'Belarus',
    abbr: 'BY',
    indexError: 'Index format 6 digits XXXYYY',
    regularForIndex: /^\d{6}$/,
  },
];
