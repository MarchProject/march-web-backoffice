import { notificationProp } from '@/core/notification/inventory/inventory/dialogCustom'
import { tkeys } from '@/translations/i18n'
import { SubmitHandler } from 'react-hook-form'
import { tranFromUpsertInventoryDto } from '../../../dto/upsert.dto'
import { IInventoryForm } from '../interface'

export const useSubmitForm = ({
  notification,
  idInventory,
  upsertInventory,
  trans,
}) => {
  const onSubmit: SubmitHandler<IInventoryForm> = (data) => {
    try {
      const InventoryInput = tranFromUpsertInventoryDto(data, idInventory)
      upsertInventory({
        variables: {
          ...InventoryInput,
        },
      })
    } catch (error) {
      notification(
        notificationProp(
          trans(tkeys.Inventory.MainPage.HeadText),
          trans(tkeys.Inventory.MainPage.noti.editor.somethingWrong),
          'error',
        ),
      )
    }
  }
  const onError = () => {
    notification(
      notificationProp(
        trans(tkeys.Inventory.MainPage.HeadText),
        trans(tkeys.Inventory.MainPage.noti.editor.validate),
        'error',
      ),
    )
  }

  return {
    onSubmit,
    onError,
  }
}
