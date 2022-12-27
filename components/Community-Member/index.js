import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  List,
  CssBaseline,
  Divider,
  IconButton,
  Collapse,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Drawer,
  DrawerHeader,
  BootstrapTooltip,
  lists,
  StyledList,
} from "../../utils/CommunityMember.utils";
import { useDrawerContext } from "../../context/drawer.context";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuBar from "./menubar";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

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

function CommunityMember({ children }) {
  const theme = useTheme();
  const { drawerOpen, handleDrawer } = useDrawerContext();
  const { listOpen, handleListOpen } = useDrawerContext();

  const router = useRouter();

  // useEffect(() => {
  //   if (!authUserInfo) {
  //     navigate("/login");
  //   }
  // }, [authUserInfo, navigate]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <MenuBar />

      {/* <Router> */}
      <Drawer variant="permanent" open={drawerOpen}>
        <DrawerHeader>
          <IconButton onClick={() => handleDrawer(!drawerOpen)}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider sx={{ my: "2rem" }} />

        {/* Lists */}

        <StyledList>
          {lists.map(({ key, label, icon: Icon, items, link }) => {
            return (
              <div key={key}>
                {items !== null ? (
                  <div key={key}>
                    <BootstrapTooltip title={label} placement="right">
                      <ListItemButton
                        onClick={() =>
                          handleListOpen((prevState) => ({
                            ...prevState,
                            [key]: !prevState[key],
                          }))
                        }
                      >
                        <ListItemIcon>
                          <Icon />
                        </ListItemIcon>
                        <ListItemText primary={label} />
                        {listOpen[key] ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                    </BootstrapTooltip>
                    <Collapse in={listOpen[key]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {items.map(
                          ({
                            key: childKey,
                            label: childLabel,
                            icon: ChildIcon,
                            link: childLink,
                          }) => (
                            <BootstrapTooltip
                              title={childLabel}
                              placement="right"
                              key={childKey}
                            >
                              <ListItemButton
                                key={childKey}
                                selected={router.pathname === childLink}
                                onClick={() => router.push(childLink)}
                              >
                                <ListItemIcon>
                                  <ChildIcon />
                                </ListItemIcon>
                                <ListItemText primary={childLabel} />
                              </ListItemButton>
                            </BootstrapTooltip>
                          )
                        )}
                      </List>
                    </Collapse>
                  </div>
                ) : (
                  <BootstrapTooltip title={label} placement="right">
                    <ListItemButton
                      onClick={() => router.push(link)}
                      key={key}
                      selected={router.pathname === link}
                    >
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText primary={label} />
                    </ListItemButton>
                  </BootstrapTooltip>
                )}
              </div>
            );
          })}
        </StyledList>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 8 }}>
        <DrawerHeader />
        {children}
      </Box>
      {/* </Router> */}
    </Box>
  );
}

export default CommunityMember;
