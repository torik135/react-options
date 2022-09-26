import React from 'react';
import { ISelect } from './';

const Select: React.FC<ISelect> = (props) => {
  const { value, onChange, options } = props;

  return (
    <div className="relative w-[20em] min-h-[1.5em] border-[.05em] border-rose-900 flex items-center gap-[.5em] p-[.5em]">
      <span>Value</span>
      <button>&times;</button>
      <div>divider</div>
      <div>caret</div>

      <ul>
        {options.map((op) => (
          <li key={`${op.value}_${Math.random()}`}>{op.label}</li>
        ))}
      </ul>
    </div>
  );
};

export { Select };
