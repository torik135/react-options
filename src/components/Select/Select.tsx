import React, { useState, useEffect, useRef } from 'react';
import { ISelectProps, ISelectOption } from './';

const selectedLi: string = 'bg-rose-600';
const highlightedLi: string = 'bg-rose-400 text-white';

const Select: React.FC<ISelectProps> = (props) => {
  const { multiple, value, onChange, options } = props;
  const [optionOpen, setOptionOpen] = useState<boolean>(false);
  const [highlightedIdx, setHighlightedIdx] = useState<number>(0);
  const contRef = useRef<HTMLDivElement>(null);

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined);
  }

  function selectOption(op: ISelectOption) {
    if (multiple) {
      if (value.includes(op)) {
        onChange(value.filter((v) => v !== op));
      } else {
        onChange([...value, op]);
      }
    } else {
      if (op !== value) onChange(op);
    }
  }

  function optionSelected(op: ISelectOption) {
    return multiple ? value.includes(op) : op === value;
  }

  useEffect(() => {
    if (optionOpen) setHighlightedIdx(0);
  }, [optionOpen]);

  useEffect(() => {
    const eventHandler = (e: KeyboardEvent) => {
      if (e.target != contRef.current) return;
      switch (e.code) {
        case 'Enter':
        case 'Space':
          setOptionOpen((prev) => !prev);
          if (optionOpen) selectOption(options[highlightedIdx]);
          break;
        case 'ArrowUp':
        case 'ArrowDown': {
          if (!optionOpen) {
            setOptionOpen(true);
            break;
          }
          const newVal = highlightedIdx + (e.code === 'ArrowDown' ? 1 : -1);
          if (newVal >= 0 && newVal < options.length) {
            setHighlightedIdx(newVal);
          }
          break;
        }
        case 'Escape':
          setOptionOpen(false);
          break;
      }
    };

    contRef.current?.addEventListener('keydown', eventHandler);

    return () => {
      contRef.current?.removeEventListener('keydown', eventHandler);
    };
  }, [optionOpen, highlightedIdx, options]);

  return (
    <div
      ref={contRef}
      onClick={() => setOptionOpen((prev) => !prev)}
      onBlur={() => setOptionOpen(false)}
      tabIndex={0}
      className="relative w-[20em] min-h-[3.5em] border-[.05em] border-rose-900 flex items-center gap-[.5em] p-[.5em] rounded-[.25em] outline-none focus:border-blue-400 focus:border-[.15em]"
    >
      <span className="grow flex gap-[.5em] flex-wrap">
        {multiple
          ? value.map((v) => (
              <button
                key={`${v.label}_${Math.random()}`}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(v);
                }}
                className="flex items-center border-[.05em] border-rose-900 px-[.25em] py-[.15em] rounded-[.25em] gap-[.25em] cursor-pointer bg-white outline-none hover:bg-rose-300 focus:bg-rose-300 hover:border-rose-500 focus:border-rose-500"
              >
                {v.label}
                <span className="hover:text-rose-500 focus:border-rose-500 text-[1.25em] text-[#777]">
                  &times;
                </span>
              </button>
            ))
          : value?.label}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className="bg-none text-[#777] outline-none border-none cursor-pointer p-0 text-[1.25em] focus:text-[#333] hover:text-[#333]"
      >
        &times;
      </button>
      <div className="bg-[#777] self-stretch w-[.05em]"></div>
      <div className="border-[.25em] border-t-[#777] border-transparent translate-y-[25%]"></div>

      {/* show and hide */}
      <ul
        className={`absolute m-0 p-0 list-none ${
          optionOpen ? 'block' : 'hidden'
        } max-h-[15em] overflow-y-auto border-[.05em] border-rose-900 rounded-[.25em] w-full top-[100%] left-0 translate-y-[.25em] bg-white z-[100]`}
      >
        {options.map((op, idx) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(op);
              setOptionOpen(false);
            }}
            onMouseEnter={() => setHighlightedIdx(idx)}
            key={`${op.value}_${Math.random()}`}
            className={`py-[.25em] px-[.5em] hover:cursor-pointer hover:font-bold ${
              optionSelected(op) ? selectedLi : ''
            } ${idx === highlightedIdx ? highlightedLi : ''}`}
          >
            {op.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Select };
