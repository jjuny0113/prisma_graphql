import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateUserInput extends OmitType(User, ['id']) {}
