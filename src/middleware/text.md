const token = {
  role: 'SUPERADMIN',
  info: {
    functions: [
      'MENU:DASHBOARD',
      'MENU:SALES',
      'MENU:INVENTORY',
      'MENU:CUSTOMER',
    ],
    page: {
      'MENU:INVENTORY': ['CREATE', 'VIEW', 'UPDATE'],
      'MENU:DASHBOARD': ['CREATE', 'VIEW', 'UPDATE'],
      'MENU:SALES': ['CREATE', 'VIEW', 'UPDATE'],
      'MENU:CUSTOMER': ['CREATE', 'VIEW', 'UPDATE'],
    },
  },
  deviceId: '84afd8e9-a78b-488a-b90f-944cea9b69db',
  userId: '38fe5ae4-7fa2-463b-afa1-4679e1c918a1',
  shopsId: '927b92eb-49a9-4de2-832c-b90203c5ad85',
  userName: 'admin',
  iat: 1687099717,
  exp: 1687186117,
}

const e = [
  {
    functions: {
      name: 'MENU:DASHBOARD',
    },
    create: true,
    view: true,
    update: true,
  },
  {
    functions: {
      name: 'MENU:SALES',
    },
    create: true,
    view: true,
    update: true,
  },
  {
    functions: {
      name: 'MENU:INVENTORY',
    },
    create: true,
    view: true,
    update: true,
  },
  {
    functions: {
      name: 'MENU:CUSTOMER',
    },
    create: true,
    view: true,
    update: true,
  },
]
