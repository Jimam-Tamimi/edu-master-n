// import { Box, Text, Title, Stack, Overlay, Button } from "@mantine/core";
// import { useMediaQuery } from "@mantine/hooks";

// import { Link } from "react-router-dom";

// export default function JoinUs() {
//   const isSmall = useMediaQuery("(max-width: 1000px)");
//   return (
//     <Box my={isSmall ? 30 : 60}>
//       <Stack px={isSmall ? "40px" : "80px"} spacing={0}>
//         <Text weight={500}>JOIN US</Text>
//         <Title>Become a tutor at tutors street</Title>
//       </Stack>
//       <Box
//         mt={isSmall ? 20 : 40}
//         p={isSmall ? "md" : "xl"}
//         sx={{
//           background: `url(${process.env.PUBLIC_URL}/images/jb.jpg)`,
//           backgroundPosition: `0 ${isSmall ? "0" : "-100px"}`,
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//           display: "flex",
//           height: isSmall ? "200px" : "500px",
//           justifyContent: "center",
//           alignItems: "center",
//           position: "relative",
//         }}
//       >
//         <Overlay opacity={0} zIndex={0} blur={3} />
//         <Button
//           to={"/tutor-signup"}
//           component={Link}
//           radius={"sm"}
//           sx={{
//             background: "#3347B0",
//             zIndex: "1",
//             "&:hover": {
//               background: "#4357C0",
//             },
//           }}
//           size={isSmall ? "lg" : "xl"}
//           m={0}
//         >
//           Get started
//         </Button>
//       </Box>
//     </Box>
//   );
// }

import { Accordion, Box, SimpleGrid, Text, Title, Button, Center } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";
export default function QnA() {
  const isSmall = useMediaQuery("(max-width: 1000px)");
  const isLil = useMediaQuery("(max-width: 600px)");
  return (
    <SimpleGrid mb={isSmall ? 30 : 60} cols={isSmall ? 1 : 2}
    style={{width: isLil ? "96%" : "80%", margin: isSmall ? "0 auto" : "140px auto"}}>
            <Box
        sx={
          isSmall
            ? {
              background: `url(/static/images/q.jpg)`,
              // backgroundPosition: "0 -250px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "390px",
            }
            : {
                display:"none",
              }
        }
      ></Box>
      
      <Box
        pr={isSmall ? "md" : 0}
        // pl={isSmall ? "40px" : "60px"}
        mb={isSmall ? 20 : 40}
        mt={isSmall ? 20 : 40
        }
        style={{height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", 
        alignItems: isLil ? "center" : "start"}}
      >
        <Title style={{textAlign: isLil ? "center" : "left"}}>Why learn with tutors street.</Title>
        <Text weight={500}
        style={{marginTop: "20px", textAlign: isLil ? "center" : "left"}}
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse 
        </Text>
        <Button  
        component={Link}
        to="/search/"
          radius={"sm"}
          sx={{
            background: "#3347B0",
            transition: 'all .2s ease-in-out',
            zIndex: "1",
            "&:hover": {
              transform: "scale(1.02)",
              background: "#2941b7",

            },
            color: "white",
          }}
          size={isSmall ? "lg" : "xl"}
          m={0}
          style={{
            width: "220px",
            marginTop: "20px"
          }}
        >
          Hire a tutor
        </Button>
      </Box>
      <Box
        sx={
          isSmall
            ? { display: "none", }
            : {
                background: `url(/static/images/q.jpg)`,
                // backgroundPosition: "0 -250px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "100%"
              }
        }
      ></Box>
    </SimpleGrid>
  );
}

const QNA = [
  {
    panel:
      "sed ut perspiciatis unde omnis iste natus error sit voluptatemaccusantium doloremque laudantium,totam aperiam,eaque ipsaquae ab illoinventatis et quasi architecto beatae vitae dicta sunt expilicabo nemo enim ipsam.",
    control: "How to find tutoring at tutors street?",
  },
  {
    panel:
      "sed ut perspiciatis unde omnis iste natus error sit voluptatemaccusantium doloremque laudantium,totam aperiam,eaque ipsaquae ab illoinventatis et quasi architecto beatae vitae dicta sunt expilicabo nemo enim ipsam.",
    control: "Tracking student progress",
  },
  {
    panel:
      "sed ut perspiciatis unde omnis iste natus error sit voluptatemaccusantium doloremque laudantium,totam aperiam,eaque ipsaquae ab illoinventatis et quasi architecto beatae vitae dicta sunt expilicabo nemo enim ipsam.",
    control: "How much do lessons cost?",
  },
  {
    panel:
      "sed ut perspiciatis unde omnis iste natus error sit voluptatemaccusantium doloremque laudantium,totam aperiam,eaque ipsaquae ab illoinventatis et quasi architecto beatae vitae dicta sunt expilicabo nemo enim ipsam.",
    control: "What payment methods are accepted ?",
  },
];

