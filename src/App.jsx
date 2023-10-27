import { h } from 'preact';

import { Test } from './Test';

export function App() {
  const boom = <Test/>;

  console.log('render App');
  return (
    <div>
      <h1>App function</h1>
    </div>
  );
}
