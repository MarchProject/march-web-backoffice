export const th = {
  button: {
    favorite: 'รายการโปรด',
    clear: 'ล้างค่า',
    close: 'ปิด',
    filter: 'ตัวกรอง',
    menu: 'เมนู',
    discard: 'ยกเลิก',
    addItem: 'เพิ่มสินค้า',
    delete: 'ลบ',
    updateItem: 'อัปเดตสินค้า',
    back: 'กลับ',
    upload: 'อัปโหลด',
    downloadTemp: 'ดาวน์โหลด',
    edit: 'แก้ไข',
    restore: 'กู้คืน',
    empty: 'ว่างเปล่า',
    create: 'สร้าง',
    update: 'อัปเดต',
  },
  table: {
    footer: {
      show: 'แสดง',
      of: 'จากทั้งหมด',
      results: 'รายการ',
      entries: 'รายการ',
    },
  },
  Menu: {
    Home: 'หน้าแรก',
    Sales: 'การเงิน',
    Inventory: 'คลังสินค้า',
    Customer: 'ลูกค้า',
    Dashboard: 'แดชบอร์ด',
    User: 'ผู้่ใช้',
  },
  Inventory: {
    MainPage: {
      HeadText: 'การจัดการคลังสินค้า',
      searchText: 'ค้นหาสินค้า',
      filter: {
        label: 'กรองสินค้า',
        brand: 'ยี่ห้อสินค้า',
        type: 'ประเภทสินค้่า',
      },
      menu: {
        addItem: 'เพิ่มสินค้า',
        upload: 'อัปโหลด Csv',
        type: 'ประเภท',
        brand: 'ยี่ห้อ',
        trash: 'ถังขยะ',
      },
      table: {
        name: 'ชื่อสินค้า',
        type: 'ประเภทสินค้า',
        brand: 'ยี่ห้อสินค้า',
        amount: 'จำนวน',
        sold: 'ขายแล้ว',
        price: 'ราคา',
        expiryDate: 'วันหมดอายุ',
        description: 'คำอธิบาย',
        action: 'Actions',
      },
      editor: {
        back: 'กลับไปหน้าคลังสินค้า',
        headers: {
          update: 'อัปเดตสินค้า',
          create: 'เพิ่มสินค้า',
          view: 'ดูสินค้า',
        },
        warning: {
          header: 'แจ้งเตือน !',
          text: `สินค้าที่ถูกลบ สามารถกู้คืนได้ที่ถังขยะ\n(ลบอัตโนมัติ 30 วัน)`,
        },
        type: {
          description: {
            label: 'คำอธิบาย',
            fields: {
              name: 'ชื่อสินค้า',
              description: 'คำอธิบาย',
              expiryDate: 'วันหมดอายุ (วว-ดด-ปปปป)',
            },
          },
          category: {
            label: 'หมวดหมู่',
            fields: {
              type: 'ประเภทสินค้า',
              brand: 'ยี่ห้อสินค้า',
            },
          },
          inventory: {
            label: 'คลังสินค้า',
            text: 'ขั้นต่ำจำนวนสินค้า ที่ต้องการสั่งเพิิ่ม',
            fields: {
              amount: 'จำนวน',
              sku: 'SKU',
              reorder: 'ขั้นต่ำจำนวนสินค้า',
            },
          },
          shipping: {
            label: 'การจัดส่งสินค้า',
            text: 'ขนาดสินค้า (ใช้สำหรับการขนส่ง)',
            fields: {
              weight: 'น้ำหนัก',
              kg: 'กก.',
              cm: 'ซม.',

              width: 'กว้าง',
              length: 'ยาว',
              height: 'สูง',
            },
          },
          pricing: {
            lebel: 'ราคา',
            b: 'บาท',
            fields: {
              price: 'ราคา',
              memberPrice: 'ราคาสมาชิก',
            },
          },
          user: {
            label: 'ผู้ใช้',
            field: {
              updateBy: 'อัปเดตล่าสุดโดย',
              updateAt: 'อัปเดตล่าสุดเมื่อ',
            },
          },
        },
      },
      dialog: {
        upload: {
          header: {
            lable: 'นำเข้าสินค้า',
            sub: 'อัปโหลด CSV สำหรับนำเข้าสินค้าของคุณ',
          },
          body: {
            text: 'ลาก หรือ วางไฟล์ที่นี่',
            sub: 'หรือคลิ๊กเพื่อเปิด (ครั้งละ 1 ไฟล์ ไม่เกิน 4 เมกะไบต์)',
          },
          waning: {
            header: 'การอัปโหลดซ้ำ!',
            text: 'ถ้ามีการซ้ำของชื่อ โปรดตรวจสอบที่ถังขยะ',
          },
          validated: {
            header: 'ตรวจสอบความถูกต้องไฟล์',
            text: '(ลบไฟล์ที่ไม่ผ่านการตรวจสอบ หรือ ชื่อซ้ำก่อนอัพโหลดไฟล์',
            field: {
              notFound: 'ไม่พบ',
              duplicated: 'ซ้ำกัน',
              requried: 'ต้องการข้อมูลนี้',
              notInt: 'ไม่ใช่จำนวนเต็ม',
              maxLength10: 'ขนาดเกิน 10 ตัวอักษร',
              maxLength20: 'ขนาดเกิน 20 ตัวอักษร',
              maxLength300: 'ขนาดเกิน 300 ตัวอักษร',
              duplicatedTrash: 'ชื่อซ้ำ (คลังสินค้า หรือ ถังขยะ)',
              mustBe: 'จะต้องเป็น yes หรือ no',
              expiryDate:
                'ไม่ถูกต้อง ตัวอย่าง(18-11-2024), เป็นอดีต หรือ ปีเกิน 2099',
            },
          },
        },
        trash: {
          header: {
            lable: 'ถังขยะ',
            sub: 'กู้คืน หรือ ลบ. (ลบอัตโนมัติใน 30 วัน)',
            by: 'โดย',
            on: 'เมื่อ',
          },
        },
        type: {
          header: {
            lable: 'ประเภท',
            sub: 'เพิ่มประเภทสำหรับสินค้า',
          },
          search: 'ค้นหาประเภท',
          mode: {
            view: {
              label: 'ดู',
              field: {
                createdBy: 'สร้างโดย',
                on: 'เมื่อ',
              },
            },
            create: {
              label: 'สร้าง',
              field: {
                name: 'ชื่อ',
                description: 'คำอธิบาย',
              },
            },
            update: {
              label: 'อัปเดต',
              field: {
                name: 'ชื่อ',
                description: 'คำอธิบาย',
                createdAt: 'สร้างเมื่อ',
                createdBy: 'สร้างโดย',
                updatedAt: 'อัปเดตเมื่อ',
                updatedBy: 'อัปเดตโดย',
              },
            },
          },
        },
        brand: {
          header: {
            lable: 'ยี่ห้อ',
            sub: 'เพิ่มยี่ห้อสำหรับสินค้า',
          },
          search: 'ค้นหายี่ห้อ',
          mode: {
            view: {
              label: 'ดู',
              field: {
                createdBy: 'สร้างโดย',
                on: 'เมื่อ',
              },
            },
            create: {
              label: 'สร้าง',
              field: {
                name: 'ชื่อ',
                description: 'คำอธิบาย',
              },
            },
            update: {
              label: 'อัปเดต',
              field: {
                name: 'ชื่อ',
                description: 'คำอธิบาย',
                createdAt: 'สร้างเมื่อ',
                createdBy: 'สร้างโดย',
                updatedAt: 'อัปเดตเมื่อ',
                updatedBy: 'อัปเดตโดย',
              },
            },
          },
        },
      },
    },
  },
}
