import {
  Avatar,
  Group,
  Paper,
  Stack,
  Text,
  createStyles,
  Badge,
  Button,
  Box,
  Anchor,
  Image,
} from "@mantine/core";

import { FaBusinessTime, FaGraduationCap } from "react-icons/fa";
import { IoLanguage as FaLanguage, IoLocationSharp } from "react-icons/io5";
import { MdCastForEducation, MdVerified } from "react-icons/md";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import BookingModal from "../TutorProfile/BookingModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import MessageModal from "../TutorProfile/MessageModal";
import { HiAcademicCap } from "react-icons/hi";
import { GrValidate } from "react-icons/gr";

const useStyles = createStyles((t) => ({
  infoGroup: {
    color: t.colors.gray[6],
  },
  atSmall: {
    [t.fn.largerThan("md")]: {
      display: "none",
    },
  },
  atBig: {
    [t.fn.smallerThan("md")]: {
      display: "none",
    },
  },
}));

export default function TutorCard({ tutor }) {
  console.log(tutor);
  const { classes } = useStyles();
  const [opened, { close, open }] = useDisclosure();
  // const [messageOpened, messageModalHandlers] = useDisclosure();
  const [messageOpened, setMessageOpened] = useState(false);
  const [spoiler, setSpoiler] = useState(true);
  const isSmall = useMediaQuery("(max-width: 1000px)");
  return isSmall ? (
    <Paper shadow={"xs"} radius="sm" p={"md"}>
      <MessageModal
        tutor_id={tutor?.id}
        close={() => setMessageOpened(false)}
        opened={messageOpened}
      />
      <BookingModal tutor_id={tutor?.id} close={close} opened={opened} />

      <Stack    >
        <Group align={"start"} noWrap>
          <Avatar
            radius={"sm"}
            size={isSmall ? "xl" : "144px"}
            src={tutor?.profile_picture}
            component={Link} to={`/tutor/${tutor?.id}/`}
          />
          <Stack spacing={0}>
            <Group align={"center"} mb={"xs"} spacing={"xl"}>
              <Text
                to={`/tutor/${tutor?.id}/`}
                component={Link}
                size={"xl"}
                weight={"bold"}>
                {tutor?.fName} {tutor?.lName}
              </Text>
              <Group spacing={4}>
                <MdVerified size={22} color={"#00B628"} />
                <Text size={"sm"} weight={"700"} color={"#00B628"}>
                  Verified
                </Text>
              </Group>
            </Group>
            <Group mb={"xs"}>
              {tutor?.subjects.map((s) => (
                <Badge
                  key={s.id}
                  sx={{ color: "#3347B0" }}
                  size="xs"
                  color={"indigo"}>
                  {s.subject}
                </Badge>
              ))}
            </Group>
          </Stack>
        </Group>

        <Stack spacing={0}>
        <Group mt={"xs"} spacing={"4px"}>
                <HiAcademicCap />
                <Text size={"xs"} weight={"bold"}>
                  Curriculum:{" "} <span style={{color: '#3347b0'}}>

                  {tutor?.curriculum?.map((curriculum, i) => (
                    <span key={curriculum.id}>
                      {curriculum.curriculum}
                      {i + 1 != tutor.curriculum.length ? ", " : ""}{" "}
                    </span>
                  ))}
                  </span>
                </Text>
              </Group>
              <Group mt={"xs"} spacing={"4px"}>
                <GrValidate />

                <Text size={"xs"} weight={"bold"}>
                Years of Experience:{" "}{tutor?.years_of_experience}
                </Text>
              </Group>
              <Group mb={"xs"} mt={"xs"} spacing={"4px"}>
                <IoLocationSharp color="#3347b0" />

                <Text size={"xs"} weight={"bold"}>
                  {tutor?.location_name}
                </Text>
              </Group>
          
          
          <Box component="span">
 
            <Text
              sx={
                spoiler
                  ? {
                      height: "40px",
                      overflow: "hidden",
                    }
                  : { height: "auto" }
              }
              size={"xs"}
              weight={"bold"}>
              Profile Description:{" "}
              <Text weight={"500"} component="span" mt={"xs"} size={"xs"}>
                {tutor?.profile_description}
              </Text>
            </Text>
            <Anchor
              weight={"bold"}
              size={"xs"}
              component={Text}
              color="indigo"
              onClick={() => {
                spoiler ? setSpoiler(false) : setSpoiler(true);
              }}>
              {spoiler ? "Read more" : "Hide"}
            </Anchor>
          </Box>
          {/* <Group mt={"xs"} className={classes.infoGroup} spacing={"4px"}>
            <FaGraduationCap />
            <Text size={"xs"}>{tutor.email}</Text>
          </Group> */}

          
          <Stack mt={"xl"} className={classes.atSmall} spacing={"xs"}>
            <Button onClick={open} sx={{ background: "#3347B0" }}>
              Book trial lesson
            </Button>
            <Button
              color={"indigo"}
              variant="light"
              onClick={() => {
                setMessageOpened(true);
              }}>
              Message
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Stack className={classes.atBig} spacing={"xs"}>
        <Stack spacing={0} align="end">
          <Text color={"#666"} weight={"600"} size={"xl"}>
            {/* ${} */}
          </Text>
          <Text size={"xs"} color="dimmed">
            Per hour
          </Text>
        </Stack>
        <Button onClick={open} sx={{ background: "#3347B0" }}>
          Book trial lesson
        </Button>
        <Button
          color={"indigo"}
          variant="light"
          onClick={() => {
            setMessageOpened(true);
            // messageModalHandlers.open();
          }}>
          Message
        </Button>
      </Stack>
    </Paper>
  ) : (
    <Paper   shadow={"xs"} radius="sm" p={"md"}>
      <BookingModal tutor_id={tutor?.id} close={close} opened={opened} />
      <MessageModal
        tutor_id={tutor?.id}
        close={() => setMessageOpened(false)}
        opened={messageOpened}
      />

      <Group noWrap align={"start"} position="apart">
        <Group   noWrap align={"start"}>
          <Avatar
            radius={"sm"}
            size={isSmall ? "xl" : "170px"}
            src={tutor?.profile_picture}
            component={Link} to={`/tutor/${tutor?.id}/`}

          />

          <Stack spacing={0}>
            <Group
              align={"center"}
              position={isSmall && "apart"}
              mb={"xs"}
              spacing={"sm"}>
              <Text
                to={`/tutor/${tutor?.id}`}
                component={Link}
                size={isSmall ? "lg" : "xl"}
                weight={"bold"}>
                {tutor.fName} {tutor.lName}
              </Text>

              <Group spacing={4}>
                <MdVerified size={22} color={"#00B628"} />
                <Text size={"sm"} weight={"700"} color={"#00B628"}>
                  Verified
                </Text>
              </Group>
            </Group>
            <Group mb={"xs"}>
              {tutor?.subjects.map((s) => (
                <Badge
                  key={s.id}
                  sx={{ color: "#3347B0" }}
                  size="xs"
                  color={"indigo"}>
                  {s.subject}
                </Badge>
              ))}
            </Group>
 
            <Group mt={"xs"} spacing={"4px"}>
                <HiAcademicCap />
                <Text size={"xs"} weight={"bold"}>
                  Curriculum:{" "} <span style={{color: '#3347b0'}}>

                  {tutor?.curriculum?.map((curriculum, i) => (
                    <span key={curriculum.id}>
                      {curriculum.curriculum}
                      {i + 1 != tutor.curriculum.length ? ", " : ""}{" "}
                    </span>
                  ))}
                  </span>
                </Text>
              </Group>
              <Group mt={"xs"} spacing={"4px"}>
                <GrValidate />

                <Text size={"xs"} weight={"bold"}>
                Years of Experience:{" "}{tutor?.years_of_experience}
                </Text>
              </Group>
              <Group mb={"xs"} mt={"xs"} spacing={"4px"}>
                <IoLocationSharp color="#3347b0" />

                <Text size={"xs"} weight={"bold"}>
                  {tutor?.location_name}
                </Text>
              </Group>
            
            <Box  component="span" sx={{ maxWidth: 600 }}>
              <Text
                sx={
                  spoiler
                    ? {
                        height: "40px",
                        overflow: "hidden",
                      }
                    : { height: "auto" }
                }
                size={"xs"}
                weight={"bold"}>
                Profile Description:{" "}
                <Text weight={"500"} component="span" mt={"xs"} size={"xs"}>
                  {tutor.profile_description}
                </Text>
              </Text>
              <Anchor
                weight={"bold"}
                size={"xs"}
                component={Text}
                color="indigo"
                onClick={() => {
                  spoiler ? setSpoiler(false) : setSpoiler(true);
                }}>
                {spoiler ? "Read more" : "Hide"}
              </Anchor>
            </Box>

            <Stack mt={"xl"} className={classes.atSmall} spacing={"xs"}>
              <Button onClick={open} sx={{ background: "#3347B0" }}>
                Book trial lesson
              </Button>
              <Button
                color={"indigo"}
                variant="light"
                onClick={() => {
                  setMessageOpened(true);
                  // messageModalHandlers.open();
                }}>
                Message
              </Button>
            </Stack>
          </Stack>
        </Group>
        <Stack className={classes.atBig} spacing={"xs"}>
          <Stack spacing={0} align="end">
            <Text color={"#666"} weight={"600"} size={"xl"}>
              {/* ${hourly} */}
            </Text>
            <Text size={"xs"} color="dimmed">
              {/* Per hour */}
            </Text>
          </Stack>
          <Button size="md" onClick={open} sx={{ background: "#3347B0" }}>
            Book trial lesson
          </Button>
          <Button
            size="md"
            color={"indigo"}
            variant="light"
            onClick={() => {
              console.log("first");
              setMessageOpened(true);
            }}>
            Message
          </Button>
        </Stack>
      </Group>
    </Paper>
  );
}
