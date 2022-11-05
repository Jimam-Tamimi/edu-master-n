import { Box, Group, Paper, Stack, Tabs, Text, Title } from "@mantine/core";
import React, { useState } from "react";

export default function Subjects({ subjects = SUBJECTS, tutorData }) {
  const [activeSubject, setActiveSubject] = useState(subjects[0].subject);
  let cur = [];
  subjects.forEach(({ curriculum, subject }) => {
    if (subject === activeSubject)
      cur = curriculum.map((c, i) => <SubjectCard {...c} key={i} />);
  });
  return (
    <Paper mt={"xl"} py={"xl"}>
      <Group px={"xl"}>
        <Title sx={{ fontWeight: 700, fontSize: 24 }}>Subjects</Title>
        <Tabs
          styles={{
            tabsList: {
              border: "none",
            },
            panel: {
              background: "#f3f3f3",
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
          value={activeSubject}>
          <Tabs.List>
            <div class="mantine-Tabs-root mantine-Group-child mantine-1inmq7b">
              <div
                class="mantine-Tabs-tabsList mantine-p8skor"
                role="tablist"
                aria-orientation="horizontal">


                {
                  tutorData?.subjects?.map((sub, i) => (
                <button
                  key={i}
                  class="mantine-UnstyledButton-root mantine-Tabs-tab mantine-1tmuzun"
                  type="button"
                  // data-active="true"
                  role="tab"
                  id="mantine-r7-tab-English"
                  // aria-selected="true"
                  tabindex="0"
                  aria-controls="mantine-r7-panel-English">
                  <div class="mantine-1s8spa1 mantine-Tabs-tabLabel">
                  {sub.subject}
                  </div>
                </button>

                  ))
                }

                  
 
              </div>
            </div>
          </Tabs.List>
          {/* 

{subjects.map(({ subject }, i) => (
  <Tabs.Tab
                key={i}
                onClick={() => {
                  setActiveSubject(subject);
                }}
                value={subject}
                >
                {subject}
                </Tabs.Tab>
                ))}
               */}
        </Tabs>
      </Group>
      {/* <Stack mt={48}>{cur}</Stack> */}
    </Paper>
  );
}

function SubjectCard({ title, body }) {
  return (
    <Box sx={{ borderTop: "1px solid #ccc", color: "#666" }} p="xl">
      <Text size={"lg"} weight={600}>
        {title}
      </Text>
      <Text>{body}</Text>
    </Box>
  );
}

const SUBJECTS = [
  {
    subject: "English",
    curriculum: [
      {
        title: "Conversational English",
        body: "My company had their own teaching materials and students got to choose whether they’d like a ‘free-talk’ lesson. The student could choose a topic to discuss.",
      },
      {
        title: "IELTS",
        body: "I would evaluate my students English by testing what they have learned through having them speak more often.",
      },
      {
        title: "English for beginners",
        body: "My previous company had their own lesson materials and students/parents chose what lessonsthey wanted.",
      },
      {
        title: "English for kids",
        body: "My previous company had a platform that helped teachers make lessons more fun and creative for younger students. The platform had videos and music to help students stay attentive.",
      },
      {
        title: "English for traveling",
        body: "I had many students who wanted to travel and go study abroad, who mainly wanted to enhance their English for traveling.",
      },
      {
        title: "English job interview prep",
        body: "I had many students who wanted to travel and go study abroad, who mainly wanted to enhance their English for traveling.",
      },
      {
        title: "English for children",
        body: "I have experience teaching students of all ages. I have had intermediate - advanced at all levels.",
      },
    ],
  },
  { subject: "Danish", curriculum: [] },
];
