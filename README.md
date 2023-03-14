# ctrunner ![npm](https://img.shields.io/npm/v/ctrunner) ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/ankitmishradev/ctrunner/build.yml) ![GitHub](https://img.shields.io/github/license/ankitmishradev/ctrunner)

Run centralized tasks on inter-related or individual projects when a file system event (add, change, directory add, etc.) is received. Watcher is best suited to automatically handle common tasks while working on multiple projects simultaneously.

Watcher does not require any integration with your source code. You can setup ctrunner at the root of where all your projects reside because ctrunner can only watch nodes below it's current position.

See [example](./example/example-1/), which demonstrates a simple use case of ctrunner.

## Installation

```cmd
npm i -D ctrunner
```

or

```cmd
yarn add --dev ctrunner
```

## Terms in ctrunner

- **`Batch`** : In ctrunner batch refers to information of a project or a directory inside ctrunner project, where you might want to run centralized tasks. You can define batches in [Batch File](#2-batches-file).

## Setup

Create a `.ctrunner` directory at root, we can call this directory ctrunner setup.

To create a simple setup automatically you can use the below command

```cmd
ctrunner -i
```

It will create a basic ctrunner setup in the current working directory. A ctrunner setup basically has 3 things.

### 1. Config File

Config file consists of global settings for ctrunner. Config file name should be `config` with `.js` or `.ts` extension only. Configuration can contain following properties

- **name:** Name of ctrunner project.
- **showEventOrigin:** If true, path where event occured will be displayed in the CLI.
- **ignore:** If path where event occured matches any of the given string, or string with glob patterns, further execution for that event will be skipped.

An example of a config file:

```js
// config.js
export default {
  name: 'Mock Project',
  showEventOrigin: true,
  ignore: ['node_modules/**'],
};
```

### 2. Batches File

In this file you'll define a single or multiple batches. Batch file name should be `batches` with extension `.js` or `.ts`. A batch can have following properties:

- **name:** Name of the batch
- **path:** Path to the project or directory this batch refers to
- **tasks:** Define centralized tasks to run on event occurence. See [task](#tasks).
- **ignore:** If path where event occured matches any of the given string, or string with glob patterns, further execution for that event will be skipped.

An example of the batched file:

```js
//batches.js
export default [
  {
    name: 'Batch One',
    path: 'mock/one',
    tasks: [
      {
        name: 'Compile',
        file: 'build',
      },
    ],
  },
  {
    name: 'Batch Two',
    path: 'mock/two',
    tasks: [
      {
        name: 'Compile',
        file: 'build',
      },
    ],
    ignore: ['node_modules/**'], // If event will occur inside mock/one/node_modules no tasks will run
  },
];
```

> Path of no two batches should overlap. If such condition occurs, try to ignore the overlapping path from one of the batch.

#### Event Name

Watcher registers following events:

- `add`: When a file gets added
- `change`: When a file gets changed
- `unlink`: When a file get deleted
- `addDir`: When a directory gets added
- `unlinkDir`: When a directory gets deleted

#### Task

`tasks` property of the batch accepts an array of task. A task can have following properties:

- **name:** Name of the task
- **file:** Name of the file without extension where this task is written
- **events:** Each task can be configured to run only on certain event occurences. If it is not specified, task will run on all event occurences. Events property accepts and array of event name. See [Event Name](#event-name).
- **payload:** Payload can be any type of value that will be provided to task as a parameter at the time of execution. See [Task Directory](#3-tasks-directory).

An example of a task:

```js
//batches.js
export default [
  {
    ...
    tasks: [
      {
        name: 'Build',
        file: 'build_task',
        events: ['add','change'], // This task will run only on add and change event
        payload: {mock: {value : 1234 }} // This value will be provided to task in build_task file at the task execution.
      },
    ],
  },
];
```

### 3. Tasks Directory

This directory stores centralized tasks. Directory name must be `tasks`. Each file in the tasks directory should default export a function (task). A typical task would look like:

```js
//tasks/task_one.js
const taskOne = (payload, send) => {
  const result = runSomeFunction();
  send({
    status: result.status,
    error: result.error,
    message: result.message,
  });
};

export default taskOne;
```

Each task will have two parameters `payload` and `send`. `payload` is supplied from task definition provided in `Batch File`. `send` is a function, you can use to inform ctrunner when to pass the task and when to fail the task. `send` function accepts a single parameter of type object, which can have the following properties: `status`, `error` and `message`. If `status` is true `error` will be ignored otherwise `message` will be ignored.

## Usage

After completing setup, you can start ctrunner by following command:

```cmd
ctrunner
```

> This process can take upto a minute to start ctrunner so any event during this time won't be registered by ctrunner.

After successful start, you can start working on your project and ctrunner will take care of all the event occurences and running the centralized tasks automatically.

### Options

- **init:** Create a new ctrunner setup

```cmd
ctrunner -i

ctrunner --init
```

- **clean:** Clean the ctrunner setup by removing temporary configuration and build files.

```cmd
ctrunner -c

ctrunner --clean
```

- **help:** Display the help for ctrunner command

```cmd
ctrunner -h

ctrunner --help
```

## Troubleshoots

1. **`ctrunner -i` command failed without any error**

   **Solution:** Before using this command, make sure that `.ctrunner` directory is not already present where you want to create the setup. Because ctrunner sees this directory as a setup directory, it won't reinitialize.

## Contributions

Contributions to this project are most welcomed.

If you find bugs or want more features, but don't know how to fix/implement them, please fill an [issue](https://github.com/ankitmishradev/ctrunner/issues).

If you fixed bugs or implemented new features, please send a [pull request](https://github.com/ankitmishradev/ctrunner/pulls).
