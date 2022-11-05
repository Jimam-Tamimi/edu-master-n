import {
  Box,
  createStyles,
  Text,
  Button,
  Group,
  Burger,
  Drawer,
  NavLink,
  GlobalStyles,
} from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import ControlledComponent from "../../ControlledComponent";
import { useSelector, useDispatch } from 'react-redux'
import { logout } from "../../redux/auth/actions";
import { Global } from "@emotion/react";

const useStyles = createStyles((t) => ({
  header: {
    background: t.colors.brand[0],
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${t.spacing.sm}px ${t.spacing.xl}px`,
    [t.fn.smallerThan("sm")]: {
      padding: `${t.spacing.sm}px ${t.spacing.sm}px`,
    },
  },
  navlinks: {
    [t.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  burger: {
    [t.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  logo: {
    [t.fn.smallerThan("sm")]: {
      fontSize: t.fontSizes.md,
    },
    [t.fn.largerThan("sm")]: {
      fontSize: t.fontSizes.xl,
    },
  },
}));

export default function Header() {
  const { classes } = useStyles();
  const auth = useSelector(state => state.auth)
  const [isOpened, setOpened] = useState();
  const isSmall = useMediaQuery("(max-width: 1000px)");
  const dispatch = useDispatch()
  return (
    <Box className={classes.header}>
      <Text to={"/"} component={Link} weight={"600"} className={classes.logo}>
        Tutors street
      </Text>
      <Group spacing={32}>
        <Navlinks className={classes.navlinks} />

        {
          !auth.isAuthenticated ? (

            <Group className={classes.navlinks} spacing={isSmall ? "sm" : "xl"}>
              <Text
                size={isSmall ? "xs" : "sm"}
                weight={"600"}
                to={"/login"}
                component={Link}
              >
                Login
              </Text>
              <Button
                to={"/signup"}
                component={Link}
                radius={"sm"}
                variant="white"
                color={"dark"}
                size={isSmall ? "xs" : "sm"}
              >
                Register
              </Button>
            </Group>

          ) :
            <Group className={classes.navlinks} spacing={isSmall ? "sm" : "xl"}>
              <Text
                size={isSmall ? "xs" : "sm"}
                weight={"600"}
                to={"/login"}
                component={Link}
                onClick={() => dispatch(logout())}
              >
                Logout
              </Text>
            </Group>
        }
      </Group>
      <Burger
        size={"sm"}
        title="links"
        onClick={() => setOpened((o) => !o)}
        opened={isOpened}
        color="white"
        className={classes.burger}
      />
      <Drawer
        opened={isOpened}
        onClose={() => setOpened(false)}
        title={
          <Text size={"xl"} weight={"700"}>
            Menu
          </Text>
        }
        padding={"md"}
        position="right"
        size={"full"}
      >

{LINKS.map(({ label, link }, i) => (
          <NavLink
            sx={{ fontWeight: "500" }}
            key={i}
            onClick={() => {
              setOpened(false);
            }}
            label={label}
            component={Link}
            to={link}
          />
        ))}

        {
          !auth.isAuthenticated ? (
            <>
              <NavLink
                sx={{ fontWeight: "bold", color: "#3347B0" }}
                onClick={() => {
                  setOpened(false);
                }}
                label={"Register"}
                component={Link}
                to={"/signup"}
              />
              <NavLink
                sx={{ fontWeight: "bold" }}
                onClick={() => {
                  setOpened(false);
                }}
                label={"Login"}
                component={Link}
                to={"/login"}
                color="#3347B0"
              />
            </>
          ) : 
          <NavLink
          sx={{ fontWeight: "bold" }}
          onClick={(e) => {e.preventDefault(); dispatch(logout()); setOpened(false);}}
          label={"Logout"}
          component={Link}
          to={"/logout"}
          color="#3347B0"
        />

        }

      </Drawer>
    </Box>
  );
}

function Navlinks({ className }) {
  return (
    <Group className={className} spacing={40} sx={{ color: "white" }}>
      {LINKS.map(({ link, label }, i) => (
        <Text key={i} size={"sm"} to={link} component={Link}>
          {label}
        </Text>
      ))}
    </Group>
  );
}

const LINKS = [
  { label: "Home", link: "/" },
  { label: "About Us", link: "/about-us" },
  { label: "Become a Tutor", link: "/tutor-signup" },
];