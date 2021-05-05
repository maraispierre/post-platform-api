import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class DisplayPostsRequest {
  @IsNotEmpty()
  @IsNumberString()
  public readonly page: string;

  @IsOptional()
  @IsNumberString()
  public readonly cursor: string | undefined;
}
