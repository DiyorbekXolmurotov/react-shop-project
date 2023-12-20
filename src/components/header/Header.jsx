import React, { useEffect, useState } from 'react'
import './Header.scss'
import axios from 'axios'
import shop from '../../assets/shopping-cart-svgrepo-com.svg'
import user from '../../assets/user.svg'
import Shop from '../../assets/shopping-cart-supermarket-svgrepo-com (2).svg'
import { useNavigate } from 'react-router'

export default function Header() {
  const navigate = useNavigate()
  const [pages, setPages] = useState([])
  const [setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("https://api.escuelajs.co/api/v1/categories/", {
          params: {
            limit: 5
          }
        })
        setPages(res?.data)
        return res
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <header>
        <div className="container">
          <div className="header">
            <h1>
              <a style={{display: 'flex', alignItems: 'center', gap: '10px'}} href="/">
                <img src={Shop} alt='header logo' width={50} height={50}/>
                <span style={{color: 'black'}}>Shop</span>
              </a>
            </h1>
            <div className="header__pages">
            {pages && (
            pages.map((page) => (
              <a onClick={() => navigate(`/categories/${page.id}`)} key={page.id} className='header__pages--btn'>{page.name}</a>
            ))
            )}
        </div>  
            <div className="header__others-box">
              <a href='/cart'>
                <img src={shop} width={28} height={28} alt="shop svg" />
              </a>
              <a href='/profile'>
                <img src={user} width={30} height={30} alt="user svg" />
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// function ResponsiveAppBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const navigate = useNavigate()
//   const [pages, setPages] = useState([])
//   const [setError] = useState(null)

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await axios.get("https://api.escuelajs.co/api/v1/categories/", {
//           params: {
//             limit: 5
//           }
//         })
//         setPages(res?.data)
//         return res
//       } catch (error) {
//         setError(error)
//       }
//     }
//     fetchData()
//   }, [])

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href={Shop}
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page.id} onClick={handleCloseNavMenu => navigate(`/categories/${page.id}`)}>
//                   <Typography textAlign="center">{page.name}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href={Shop}
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="user svg" src={user} />
//               </IconButton>
//             </Tooltip>
//             {/* <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center">{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu> */}
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default ResponsiveAppBar;