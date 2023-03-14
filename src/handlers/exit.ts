import { deleteTemp, deleteTSConfig } from '../fs';

process.stdin.resume();

function exitHandler(options: { cleanup?: boolean; exit?: boolean }) {
  if (options.cleanup) {
    deleteTSConfig();
    deleteTemp();
    console.log('\u001B[?25h');
  }
  if (options.exit) process.exit();
}

const handleExit = () => {
  //do something when app is closing
  process.on('exit', exitHandler.bind({ cleanup: true }));

  //catches ctrl+c event
  process.on('SIGINT', exitHandler.bind({ exit: true }));

  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', exitHandler.bind({ exit: true }));
  process.on('SIGUSR2', exitHandler.bind({ exit: true }));

  //catches uncaught exceptions
  process.on('uncaughtException', exitHandler.bind({ exit: true }));
};

handleExit();
