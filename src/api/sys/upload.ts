import { UploadApiResult } from '/@app/model';
import { defHttp } from '/@app/plugin';
import { UploadFileParams } from '/@app/model';
import { useGlobSetting } from '/@app/hooks/setting';

const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params
  );
}
