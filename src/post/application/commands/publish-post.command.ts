export class PublishPostCommand {
  constructor(
    public readonly content: string,
    public readonly authorId: string,
  ) {}
}
