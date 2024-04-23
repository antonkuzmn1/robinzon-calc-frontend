export class AppData {
  constructor(
    public modal: string | number | null,
    public filter: { [key: string]: [] } | null,
  ) {
  }
}
