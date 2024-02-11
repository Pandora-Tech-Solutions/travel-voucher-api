import { Address } from './Address';

export interface Company {
  companyName: string;
  fantasyName: string;
  cnpj: string;
  email: string;
  phone: string;
  address: Address;
}
