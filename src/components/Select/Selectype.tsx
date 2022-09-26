export type ISelectOption = {
  label: string;
  value: string | number;
};

export type ISelectMultiple = {
  multiple: true;
  value: ISelectOption[];
  onChange: (value: ISelectOption[]) => void;
};

export type ISelectSingular = {
  multiple?: false;
  value?: ISelectOption;
  onChange: (value: ISelectOption | undefined) => void;
};

// check this
export type ISelect = {
  options: ISelectOption[];
} & (ISelectSingular | ISelectMultiple);
