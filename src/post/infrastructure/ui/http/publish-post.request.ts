import { IsNotEmpty } from 'class-validator';

export class PublishPostRequest {
  @IsNotEmpty()
  public readonly content: string;
}
