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
import MenuItem from '@mui/material/MenuItem'
import { uniqBy } from 'lodash'
import { orderBy } from 'lodash'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import SignOut from '@/components/logout/logout'

const AppBarMobile = ({ tabMenu, handlePath, tab, profiles }) => {
  const { t: trans }: any = useTranslation()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  )

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
              <MenuItem onClick={handleCloseUserMenu}>
                <SignOut />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default AppBarMobile
