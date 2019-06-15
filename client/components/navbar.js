import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
// import InputBase from '@material-ui/core/InputBase'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
// import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
// import MailIcon from '@material-ui/icons/Mail'
// import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import Drawer from '@material-ui/core/Drawer'
import Paper from '@material-ui/core/Paper'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
// import { StylesProvider } from '@material-ui/styles';
import {ListItem, ListItemText, Divider, List} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
}))

function Navbar(props) {
  // const theme = useTheme()
  const classes = useStyles()
  const [state, setState] = React.useState({
    adminDrawer: false
  })
  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setState({...state, adminDrawer: open})
  }

  const drawerList = () => {
    return (
      // <StylesProvider jss={drawerClasses} disableGeneration>
      <Paper>
        <div>
          <List>
            <ListItem>
              <ListItemText primary={<h3>Admin Menu</h3>} />
            </ListItem>
          </List>

          <Divider />
          <List>
            {['User Toolbox', 'Product Toolbox', 'Inventory Management'].map(
              (text, index) => (
                <ListItem button key={text}>
                  <Link to="/admin/allusers">
                    <ListItemText primary={text} />
                  </Link>
                </ListItem>
              )
            )}
          </List>
        </div>
      </Paper>
      // </StylesProvider>
    )
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null)
  }

  function handleMenuClose() {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      id={menuId}
      keepMounted
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      <MenuItem onClick={handleMenuClose}>
        <Link to="/accounts">My account</Link>
      </MenuItem>
      <MenuItem onClick={props.handleClick}>Logout</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="Go to Cart" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <Link to="/cart">
              <ShoppingCart />
            </Link>
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="Account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Link to="/accounts">
          <p>My Account</p>
        </Link>
      </MenuItem>
    </Menu>
  )

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="primary" className="navbar">
        <Drawer
          anchor="left"
          open={state.adminDrawer}
          onClose={toggleDrawer(false)}
        >
          {drawerList()}
        </Drawer>
        <Toolbar>
          {!props.isAdmin ? (
            ''
          ) : (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/home">
              <img
                src="/LogoMakr_4AgeQz.png"
                style={{width: '50%', height: '50%'}}
              />
            </Link>
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {props.isLoggedIn ? (
              <p> Welcome, {`${props.currentUser.firstName}`}</p>
            ) : (
              <Typography className={classes.menuButton} noWrap>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </Typography>
            )}
            <Link to="/cart">
              <IconButton aria-label="Go To Cart" color="inherit">
                <Badge
                  badgeContent={Object.values(props.cart).reduce(
                    (accum, item) => accum + item.quantity,
                    0
                  )}
                  color="secondary"
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Link>

            <IconButton
              edge="end"
              aria-label="Account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="Show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    currentUser: state.user,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
