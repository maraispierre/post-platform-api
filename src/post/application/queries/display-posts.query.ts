export class DisplayPostsQuery {
  public constructor(
    public readonly page: number,
    public readonly cursor: number | null,
  ) {}
}
