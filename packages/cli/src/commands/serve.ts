import path from 'path';
import { Command } from 'commander';
import { serve } from '@web-jsnotebook/local-api';

interface LocalApiError {
  code: string;
}

const isProduction = process.env.NODE_ENV === 'production';

const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(
    async (filename: string = 'notebook.js', options: { port: string }) => {
      function isLocalApiError(error: any): error is LocalApiError {
        return typeof error.code === 'string';
      }

      try {
        const dir = path.join(process.cwd(), path.dirname(filename));
        await serve(
          parseInt(options.port),
          path.basename(filename),
          dir,
          !isProduction
        );
        console.log(
          `Opened ${filename}. Go to http://localhost:${options.port} to edit file.`
        );
      } catch (error) {
        if (isLocalApiError(error)) {
          if (error.code === 'EADDRINUSE') {
            console.error('Port is in use. Try running on a different port.');
          }
        } else if (error instanceof Error) {
          console.error('Here is the problem:', error.message);
        }
        process.exit(1);
      }
    }
  );

export default serveCommand;
