import { SetMetadata } from '@nestjs/common';
import { Roles } from '../../../types/Roles';

export const HasRoles = (...roles: Roles[]) => SetMetadata('roles', roles);
