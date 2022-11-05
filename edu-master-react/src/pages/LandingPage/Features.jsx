import {
  Stack,
  Text,
  Title,
  Group,
  ThemeIcon,
  SimpleGrid,
  Box,
  Button,
  Overlay,
  Center,
} from "@mantine/core";
import { FaAward, FaDollarSign, FaHeadset, FaLayerGroup } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import MessageModal from "./MessageModalHero";
import { useState } from "react";

export default function Features() {
  const isSmall = useMediaQuery("(max-width: 1000px)");
  const isLil = useMediaQuery("(max-width: 600px)");


  const [messageModal, setMessageModal] = useState(false)
  
  
  return (
    <>
    <MessageModal close={e => setMessageModal(false)} opened={messageModal} />

    
    <Stack
      sx={{ background: "#cae2ff" }}
      spacing={"xl"}
      // py={isSmall ? 30 : 60}
      // px={isSmall ? 30 : 60}
    >
      <Stack px={isSmall ? "md" : "xl"} spacing={0} style={{textAlign: "center", paddingTop:"60px"}}>
        <Text weight={500}>WHY CHOOSE US</Text>
        <Title>Why learn with tutors street.</Title>
      </Stack>
      <SimpleGrid
        px={isSmall ? "md" : "xl"}
        mt={36}
        spacing={isSmall ? 32 : 64}
        cols={isSmall ? 1 : 2}
        style={{width: isSmall ? "96%" : "80%", margin: "auto", marginTop: "40px"}}
      >
        {FEATURES.map((f, i) => (
          <Feature {...f} key={i} />
        ))}
      </SimpleGrid>
      <Box
        mt={isSmall ? 30 : 60}
        p={"xl"}
        sx={{
          background: `url(/static/images/fb.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",

          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        
        
        <Stack px={isSmall ? "md" : "xl"} spacing={0} style={{textAlign: "center", paddingTop: isSmall ? "60px" : "160px", 
        paddingBottom: isSmall ? "60px" : "160px", zIndex: "1", color: "white", display: "flex", 
        flexDirection: "column", gap: "40px", width: isLil ? "96%" : "80%"}}>
        <Title>Why learn with tutors street.</Title>
        <Text weight={500}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
        </Text>
        <Button  
        onClick={e => setMessageModal(true)}
          radius={"sm"}
          sx={{
            background: "#cae2ff",
            zIndex: "1",
            transition: 'all .2s ease-in-out',
            "&:hover": {
              background: "#9fcaff",
              transform: "scale(1.02)"
            },
            color: "black",
          }}
          
          size={isSmall ? "lg" : "xl"}
          m={0}
          style={{
            width: "285px",
            display: "block",
            margin: "auto"
          }}
        >
          Post Your Requirement
        </Button>
      </Stack>
        
      </Box>
    </Stack>
    </>

  );
}

function Feature({ Icon, title, text }) {
  const isSmall = useMediaQuery("(max-width: 1000px)");
  return (
    <Group align={"start"} noWrap>
      <ThemeIcon
        sx={{ color: "#66FBD1" }}
        color={"#000"}
        radius={"50%"}
        size={isSmall ? 48 : 64}
      >
        <Icon size={isSmall ? 24 : 32} />
      </ThemeIcon>
      <Stack spacing={0}>
        <Text size={isSmall ? 22 : 26} weight={500}>
          {title}
        </Text>
        <Text>{text}</Text>
      </Stack>
    </Group>
  );
}

const FEATURES = [
  {
    title: "Certified tutors",
    text: "Sed ut perspiciateis unde omnis iste natus error sit",
    Icon: FaAward,
  },
  {
    title: "Affordable price",
    text: "Sed ut perspiciateis unde omnis iste natus error sit",
    Icon: FaDollarSign,
  },
  {
    title: "Personalized Learning",
    text: "Sed ut perspiciateis unde omnis iste natus error sit",
    Icon: FaLayerGroup,
  },
  {
    title: "Personalized Support",
    text: "Sed ut perspiciateis unde omnis iste natus error sit",
    Icon: FaHeadset,
  },
];
