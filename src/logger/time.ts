export class Timer {
  private startedAt;
  constructor() {
    this.startedAt = new Date().getTime();
  }

  public get end(): number {
    return Math.round((new Date().getTime() - this.startedAt) / 1000);
  }
}
