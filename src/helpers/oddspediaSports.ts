interface ISport {
  name: string;
  slug: string;
  slug_en: string;
  id: number;
}

export interface ISportList {
  [key: number]: ISport;
}

export const sportList: ISportList = {
  1: {
    name: 'Football',
    slug: 'football',
    slug_en: 'football',
    id: 1,
  },
  2: {
    name: 'Ice Hockey',
    slug: 'ice-hockey',
    slug_en: 'ice-hockey',
    id: 2,
  },
  3: {
    name: 'Basketball',
    slug: 'basketball',
    slug_en: 'basketball',
    id: 3,
  },
  5: {
    name: 'Tennis',
    slug: 'tennis',
    slug_en: 'tennis',
    id: 5,
  },
  8: {
    name: 'Handball',
    slug: 'handball',
    slug_en: 'handball',
    id: 8,
  },
};
