import { IsNotEmpty, Length } from 'class-validator';

export class PublishPostRequest {
  @IsNotEmpty()
  @Length(1, 80)
  public readonly content: string;
}
