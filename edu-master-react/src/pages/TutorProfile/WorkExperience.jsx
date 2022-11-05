import { Box, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";

export default function WorkExperience({ experience = EXPERIENCE }) {
  return (
    <Paper mt={"xl"} p={"md"}>
      <Title sx={{ fontWeight: 700, fontSize: 24 }}>Work experience</Title>
      <Stack spacing={48} mt={64}>
        {experience.map((e, i) => (
          <ExperienceCard {...e} key={i} />
        ))}
      </Stack>
    </Paper>
  );
}

function ExperienceCard({ year, body, location, role }) {
  const isSmall = useMediaQuery("(max-width: 1000px)");
  return (
    <Group
      noWrap={isSmall ? false : true}
      spacing={isSmall ? 18 : 64}
      align={"start"}
    >
      <Text sx={{ flexShrink: 0 }} weight={600} color={"#666"}>
        {year}
      </Text>
      <Box>
        <Text weight={600}>{location}</Text>
        <Text mt={4}>{role}</Text>
        <Text mt={"xs"} color="#666">
          {body}
        </Text>
      </Box>
    </Group>
  );
}

const EXPERIENCE = [
  {
    year: "2020 - 2022",
    location: "Cape Peninsula University of Technology",
    role: "English teacher",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In suscipit commodi ipsam quam, dolore velit aperiam hic fuga odit? Facere molestias, cumque iusto eligendi consequatur pariatur magni debitis omnis quos.",
  },
];
