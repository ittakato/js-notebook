import { Command } from 'commander';

const loginCommand = new Command()
  .command('login')
  .description('')
  .action(() => {
  });

export default loginCommand;

