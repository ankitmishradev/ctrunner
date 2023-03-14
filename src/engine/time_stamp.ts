import { colored } from '../logger';

export const timeStamp = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const hrsString = hours < 10 ? `0${hours}` : hours;
  const minsString = minutes < 10 ? `0${minutes}` : minutes;
  return colored(`[${hrsString}:${minsString} ${suffix}]`);
};
