import { Paper, Text, Title } from "@mantine/core";

export default function About({ tutorData }) {
  return (
    <Paper mt={"xl"} p={"md"}>
      <Title sx={{ fontWeight: 700, fontSize: 24 }}>About</Title>
      <Text weight={600} mt={"xl"} color={"#666"}>
        {tutorData?.profile_description}
      </Text>
      

{/*       
      <Text weight={600}  color={"#666"}>
      First Name: <b>{tutorData?.fName}</b>
      </Text>

      
      <Text weight={600}  color={"#666"}>
      Last Name: <b>{tutorData?.lName}</b>
      </Text>
      
      <Text weight={600}  color={"#666"}>
      Gender: <b>{tutorData?.gender}</b>

      </Text>
      
      <Text weight={600}  color={"#666"}>
        Email: <b>{tutorData?.email}</b>
      </Text>
      
      <Text weight={600}  color={"#666"}>
      Subjects:{" "}
                  <b>
                    {tutorData?.subjects?.map((sub) => (
                      <span key={sub.id}>{sub?.subject}, </span>
                    ))}
                  </b>
      </Text>
      
      <Text weight={600}  color={"#666"}>

      Curriculum:{" "}
                  <b>
                    {tutorData?.curriculum?.map((curriculum) => (
                      <span key={curriculum.id}>{curriculum.curriculum}, </span>
                    ))}
                  </b>
      </Text>
      
      <Text weight={600}  color={"#666"}>
                  Years of Experience: <b>{tutorData?.years_of_experience}</b>
      </Text>
       */}
 
    </Paper>
  );
}
