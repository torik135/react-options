import React from 'react';
import './assets/css/App.css';

import { Select } from './components';

const options = [
  { label: 'First', value: 1 },
  { label: 'Second', value: 2 },
  { label: 'Third', value: 3 },
];

const App: React.FC = () => {
  return (
    <div className="App">
      <Select options={options} />
    </div>
  );
};

export default App;
