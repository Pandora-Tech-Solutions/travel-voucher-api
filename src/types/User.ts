import { Address } from './Address';
import { Company } from './Company';
import { Roles } from './Roles';

export interface User {
  name: string;
  cpf: string;
  rg?: string;
  email: string;
  password: string;
  address: Address;
  roles: Roles[];
  companies?: Company[];
}
