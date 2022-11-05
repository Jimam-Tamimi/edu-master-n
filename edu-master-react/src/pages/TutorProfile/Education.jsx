import { Title, Paper, Text, Group, Stack, Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { MdVerified } from "react-icons/md";
import Moment from "react-moment";

export default function Education({ degrees }) {
  return (
    <Paper mt={"xl"} p={"md"}>
      <Title sx={{ fontWeight: 700, fontSize: 24 }}>Education</Title>
      <Stack spacing={48} mt={64}>
        {degrees?.map((d, i) => (
          <EducationCard degree={d} key={i} />
        ))}
      </Stack>
    </Paper>
  );
}

function EducationCard({ degree}) {
  const isSmall = useMediaQuery("(max-width: 1000px)");
  return (
    <Group spacing={isSmall ? 18 : 64} align={"start"}>
      <Text weight={600} color={"#666"}>
        {/* {degree?.start_year} - {degree?.end_year} */}

        <Moment format="YYYY">
          {degree?.start_years}
        </Moment>
        {" "}
        -
        {" "}
        <Moment format="YYYY">
          {degree?.end_year}
        </Moment>

        
      </Text>
      <Box>
        <Text weight={600}>{degree?.university_name}</Text>
        <Text mt={4}>{degree?.university_name}</Text>
        <Group mt={"md"} spacing={4}>
            <MdVerified size={22} color={"#00B628"} />
            <Text size={"sm"} weight={"700"} color={"#00B628"}>
              Diploma verified
            </Text>
          </Group>
 
        
      </Box>
    </Group>
  );
}

const EDUCATION = [
  {
    year: "2018 - 2019",
    location: "Cape Peninsula University of Technology",
    field: "Business Management",
    isVerified: true,
  },
  {
    year: "2018 - 2019",
    location: "Cape Peninsula University of Technology",
    field: "Business Management",
    isVerified: false,
  },
];
