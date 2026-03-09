import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { If } from './If';

test('If', async () => {
  const screen = await render(
    <If show={true}>
      <button>Hello</button>
    </If>
  );
  const ifElement = screen.getByRole('button');

  expect(ifElement).toBeInTheDocument();
  expect(ifElement).toHaveTextContent('Hello');
});
