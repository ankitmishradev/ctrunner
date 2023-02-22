import colors from 'colors';

export const timeStamp = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const hrsString = hours < 10 ? `0${hours}` : hours;
  const minsString = minutes < 10 ? `0${minutes}` : minutes;
  return colors.cyan(`[${hrsString}:${minsString} ${suffix}]`);
};

export class Timer {
  private startedAt;
  constructor() {
    this.startedAt = new Date().getTime();
  }

  public get end(): number {
    return Math.round((new Date().getTime() - this.startedAt) / 1000);
  }
}
