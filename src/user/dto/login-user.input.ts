import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class LoginUser extends OmitType(User, ['id']) {}
