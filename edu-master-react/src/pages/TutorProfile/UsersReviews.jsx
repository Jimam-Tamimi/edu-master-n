import { Carousel } from "@mantine/carousel";
import { Avatar, Box, Group, Text, ThemeIcon } from "@mantine/core";
import { FaStar } from "react-icons/fa";
import { useMediaQuery } from "@mantine/hooks";

export default function UsersReviews({ reviews = REVIEWS }) {
  const isSmall = useMediaQuery("(max-width: 1000px)");
  return (
    <Carousel
      slideSize={isSmall ? "100%" : "32%"}
      height={200}
      slideGap="md"
      controlsOffset="xs"
      slidesToScroll={isSmall ? 1 : 3}
      align="center"
      loop
    >
      {reviews.map((u, i) => (
        <Carousel.Slide key={i}>
          <UserCard {...u} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

function UserCard({ name, text, image, rating }) {
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
          <Group spacing={0}>
            {[1, 2, 3, 4, 5].map((i) =>
              i <= rating ? (
                <ThemeIcon key={i} variant="subtle" color={"yellow"}>
                  <FaStar />
                </ThemeIcon>
              ) : (
                <ThemeIcon key={i} variant="subtle" color={"gray"}>
                  <FaStar />
                </ThemeIcon>
              )
            )}
          </Group>
        </div>
      </Group>
      <Text pl={54} pt="sm" size="sm">
        {text}
      </Text>
    </Box>
  );
}

const REVIEWS = [
  {
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    text: "Great session dani was super helpful.she shared some practical advice on how to answer the question",
    rating: 5,
    name: "Darlene Robertson",
  },
  {
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    text: "Great session dani was super helpful.she shared some practical advice on how to answer the question",
    rating: 4,
    name: "Jhon Doe",
  },
  {
    image:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    text: "Great session dani was super helpful.she shared some practical advice on how to answer the question",
    rating: 3,
    name: "Alex Suprun",
  },
];
