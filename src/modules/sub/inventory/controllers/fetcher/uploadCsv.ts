import { useCallback } from 'react'
import { ApolloError, useMutation } from '@apollo/client'
import {
  UploadCSVRequest,
  UploadCSVResponse,
  uploadInventoryMutation,
} from '@/core/gql/inventory/uploadCsv'

interface IUseUploadCSVHandleProps {
  onCompleted: (data: UploadCSVResponse) => void
  onError: (error: ApolloError) => void
}

export const useUploadCsv = ({
  onCompleted,
  onError,
}: IUseUploadCSVHandleProps) => {
  const [uploadInventory, { loading }] = useMutation<
    UploadCSVResponse,
    UploadCSVRequest
  >(uploadInventoryMutation, {
    onCompleted,
    onError,
    context: {
      hasUpload: true,
    },
  })

  const uploadCSVHandler = useCallback(
    (file: Blob) => {
      uploadInventory({
        variables: {
          file: file as File,
        },
      })
    },
    [uploadInventory],
  )

  return {
    uploadCSVHandler,
    upLoadCsvLoading: loading,
  }
}
