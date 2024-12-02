import * as React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SignOut from '@/components/logout/logout'
import { MdLanguage } from 'react-icons/md'
import { setLanguage } from '@/config/client'
import { tkeys } from '@/translations/i18n'
import { Dropdown, Layout, Image } from 'antd'

const { Header } = Layout

const NewAppBarMobile = ({ tabMenu, handlePath, profiles }) => {
  const { t: trans, i18n }: any = useTranslation()

  const [lg, setLg] = useState('')

  useEffect(() => {
    setLg(i18n.language)
  }, [i18n.language])

  const onClick = (e) => {
    const value = tabMenu.find((f) => f.key === e.key)
    handlePath(value.path)
  }

  const menu = tabMenu.map((t) => ({
    key: t.key,
    label: t.label,
  }))

  const user = [
    {
      key: '1',
      label: (
        <p className="m-0 lg:hidden text-xs font-semibold text-secondary ml-[2px]">
          {profiles.userName}
        </p>
      ),
    },
    {
      key: '2',
      label: (
        <div
          className="flex justify-between items-center"
          onClick={() => {
            setLanguage(lg === 'th' ? 'en' : 'th')
            i18n.changeLanguage(lg === 'th' ? 'en' : 'th')
          }}>
          <p className="text-xs font-semibold text-secondary m-0 ml-[2px]">
            {trans(tkeys.common.button.language)}
          </p>
          <MdLanguage color="rgb(135, 135, 135)" />
        </div>
      ),
    },
    {
      key: '3',
      label: <SignOut />,
    },
  ]

  return (
    <Layout>
      <Header
        className="bg-primary100 text-white"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 30px',
          borderBottom: '1px solid #d9d9d9',
          fontFamily: "'IBM Plex Sans Thai', sans-serif",
        }}>
        <Dropdown menu={{ items: menu, onClick }} trigger={['click']}>
          <MenuIcon />
        </Dropdown>
        <div
          style={{
            fontSize: '26px',
            display: 'flex',
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.5rem',
            color: 'white ',
            textDecoration: 'none',
          }}>
          MARCH
        </div>
        <Dropdown menu={{ items: user }} trigger={['click']}>
          <Image
            className="max-w-[45px] max-h-[45px] my-auto block !border-2! border-violet-500 border-solid rounded-full bg-white"
            preview={false}
            src={profiles.pic}
            alt="user-icon"
          />
        </Dropdown>
      </Header>
    </Layout>
  )
}
export default NewAppBarMobile
