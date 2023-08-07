export const en = {
  button: {
    favorite: 'Favorite',
    clear: ' Clear',
    close: 'Close',
    filter: 'Filter',
    menu: 'Menu',
    discard: 'Discard',
    addItem: 'Add Item',
    delete: 'Delete',
    updateItem: 'Update Item',
    back: 'Back',
    upload: 'Upload',
    downloadTemp: 'Download Template',
    edit: 'Edit',
    restore: 'Restore',
    empty: 'Empty',
    create: 'Create',
    update: 'Update',
  },
  table: {
    footer: {
      show: 'show',
      of: 'of',
      results: 'results',
      entries: 'entries',
    },
  },
  Menu: {
    Home: 'Home',
    Sales: 'Sales',
    Inventory: 'Inventory',
    Customer: 'Customer',
    Dashboard: 'Dashboard',
  },
  Inventory: {
    MainPage: {
      HeadText: 'Inventory Management',
      searchText: 'Search item here',
      filter: {
        label: 'Filter',
        brand: 'Brand Filter',
        type: 'Type Filter',
      },
      menu: {
        addItem: 'Add Item',
        upload: 'Upload Csv',
        type: 'Type',
        brand: 'Brand',
        trash: 'Trash',
      },
      table: {
        name: 'Item Name',
        type: 'Item Type',
        brand: 'Item Brand',
        amount: 'On Hand',
        sold: 'Sold',
        price: 'Price',
        expiryDate: 'Expiry Date',
        description: 'Description',
        action: 'Actions  ',
      },
      editor: {
        back: 'Back to inventory list',
        headers: {
          update: 'Edit Item',
          create: 'Add New Item',
          view: 'View Item',
        },
        warning: {
          header: 'Warning !',
          text: `If you delete Item. You can recovery or delete in trash.\n(auto delete 30 days)`,
        },
        type: {
          description: {
            label: 'Description',
            fields: {
              name: 'Item name',
              description: 'Description',
              expiryDate: 'Expiry date',
            },
          },
          category: {
            label: 'Category',
            fields: {
              type: 'Item type',
              brand: 'Item Brand',
            },
          },
          inventory: {
            label: 'Inventory',
            text: 'The minimum quantity for warning to reorder',
            fields: {
              amount: 'Quantity',
              sku: 'SKU',
              reorder: 'Reoder Level',
            },
          },
          shipping: {
            label: 'Shipping and Delivery',
            text: 'Package Size (The package size use to ship your product)',
            fields: {
              weight: 'Item Weight',
              kg: 'kg',
              cm: 'cm',
              width: 'Width',
              length: 'Length',
              height: 'Height',
            },
          },
          pricing: {
            lebel: 'Pricing',
            b: '฿',
            fields: {
              price: 'Price',
              memberPrice: 'Member Price',
            },
          },
          user: {
            label: 'User',
            field: {
              updateBy: 'Last Updated By',
              updateAt: 'Last Updated At',
            },
          },
        },
      },
      dialog: {
        upload: {
          header: {
            lable: 'Import Items',
            sub: 'Upload a CSV to import item data to your inventory.',
          },
          body: {
            text: 'Drag & drop your CSV here',
            sub: 'or, click to browse (single file, 4MB max)',
          },
          waning: {
            header: 'Duplicate!',
            text: 'If name is duplicate, check in trash or inventory',
          },
          validated: {
            header: 'Validated files',
            text: '(Please remove invalid files or duplicate name before upload)',
            field: {
              notFound: 'not found',
              duplicated: 'duplicated',
              requried: 'this field is requried!',
              notInt: 'is not an integer!',
              maxLength10: 'length exceeds maximum limit!(10)',
              maxLength20: 'length exceeds maximum limit!(20)',
              maxLength300: 'length exceeds maximum limit!(300)',
              duplicatedTrash: 'name is duplicated (inventory or trash)',
              mustBe: 'this value must be yes or no!',
              expiryDate:
                'is not valid. Example (18-11-2024), not in future or year > 2099',
            },
          },
        },
        trash: {
          header: {
            lable: 'Trash',
            sub: 'Restore or Delete from Trash. (Auto delete in 30 days)',
            by: 'by',
            on: 'on',
          },
        },
        type: {
          header: {
            lable: 'Type',
            sub: 'Add type for items',
          },
          search: 'Search type here',
          mode: {
            view: {
              label: 'VIEW',
              field: {
                createdBy: 'create by',
                on: 'on',
              },
            },
            create: {
              label: 'CREATE',
              field: {
                name: 'Name',
                description: 'Description',
              },
            },
            update: {
              label: 'UPDATE',
              field: {
                name: 'Name',
                description: 'Description',
                createdAt: 'Created At',
                createdBy: 'Created By',
                updatedAt: 'Updated At',
                updatedBy: 'Updated By',
              },
            },
          },
        },
        brand: {
          header: {
            lable: 'Brand',
            sub: 'Add brand for items',
          },
          search: 'Search brand here',
          mode: {
            view: {
              label: 'VIEW',
              field: {
                createdBy: 'create by',
                on: 'on',
              },
            },
            create: {
              label: 'CREATE',
              field: {
                name: 'Name',
                description: 'Description',
              },
            },
            update: {
              label: 'UPDATE',
              field: {
                name: 'Name',
                description: 'Description',
                createdAt: 'Created At',
                createdBy: 'Created By',
                updatedAt: 'Updated At',
                updatedBy: 'Updated By',
              },
            },
          },
        },
      },
    },
  },
}