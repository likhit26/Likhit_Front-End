import React from 'react';
import List from './List';

const App = () => {
  const items = [
    { text: 'Item 1' },
    { text: 'Item 2' },
    { text: 'Item 3' },
    { text: 'Item 4' },
    { text: 'Item 5' },
  ];

  return (
    <div>
      <List items={items} />
    </div>
  );
};

export default App;