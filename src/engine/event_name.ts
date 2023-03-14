import { EventName } from '../utils';

export const eventName = (e: EventName) => {
  switch (e) {
    case 'add':
      return 'File added';
    case 'addDir':
      return 'Directory added';
    case 'change':
      return 'File changed';
    case 'unlink':
      return 'File removed';
    case 'unlinkDir':
      return 'Directory removed';
  }
};
