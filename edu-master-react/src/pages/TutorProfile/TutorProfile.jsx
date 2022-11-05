import {
  Avatar,
  Badge,
  Box,
  Button,
  createStyles,
  Group,
  Stack,
  Text,
  Tabs,
  Title,
  Anchor,
  Paper,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaHeart, FaEnvelope } from "react-icons/fa";
import BookingModal from "./BookingModal";
import { useMediaQuery } from "@mantine/hooks";
import UsersReviews from "./UsersReviews";
import { useEffect, useState } from "react";
import { HiAcademicCap } from "react-icons/hi";
import { IoLanguage as FaLanguage, IoLocationSharp } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { GrValidate } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";
import About from "./About";
import Subjects from "./Subjects";
import WorkExperience from "./WorkExperience";
import Education from "./Education";
import MessageModal from "./MessageModal";
import axios from "axios";

const useStyles = createStyles((t) => ({
  wrapper: {
    marginBottom: 144,
    [t.fn.smallerThan("md")]: {
      marginBottom: 72,
    },
  },
  infoGroup: {
    color: t.colors.gray[6],
  },
  reviews: {
    background: "#3347B0",
  },
}));

export default function TutorProfile({
  name = "Lana Rock",
  job = "English teacher",
  hourly = 20,
  title = "Certified TEFL Tutor",
  subjects = ["English", "Danish"],
  description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In suscipit commodi ipsam quam, dolore velit aperiam hic fuga odit? Facere molestias, cumque iusto eligendi consequatur pariatur magni debitis omnis quos.",
  picture = "https://images.pexels.com/photos/943084/pexels-photo-943084.jpeg?auto=compress&cs=tinysrgb&w=600",
}) {
  const { classes } = useStyles();
  const [opened, { close, open }] = useDisclosure();
  const isSmall = useMediaQuery("(max-width: 1000px)");
  const isLil = useMediaQuery("(max-width: 600px)");
  const [spoiler, setSpoiler] = useState(true);
  const [messageOpened, messageModalHandlers] = useDisclosure();

  const [tutorData, setTutorData] = useState(null);
  const params = useParams();
  useEffect(() => {
    window.scroll(0, 0);
    async function run() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/tutors/${params.id}/`
        );
        setTutorData(res.data);
        console.log(res.data);
      } catch (error) {}
    }
    run();
  }, []);

  useEffect(() => {
    document.title = `${tutorData?.fName} ${tutorData?.lName} | Tutors Street`;
  }, [tutorData]);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return tutorData ? (
    <div style={{ maxWidth: "1310px", margin: "20px auto" }}>
      <Box mt="72px">
        <MessageModal
          tutor_id={tutorData?.id}
          close={messageModalHandlers.close}
          opened={messageOpened}
        />
        <BookingModal
          tutor_id={tutorData?.id}
          close={() => setBookingModalOpen(false)}
          opened={bookingModalOpen}
        />

        <Group
          mx={isSmall ? "md" : "72px"}
          noWrap
          align={"start"}
          position="apart"
          style={{ display: "flex", flexDirection: isLil ? "column" : "row" }}>
          <Group noWrap align={"start"}>
            <Avatar
              radius={"sm"}
              size={isSmall ? "xl" : "170px"}
              src={tutorData?.profile_picture}
            />

            <Stack spacing={0}>
              <Group
                align={"center"}
                position={isSmall && "apart"}
                mb={"xs"}
                spacing={"sm"}>
                <Text
                  component={"p"}
                  size={isSmall ? "lg" : "xl"}
                  weight={"bold"}>
                  {tutorData?.fName} {tutorData?.lName}
                </Text>

                <Group spacing={4}>
                  <MdVerified size={22} color={"#00B628"} />
                  <Text size={"sm"} weight={"700"} color={"#00B628"}>
                    Verified
                  </Text>
                </Group>
              </Group>
              <Group mb={"xs"}>
                {tutorData?.subjects?.map((s) => (
                  <Badge
                    key={s?.id}
                    sx={{ color: "#3347B0" }}
                    size="xs"
                    color={"indigo"}>
                    {s?.subject}
                  </Badge>
                ))}
              </Group>
              {/* <Box component="span" sx={{ maxWidth: 600 }}>
                <Text
                  sx={
                    spoiler
                      ? {
                          overflow: "hidden",
                        }
                      : { height: "auto" }
                  }
                  size={"xs"}
                  weight={"bold"}>
                  Curriculum:{" "}
                  <Text weight={"500"} component="span" mt={"xs"} size={"xs"}>
                    {tutorData?.curriculum?.map((curriculum, i) => (
                      <span key={curriculum.id}>
                        {curriculum.curriculum}
                        {i + 1 != tutorData.curriculum.length ? ", " : ""}{" "}
                      </span>
                    ))}
                  </Text>
                </Text>
                <Text
                  sx={
                    spoiler
                      ? {
                          overflow: "hidden",
                        }
                      : { height: "auto" }
                  }
                  size={"xs"}
                  weight={"bold"}>
                  Years of Experience:{" "}
                  <Text weight={"500"} component="span" mt={"xs"} size={"xs"}>
                    {tutorData?.years_of_experience}
                  </Text>
                </Text>
              </Box> */}
              <Group mt={"xs"} spacing={"4px"}>
                <HiAcademicCap />
                <Text size={"xs"} weight={"bold"}>
                  Curriculum:{" "} 
                  {tutorData?.curriculum?.map((curriculum, i) => (
                    <span style={{color: "#3347b0"}} key={curriculum.id}>
                      {curriculum.curriculum}
                      {i + 1 != tutorData.curriculum.length ? ", " : ""}{" "}
                    </span>
                  ))}
                </Text>
              </Group>
              <Group mt={"xs"} spacing={"4px"}>
                <GrValidate />

                <Text size={"xs"} weight={"bold"}>
                Years of Experience:{" "}{tutorData?.years_of_experience}
                </Text>
              </Group>
              <Group mt={"xs"} spacing={"4px"}>
                <IoLocationSharp color="#3347b0" />

                <Text size={"xs"} weight={"bold"}>
                  {tutorData?.location_name}
                </Text>
              </Group>

            </Stack>
          </Group>
          <Stack style={{ width: isLil ? "100%" : "auto" }} spacing={"xs"}>
            {/* <Stack spacing={0} align="end">
            <Text color={"#666"} weight={"600"} size={"28px"}>
              ${hourly}
            </Text>
            <Text size={"xs"} color="dimmed">
              Per hour
            </Text>
          </Stack> */}
            <Button
              size={isLil ? "sm" : "md"}
              onClick={() => setBookingModalOpen(true)}
              sx={{ background: "#3347B0" }}>
              Book trial lesson
            </Button>
            <Button
              leftIcon={<FaEnvelope />}
              size={isLil ? "sm" : "md"}
              color={"indigo"}
              variant="light"
              onClick={() => {
                messageModalHandlers.open();
              }}>
              Message
            </Button>
          </Stack>
        </Group>

        <Tabs
          styles={{
            tabsList: {
              border: "none",
              margin: isSmall ? "48px 12px" : "72px",
            },
            panel: {
              boxShadow: "0px 0px 9px 1px #00000012",
              padding: `48px ${isSmall ? "12px" : "72px"}`,
            },
            tab: {
              fontWeight: "bold",
              color: "#666",
              "&:hover": { background: "none", border: "none" },
              "&[data-active]": {
                borderColor: "#3347B0",
                color: "#666",
                "&:hover": {
                  background: "none",

                  borderBottom: "2px solid #3347B0",
                },
              },
            },
          }}
          mt={72}
          defaultValue="about">
          <Tabs.List>
            <Tabs.Tab value="about">About</Tabs.Tab>
            <Tabs.Tab value="education">Education</Tabs.Tab>
            {/* <Tabs.Tab value="work experience">Work experience</Tabs.Tab> */}
            <Tabs.Tab value="subjects">Subjects</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="about" pt="xs">
            <About body={description} tutorData={tutorData} />
          </Tabs.Panel>

          <Tabs.Panel value="education" pt="xs">
            <Education degrees={tutorData?.degrees} />
          </Tabs.Panel>

          {/* <Tabs.Panel value="work experience" pt="xs">
          <WorkExperience />
        </Tabs.Panel> */}
          <Tabs.Panel value="subjects" pt="xs">
            <Subjects tutorData={tutorData} />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </div>
  ) : (
    ""
  );
}
