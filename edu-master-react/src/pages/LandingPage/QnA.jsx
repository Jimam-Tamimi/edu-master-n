import { Accordion, Box, SimpleGrid, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function QnA() {
  const isSmall = useMediaQuery("(max-width: 1000px)");
  const isLil = useMediaQuery("(max-width: 600px)");
  return (
    <SimpleGrid mb={isSmall ? 30 : 60} cols={isSmall ? 1 : 2} 
    style={{width: isLil ? "96%" : "80%", margin: isSmall ? "0 auto" : "140px auto"}}
    >
      <Box
        sx={
          isSmall
            ? { 
              background: `url(/static/images/jj.jpg)`,
              // backgroundPosition: "0 -250px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "390px",
             }
            : {
                background: `url(/static/images/jj.jpg)`,
                // backgroundPosition: "0 -250px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "100%"
              }
        }
      ></Box>
      <Box
        pr={isSmall ? "md" : 0}
        pl={isSmall ? "40px" : "60px"}
        mb={isSmall ? 20 : 40}
        mt={isSmall ? 20 : 40}
      >
        <Text weight={500}>FREQUENTLY ASKED QUESTIONS</Text>
        <Title>Useful information</Title>

        <Accordion mt="xl">
          {QNA.map(({ panel, control }, i) => (
            <Accordion.Item key={i} value={control}>
              <Accordion.Control>{control}</Accordion.Control>
              <Accordion.Panel>{panel}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Box>
      
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
