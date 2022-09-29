export interface ISelectOption {
  label: string;
  value: string | number;
}

export interface ISelectMultiple {
  multiple: true;
  value: ISelectOption[];
  onChange: (value: ISelectOption[]) => void;
}

export interface ISelectSingular {
  multiple?: false;
  value?: ISelectOption;
  onChange: (value: ISelectOption | undefined) => void;
}

// check this
export interface ISelect {
  options: ISelectOption[];
}

export type ISelectProps = ISelect & (ISelectSingular | ISelectMultiple);
