import { Box, createStyles, Text, Group, Stack } from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((t) => ({
  upper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 40px",

    [t.fn.smallerThan("sm")]: {
      flexFlow: "column",
      gap: "1rem",
    },
  },
  header: {
    background: "#3347B0",
    color: "white",

    padding: `48px ${t.spacing.xl}px`,
    [t.fn.smallerThan("sm")]: {
      padding: `48px ${t.spacing.sm}px`,
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
  navlink: {
    [t.fn.smallerThan("sm")]: {
      fontSize: t.fontSizes.md,
    },
    [t.fn.largerThan("sm")]: {
      fontSize: t.fontSizes.xl,
    },
  },
  copyright: {
    padding: "0px 40px",
    [t.fn.smallerThan("sm")]: {
      alignSelf: "center",
    },
  },
}));

export default function Footer() {
  const { classes } = useStyles();
  return (
    <Stack className={classes.header}>
      <Box className={classes.upper}>
        <Text
          className={classes.logo}
          to={"/"}
          component={Link}
          weight={"600"}
          size={"xl"}
        >
          Tutors street
        </Text>
        <Group spacing={64}>
          <Navlinks />
        </Group>
      </Box>
      <Text className={classes.copyright} size={"sm"}>
        © 2022 Tutors street. All rights reserved.
      </Text>
    </Stack>
  );
}
function Navlinks({ className }) {
  return (
    <Group className={className} spacing={"xl"}>
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
