import { PartialType } from '@nestjs/swagger';
import { CreateCardDto } from './create_card.dto';

export class UpdateCardDto extends PartialType(CreateCardDto) {}
