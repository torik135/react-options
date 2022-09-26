import React, { useState } from 'react';
import './assets/css/App.css';

import { Select, ISelectOption } from './components';

const options = [
  { label: 'HTML', value: 1 },
  { label: 'CSS', value: 2 },
  { label: 'JS', value: 3 },
  { label: 'PHP', value: 4 },
  { label: 'PYTHON', value: 5 },
];

const App: React.FC = () => {
  const [value1, setValue1] = useState<ISelectOption | undefined>(options[0]);
  const [value2, setValue2] = useState<ISelectOption[]>([options[0]]);

  return (
    <div className="App flex gap-[1rem]">
      <div>
        <h1>Multiple Option</h1>
        <Select
          multiple
          options={options}
          value={value2}
          onChange={(op) => setValue2(op)}
        />
      </div>
      <div>
        <h1>Singular Option</h1>
        <Select
          options={options}
          value={value1}
          onChange={(op) => setValue1(op)}
        />
      </div>
    </div>
  );
};

export default App;
