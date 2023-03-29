import path from 'path';
import fs from 'fs/promises';

import express from 'express';

interface Cell {
  id: string;
  content: string;
  type: 'code' | 'text';
}

interface LocalApiError {
  code: string;
}

function createCellsRouter(filename: string, dir: string) {
  function isLocalApiError(err: any): err is LocalApiError {
    return typeof err.code === 'string';
  }

  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
      res.send(JSON.parse(result));
    } catch (error) {
      if (isLocalApiError(error)) {
        if (error.code === 'ENOENT') {
          const initialState =
            '[{"content":"# js-notebook\\n\\njs-notebook is a web-based notebook environment for interactive computing of JavaScript. Markdown is available for comprehensive documentation of code.\\n\\n- A **Markdown cell** contains text formatted using Markdown and displays its output in-place when the Markdown cell is run. Click to edit.\\n\\n- A **code cell** contains JavaScript code to be executed. When the code is run, the notebook displays the output on the right hand side by using the show() function.\\n\\n- ```show``` function is a built-in function that can used to display outputs including React components.\\n\\n- Variables and functions can be referred to in the subsequent cells\\n\\n- Add a new cell by hovering on the divider between each cell\\n\\n- Click on the format button on the top-right of the code cell to format code\\n\\nAll changes are saved in a file you opened with. By default, the filename **notebook.js`** is used.\\n\\n\\n\\n\\n","type":"text","id":"f5d3304a-25a2-4cda-a586-a52060ac8cec"},{"content":"import { useState } from \'react\';\\n\\nfunction Counter() {\\n  const [count, setCount] = useState(0);\\n\\n  function onClickHandler() {\\n    setCount((prevCount) => prevCount + 1);\\n  }\\n\\n  return (\\n    <div>\\n      <p>You clicked {count} times</p>\\n      <button onClick={onClickHandler}>Increment</button>\\n    </div>\\n  );\\n}\\n\\nshow(<Counter />);","type":"code","id":"c76d1080-8341-4e7a-8342-5355da2e5c1d"}]';
          await fs.writeFile(fullPath, initialState, 'utf-8');
          res.send(initialState);
        }
      } else {
        throw error;
      }
    }
  });

  router.post('/cells', async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;

    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'ok' });
  });

  return router;
}

export { createCellsRouter };
