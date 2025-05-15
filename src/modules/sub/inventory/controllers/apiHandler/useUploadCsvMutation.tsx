import { useNotificationContext } from '@/context/notification'
import { StatusCode } from '@/types/response'
import {
  notificationInternalErrorProp,
  notificationMutationProp,
} from '@/core/notification'
import { uploadCsv } from '../fetcher/uploadCsv'
import { UploadCSVResponse } from '@/core/gql/inventory/uploadCsv'

export const useUploadCsvMutation = ({ handleClose }) => {
  const { notification } = useNotificationContext()

  const onCompleted = (data: UploadCSVResponse) => {
    if (data?.uploadInventory?.status?.code === StatusCode.SUCCESS) {
      if (data?.uploadInventory?.data?.success === true) {
        notification(
          notificationMutationProp(
            data?.uploadInventory?.status.message,
            'success',
          ),
        )
        handleClose()
      } else {
        notification(
          notificationMutationProp(
            data?.uploadInventory?.status.message,
            'error',
          ),
        )
      }
    } else {
      notification(
        notificationMutationProp(
          data?.uploadInventory?.status.message,
          'error',
        ),
      )
    }
  }

  const onError = (error) => {
    if (error.message === 'Unauthorized Role') {
      notification(notificationInternalErrorProp('Permission.', 'Server'))
    } else {
      notification(notificationInternalErrorProp('Update Failed.'))
    }
  }

  const { uploadCSVHandler, upLoadCsvLoading } = uploadCsv({
    onCompleted,
    onError,
  })

  return {
    upLoadCsvLoading,
    uploadCSVHandler,
  }
}
