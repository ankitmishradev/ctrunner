export const exit = (message: string, code?: number) => {
  process.stdout.write('\u001B[?25h');
  console.log(message);
  process.exit(code ?? 1);
};
