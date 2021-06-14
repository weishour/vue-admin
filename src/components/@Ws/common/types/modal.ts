import { VxeModalInstance, VxeModalProps, VxeModalEventProps, VxeButtonDefines } from 'vxe-table';

type ButtonClick = (params: VxeButtonDefines.ButtonEventParams) => void;

export type NrModalProps = VxeModalProps &
  VxeModalEventProps & {
    onContinueButtonClick?: ButtonClick;
    onSaveButtonClick?: ButtonClick;
  };

export interface NrModalElRef {
  modalElRef: VxeModalInstance;
  getBindValue: VxeModalProps;
}
