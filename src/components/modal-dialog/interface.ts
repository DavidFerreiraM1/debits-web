export interface OpenFuncParam {
  title: string;
  text: string;
  action: () => void;
}

export interface DialogRefProps {
  open: (param: OpenFuncParam) => void;
  close: () => void;
}

export interface Props {}
