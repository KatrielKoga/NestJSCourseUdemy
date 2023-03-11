import { IsString } from 'class-validator';

export default class CreateMessageDto {
  @IsString()
  content: string;
}
