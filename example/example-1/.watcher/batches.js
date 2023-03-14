export default [
  {
    name: 'Dir One',
    path: 'dir_one',
    tasks: [
      {
        name: 'Run this task on every event occurence',
        file: 'task_one',
      },
      {
        name: 'Running this task when add event occurs',
        file: 'task_one',
        events: ['add'],
      },
    ],
  },

  {
    name: 'Dir Two',
    path: 'dir_two',
    tasks: [
      {
        name: 'Run this task on every event occurence',
        file: 'task_one',
      },
      {
        name: 'Running this task when add and change event occurs',
        file: 'task_one',
        events: ['add', 'change'],
        payload: {
          error: 'Task executed when recieved add or change event.',
        },
      },
    ],
  },

  {
    name: 'Dir Three',
    path: 'dir_three',
    tasks: [
      {
        name: 'Run this task on every event occurence',
        file: 'wrong_path',
      },
      {
        name: 'Running this task when add and change event occurs',
        file: 'task_one',
        events: ['add', 'change'],
        payload: {
          message: 'Task executed when recieved add or change event.',
        },
      },
    ],
  },
];
