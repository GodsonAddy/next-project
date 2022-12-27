import SettingsIcon from "@mui/icons-material/Settings";
import { List } from "@mui/material";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import WebStoriesRoundedIcon from "@mui/icons-material/WebStoriesRounded";
import HeadsetRoundedIcon from "@mui/icons-material/HeadsetRounded";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

export const lists = [
  {
    key: "home",
    label: "Home",
    icon: HomeRoundedIcon,
    link: "/reader/home",
    items: null,
  },
  {
    key: "stories",
    label: "Stories",
    icon: WebStoriesRoundedIcon,
    link: "/reader/stories",
    items: null,
  },

  {
    key: "audios",
    label: "Audios",
    icon: HeadsetRoundedIcon,
    link: "/reader/audios",
    items: null,
  },

  {
    key: "videos",
    label: "Videos",
    icon: VideoLibraryRoundedIcon,
    link: "/reader/videos",
    items: null,
  },
  {
    key: "courses",
    label: "Courses",
    icon: SchoolRoundedIcon,
    link: "/reader/courses",
    items: null,
  },
  {
    key: "profile",
    label: "Profile",
    icon: FaceRoundedIcon,
    link: "/reader/profile",
    items: null,
  },
  {
    key: "resources",
    label: "Resources",
    icon: SettingsIcon,
    link: "/reader/resources",
    items: null,
  },
  {
    key: "billing",
    label: "Billing",
    icon: PaymentsRoundedIcon,
    link: "/reader/payment",
    items: null,
  },

  {
    key: "support-creators",
    label: "Support Creators",
    icon: SupportRoundedIcon,
    link: "/reader/support-creators",
    items: null,
  },
];

export const StyledList = styled(List)({
  // selected and (selected + hover) states
  "&& .Mui-selected, && .Mui-selected:hover": {
    backgroundColor: "#00b8d4",
    fontWeight: "bolder",
    borderRadius: 5,
    margin: "0 10px",

    "&, & .MuiListItemIcon-root": {
      color: "white",
    },
  },
  // hover states
  "& .MuiListItemButton-root:hover": {
    backgroundColor: "silver",
    fontWeight: "bolder",
    borderRadius: 5,
    margin: " 0 10px",
    "&, & .MuiListItemIcon-root": {
      color: "white",
    },
  },
});
