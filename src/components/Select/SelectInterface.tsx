export interface ISelectOption {
  label: string;
  value: any;
}

export interface ISelect {
  value?: ISelectOption;
  options: ISelectOption[];
  onChange: (value: ISelectOption | undefined) => void;
}
