import { Text, Stack, Title, Overlay, createStyles, Box } from "@mantine/core";
import { useElementSize, useMediaQuery } from "@mantine/hooks";
import SearchBox from "./SearchBox";

const useStyles = createStyles((t) => ({
  container: {
    padding: `${60}px ${t.spacing.xl}px ${60}px ${t.spacing.xl}px`,
    [t.fn.smallerThan("sm")]: {
      padding: `${42}px ${t.spacing.sm}px`,
    },
    background: `url(/static/images/tb.jpg)`,
    backgroundPosition: "center 30%",
    // backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    [t.fn.smallerThan("xs")]: {
      backgroundPositionX: "-640px",
      backgroundPositionY: "0",
    },
  },
}));

export default function Hero() {
  const { ref, width } = useElementSize();
  const { classes } = useStyles();
  const isSmall = useMediaQuery("(max-width: 1000px)");
  const isLil = useMediaQuery("(max-width: 600px)");

  
  
  return (
    <Stack className={classes.container} style={{color: isLil ? "white" : "black", paddingTop: isLil ? "35px" : ""}}>
      <Overlay
        zIndex={0}
        opacity="0.5"
        gradient="linear-gradient(0deg, rgba(0,0,0,1) 0%,  rgba(255,255,255,0) 35%);"
        
      />
      <Title
        ref={ref}
        sx={{
          fontSize: isSmall ? 36 : 60,
          maxWidth: isSmall ? 1000 : 750,
          fontWeight: "900",
          zIndex: 1,
          
        }}
        order={1}
        style={{
          paddingLeft: isLil ? "20px" : "80px", 
        }}
      >
        Hire the best tutors for you
      </Title>
      <Text
        sx={{ width: width, zIndex: 1 }}
        weight={500}
        size={isSmall ? "md" : "xl"}
        style={{
          paddingLeft: isLil ? "20px" : "80px", 
        }}
      >
        Part of you personal and professional growth by providing a fun and
        effective way to learn.{" "}
      </Text>

      <SearchBox 
      />
      <Box
        px={isSmall ? 0 : "96px"}
        sx={{
          color: "white",
          zIndex: 1,
          display: "flex",
          flexFlow: isLil ? "column" : "row",
          justifyContent: isSmall ? "center" : "space-between",
          alignItems: "center",
          gap: isSmall ? 36 : 0,
        }}
        mt={isSmall ? 20 : 40}      >
        <Stack sx={{ textAlign: "center" }} spacing={0}>
          <Text weight={800} size={isSmall ? 28 : 32}>
            2 Years
          </Text>
          <Text weight={600} size={isSmall ? "md" : "xl"}>
            of proven results
          </Text>
        </Stack>
        <Stack sx={{ textAlign: "center" }} spacing={0}>
          <Text weight={800} size={isSmall ? 28 : 32}>
            50+ Top
          </Text>
          <Text weight={600} size={isSmall ? "md" : "xl"}>
            Handpicked Tutors
          </Text>
        </Stack>
        <Stack sx={{ textAlign: "center" }} spacing={0}>
          <Text weight={800} size={isSmall ? 28 : 32}>
            50+ Students
          </Text>
          <Text weight={600} size={isSmall ? "md" : "xl"}>
            Tutored since 2022
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
}
