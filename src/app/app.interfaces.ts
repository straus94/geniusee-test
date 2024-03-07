export interface IOrder {
  firstName: string;
}

export interface ICountry {
  flag: string;
  region: string;
  name: {
    common: string;
  }
}

export type List<T = any> = {[key: string]: T};
