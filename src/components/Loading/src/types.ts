import { SizeEnum } from '/@app/enums';

export interface LoadingProps {
  tip: string;
  size: SizeEnum;
  absolute: boolean;
  loading: boolean;
  background: string;
  theme: 'dark' | 'light';
}
