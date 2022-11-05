import { Stack, Title, Text, Group, Avatar, Box } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";

export default function Testimonials() {
  const isSmall = useMediaQuery("(max-width: 1000px)");
  return (
    <Stack
      sx={{ background: "#3347B0", color: "white" }}
      px={isSmall ? "md" : "xl"}
      py={isSmall ? 30 : 60}
    >
      <div>
        <Text weight={500}
        style={{textAlign: "center"}}
        >TESTIMONIALS</Text>
        <Title
        style={{textAlign: "center"}}
        >What our Students Say</Title>
      </div>
      <Carousel
        mt={"48px"}
        slideSize={isSmall ? "100%" : "32%"}
        height={200}
        slideGap="md"
        controlsOffset="xs"
        slidesToScroll={isSmall ? 1 : 3}
        align="center"
        loop
      >
        {TESTEMONIALS.map((u, i) => (
          <Carousel.Slide key={i}>
            <UserCard {...u} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Stack>
  );
}

function UserCard({ image, name, text, occupation }) {
  return (
    <Box
      p={"md"}
      sx={{
        maxWidth: "400px",
        background: "white",
        color: "black",
        borderRadius: "5px",
        height: "200px",
      }}
    >
      <Group>
        <Avatar src={image} alt={name} radius="xl" />
        <div>
          <Text weight={600}>{name}</Text>
          <Text size="sm" color={"dimmed"}>
            {occupation}
          </Text>
        </div>
      </Group>
      <Text pl={54} pt="sm" size="sm">
        {text}
      </Text>
    </Box>
  );
}

const TESTEMONIALS = [
  {
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    text: "Great session dani was super helpful.she shared some practical advice on how to answer the question",
    occupation: "High school student",
    name: "Darlene Robertson",
  },
  {
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    text: "Great session dani was super helpful.she shared some practical advice on how to answer the question",
    occupation: "High school student",
    name: "Jhon Doe",
  },
  {
    image:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    text: "Great session dani was super helpful.she shared some practical advice on how to answer the question",
    occupation: "High school student",
    name: "Alex Suprun",
  },
];
