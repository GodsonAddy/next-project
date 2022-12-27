import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  OutlinedInput,
  InputAdornment,
  Avatar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Link,
} from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useDrawerContext } from "../../context/drawer.context";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar } from "../../utils/CommunityMember.utils";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/assets/bloop-logo.png";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(OutlinedInput)(({ theme }) => ({
  color: "#000",
  width: 250,
  fontSize: "0.875rem",
  fontWeight: "bolder",
  lineHeight: "1.5",
  borderRadius: 16,
  height: 40,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function MenuBar() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log("session", session);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { drawerOpen, handleDrawer } = useDrawerContext();

  const isMenuOpen = Boolean(anchorElNav);
  const isMobileMenuOpen = Boolean(anchorElUser);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    handleCloseUserMenu();
    signOut();
  };

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: session?.user?.color,
      },
      children: `${name?.split(" ")[0][0]}${name?.split(" ")[1][0]}`,
    };
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorElNav}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleCloseNavMenu}
    >
      <MenuItem onClick={() => router.push("/reader/profile")}>
        Profile
      </MenuItem>
      <MenuItem onClick={handleLogOut}>LogOut</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleCloseUserMenu}
    >
      <MenuItem onClick={() => router.push("/")}>
        <IconButton size="large">
          <HomeRoundedIcon />
        </IconButton>

        <p>Home</p>
      </MenuItem>
      <MenuItem onClick={() => router.push("/reader/profile")}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleOpenNavMenu}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {session?.user?.avatar ? (
            <Avatar alt={session?.user?.name} src={session?.user?.avatar} />
          ) : (
            <Avatar
              alt={session?.user?.name}
              {...stringAvatar(session?.user?.name)}
            />
          )}
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        open={drawerOpen}
        color="secondary"
        sx={{ boxShadow: "none", backgroundColor: "#e3f2fd" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(drawerOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Search>
              <StyledInputBase
                placeholder="Search"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, mr: 2 }}
          >
            {session?.user?.name ? `Hello ${session?.user?.name}` : null}
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", sm: "block" }, m: 2 }}
          />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => router.push("/reader/profile")}
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsNoneOutlinedIcon />
                </Badge>
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                direction: "row",
                justifyContent: "center",
                alignItems: "center",
                mx: 2,
              }}
            >
              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                {session?.user?.avatar ? (
                  <Avatar
                    alt={session?.user?.name}
                    src={session?.user?.avatar}
                  />
                ) : (
                  <Avatar
                    alt={session?.user?.name}
                    {...stringAvatar(session?.user?.name)}
                  />
                )}
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleOpenUserMenu}
              color="tertiary"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </React.Fragment>
  );
}
