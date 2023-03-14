import { colored } from '../../logger';
import { BatchMeta } from '../../utils';
import { eventName } from '../event_name';

export const event = (meta: BatchMeta, showEventOrigin: boolean) => {
  const eventOrigin = showEventOrigin
    ? ` at path ${colored(meta.eventOrigin)}`
    : '';

  process.stdout.write(
    `${meta.time} ${eventName(meta.event)} in batch ${
      meta.name
    }${eventOrigin}.\n`,
  );
};
