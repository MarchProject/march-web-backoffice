import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import { uniqBy } from 'lodash'
import { orderBy } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SignOut from '@/components/logout/logout'
import { MdLanguage } from 'react-icons/md'
import { getUsername, setLanguage } from '@/config/client'
import { tkeys } from '@/translations/i18n'

const AppBarMobile = ({ tabMenu, handlePath, tab, profiles }) => {
  const { t: trans, i18n }: any = useTranslation()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  )
  const [lg, setLg] = useState('')

  const username = getUsername()

  useEffect(() => {
    setLg(i18n.language)
  }, [i18n.language])

  const LgChange = () => {
    return (
      <div
        className={'flex cursor-pointer  justify-between w-full'}
        onClick={() => {
          setLanguage(lg === 'th' ? 'en' : 'th')
          i18n.changeLanguage(lg === 'th' ? 'en' : 'th')
        }}>
        <p className="text-xs font-semibold text-secondary m-0 ml-[2px]">
          {trans(tkeys.button.language)}
        </p>
        <MdLanguage color="rgb(135 135 135)" className={'my-auto ml-[15px] '} />
      </div>
    )
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const tranT = useCallback(
    (text: string) => {
      return trans(`Menu.${text}`)
    },
    [trans],
  )

  return (
    <AppBar position="static" color="primary" className="">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <IconButton
              className="!text-white !rounded-lg"
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="default">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                '& .MuiPaper-root': {
                  borderRadius: '12px',
                },
                display: 'flex',
              }}>
              <div className="px-[5px]">
                {orderBy(
                  uniqBy(tabMenu, 'id').map((tabM: any) => (
                    <div
                      key={tabM.id}
                      onClick={() => handlePath(tabM.value)}
                      className={`text-start px-[15px] py-[10px]  font-medium rounded-xl ${
                        tab === tabM.id ? ' bg-primary100 text-white' : ''
                      }`}>
                      {tranT(tabM.label)}
                    </div>
                  )),
                  ['key'],
                  ['asc'],
                )}
              </div>
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: 'flex',
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white ',
              textDecoration: 'none',
            }}>
            MARCH
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              className="!bg-white"
              onClick={handleOpenUserMenu}
              sx={{ p: 0 }}>
              <Avatar
                className="border-[1px] border-solid border-black"
                alt="Remy Sharp"
                src={profiles.pic}
              />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              <div className="px-2 flex flex-col gap-[10px]">
                <p className='m-0 lg:hidden text-xs font-semibold text-secondary ml-[2px]'>{username}</p>
                <LgChange />
                <SignOut />
              </div>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default AppBarMobile
