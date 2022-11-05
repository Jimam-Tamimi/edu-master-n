import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Group,
  Button,
  Stepper,
  Select,
  Textarea,
  MultiSelect,
  Input,
  useMantineTheme,
  Text,
  Slider,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";

import { Dropzone } from "@mantine/dropzone";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaUpload as IconUpload,
  FaFileImage as IconPhoto,
  FaBan as FaStopCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Autocomplete as AC } from "@react-google-maps/api";
import {
  FaMapMarkerAlt,
} from "react-icons/fa";
import {useDispatch} from 'react-redux'
import { addNotification } from "../../redux/notification/actions";

export default function TutorSignup() {
  const [showForm, setShowForm] = useState(1)

  // form data

  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    gender: "",
    email: "",
    profile_description: "",
    subjects: [],
    curriculum: [],
    degrees: [
      {
        degree_name_1: "",
        university_name_1: "",
        start_year_1: null,
        end_year_1: null,
        certificate_1: null,
      },
    ],
    years_of_experience: 0,
    location: null,
    location_name: "",
    profile_picture: null,
  });
  const dispatch = useDispatch()
  const {
    fName,
    lName,
    gender,
    email,
    profile_description,
    subjects,
    curriculum,
    degrees,
    years_of_experience,
    location,
    location_name,
    profile_picture,
  } = formData;
  const onFormDataChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  const tutorSignUp = async () => {
    let allDegrees = document.getElementsByClassName("degrees");
    let degIds = [];

    for (let i = 0; i < Array.from(allDegrees).length; i++) {
      const deg = Array.from(allDegrees)[i];
      let start_year = new Date(
        document.getElementById(`start_year_${i}`).value
      );
      let end_year = new Date(document.getElementById(`end_year_${i}`).value);
      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        let formData = new FormData();
        formData.append(
          "degree_name",
          document.getElementById(`degree_name_${i}`).value
        );
        formData.append(
          "university_name",
          document.getElementById(`university_name_${i}`).value
        );
        formData.append("start_year", start_year.toISOString().split("T")[0]);
        formData.append("end_year", end_year.toISOString().split("T")[0]);
        formData.append("certificate", window[`certificate_${i}`][0]);
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}api/degrees/`,
          formData,
          config
        );
        degIds.push(res.data.id);
      } catch (error) {
        console.log(error.response);
      }
    }

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      let formData = new FormData();
      formData.append("fName", fName);
      formData.append("lName", lName);
      formData.append("gender", gender);
      formData.append("email", email);
      formData.append("profile_description", profile_description);
      formData.append(
        "subjects",
        allOptionSubjects
          .map((sub) => (subjects.includes(sub.subject) ? sub.id : ""))
          .filter((id) => id != "")
      );
      formData.append(
        "curriculum",
        allOptionCurriculum
          .map((sub) => (curriculum.includes(sub.curriculum) ? sub.id : ""))
          .filter((id) => id != "")
      );
      formData.append("years_of_experience", years_of_experience);
      formData.append("location", JSON.stringify(location));
      formData.append("location_name", location_name);
      formData.append("profile_picture", profile_picture);
      formData.append("degrees", JSON.stringify(degIds));
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/tutors/`,
        formData,
        config
      );
      if (res.status == 201) {

      dispatch(addNotification(`Your profile has been successfully submitted. We will email you once your profile is verified.`,));
        
        navigate("/");
      }
    } catch (error) { 
      dispatch(addNotification(error?.response?.data?.error, "error"));


    }
  };

  const [allOptionSubjects, setAllOptionSubjects] = useState([]);
  const [allOptionCurriculum, setAllOptionCurriculum] = useState([]);

  useEffect(() => {
    document.title = "Tutor Sign Up | Tutors Street"
    async function run() {
      try {
        let res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/subject/`,
          formData
        );
        setAllOptionSubjects(res.data);
        res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/curriculum/`,
          formData
        );
        setAllOptionCurriculum(res.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    run();
  }, []);




  const [autoComplete, setAutoComplete] = useState(null);
  const onPlaceChanged = () => {
    try {
      const lat = autoComplete.getPlace().geometry.location.lat();
      const lng = autoComplete.getPlace().geometry.location.lng();
      console.log(autoComplete.getPlace()?.name);
      setFormData({...formData, location: {lat: lat, lng: lng}, location_name: autoComplete?.getPlace()?.name});
    } catch {}
  };
  
  
  
  
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          tutorSignUp();
        }}>
        <Container size={"sm"} my={72}>
          <Title align="center" weigth="700">
            Become a tutor
          </Title>
          <div
            mt={48}
            style={{ flexDirection: "column", alignItems: "stretch" }}
            styles={{
              stepIcon: {
                borderColor: "#3347B0",
                "&[data-completed]": {
                  background: "#3347B0",
                  borderColor: "#3347B0",
                },
                "&[data-progress]": {
                  borderColor: "#3347B0",
                },
              },
              separatorActive: { background: "#3347B0" },
            }}
            breakpoint="xs">
            <Paper style={  {display: showForm !==1 ?`none`: 'block'}} withBorder shadow="md" p={30} mt={30} radius="md">
              <Text mb={48} mt={"xl"} align="center" weight={"600"} size="26px">
                Create an account
              </Text>
              <Group mt="md" grow>
                <TextInput
                  type={"text"}
                  label="First name"
                  placeholder="First Name"
                  required
                  name="fName"
                  value={fName}
                  onChange={onFormDataChange}
                />
                <TextInput
                  type={"text"}
                  label="Last name"
                  placeholder="Last Name"
                  required
                  name="lName"
                  value={lName}
                  onChange={onFormDataChange}
                />
              </Group>
              <Select
                mt="md"
                color="indigo"
                styles={{
                  item: { "&[data-selected]": { background: "#3347B0" } },
                }}
                placeholder="Select your gender"
                label="Gender"
                required
                data={["Male", "Female"]}
                name="gender"
                value={gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e })
                }></Select>
              <TextInput
                mt="md"
                type={"email"}
                label="Email"
                placeholder="you@example.com"
                required
                name="email"
                value={email}
                onChange={onFormDataChange}
              />

              <Textarea
                mt="md"
                label="Profile description"
                placeholder="Write something about you"
                required
                minRows={4}
                name="profile_description"
                value={profile_description}
                onChange={onFormDataChange}
              />
              <MultiSelect
                required
                label={"Subjects"}
                data={allOptionSubjects.map((sub) => sub.subject)}
                searchable
                mt={"md"}
                placeholder="Subjects"
                name="fName"
                value={subjects}
                onChange={(e) => setFormData({ ...formData, subjects: e })}
                // onChange={e => console.log(e)}
              />
              <MultiSelect
                required
                label={"Curriculum"}
                data={allOptionCurriculum.map((sub) => sub.curriculum)}
                searchable
                mt={"md"}
                placeholder="Curriculum"
                name="curriculum"
                value={curriculum}
                onChange={(e) => setFormData({ ...formData, curriculum: e })}
              />

              {/* <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
              />
              <PasswordInput
                label="Password Confirmations"
                placeholder="Your password confirmation"
                required
                mt="md"
              /> */}
              {/* <Group position="center" mt="xl">
                <Button variant="default" onClick={prevStep}>
                  Back
                </Button>
                <Button
                  sx={{ background: "#3347B0" }}
                  color={"indigo"}
                  onClick={nextStep}>
                  Next step
                </Button>
              </Group> */}

<Group position="center" mt="xl">
                {/* <Button variant="default" onClick={e => setShowForm(prevState => prevState-1)}> */}
                  {/* Back */}
                {/* </Button> */}
                <Button
                  sx={{ background: "#3347B0" }}
                  color={"indigo"}
                  onClick={e => {
                    if(fName && lName && gender && email, profile_description && subjects.length && curriculum.length){
                      setShowForm(prevState => prevState + 1)
                    } else {
                        toast.error("Please fill all required fields!!",)
                    }
                  }
                  } 
                  >
                  Next
                </Button>
              </Group>
              
            </Paper>

            <Paper  style={  {display: showForm !==2 ?`none`: 'block'}} withBorder shadow="md" p={30} mt={30} radius="md">
              <Text mb={48} mt={"xl"} align="center" weight={"600"} size="26px">
                Add Degrees/Credentials
              </Text>

              {degrees.map((degree, i) => (
                <div key={i} className="degrees">
                  <Title
                    style={{ textAlign: "center", marginTop: "18px" }}
                    order={3}>
                    Degree {i + 1}
                  </Title>

                  <TextInput
                    mt="md"
                    type={"text"}
                    label="Degree Name"
                    placeholder="Degree Name"
                    required
                    id={`degree_name_${i}`}
                    maxLength={80}

                  />
                  <TextInput
                    mt="md"
                    type={"text"}
                    label="University Name"
                    placeholder="University Name"
                    required
                    id={`university_name_${i}`}
                    maxLength={80}

                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: "10px 0 ",
                    }}>
                    <DatePicker
                      style={{ width: "49%" }}
                      placeholder="Start"
                      label="Start"
                      withAsterisk
                      id={`start_year_${i}`}
                      required
                    />
                    <DatePicker
                      style={{ width: "49%" }}
                      placeholder="End"
                      label="End"
                      withAsterisk
                      id={`end_year_${i}`}
                      required
                    />
                  </div>
                  {/* <input type="hidden" name={`certificate_image_${i}`} id={`certificate_image_${i}`}  /> */}
                  <Input.Wrapper
                    required
                    label="Certificate document"
                    mt={"md"}>
                    <InputImage
                    imgIndex={i}
                      onDrop={(files) => {
                        window[`certificate_${i}`] = files;
                        document.getElementById(`file-${i}`).innerHTML =
                          files[0].path;
                      }}
                    />
                  </Input.Wrapper>
                </div>
              ))}

              <div
                style={{
                  textAlign: "center",
                  color: "#004eff",
                  margin: "20px 0px",
                }}>
                <p
                  onClick={(e) =>
                    setFormData({ ...formData, degrees: [...degrees, {}] })
                  }
                  id="add-degree">
                  Add An Other Degree
                </p>
              </div>

              <Input.Wrapper mt={"md"} required label="Years of Experience">
                <Slider
                  max={40}
                  min={0}
                  required
                  mt={"md"}
                  placeholder="Experience"
                  value={years_of_experience}
                  onChange={(v) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      years_of_experience: v,
                    }))
                  }
                  marks={[
                    { value: 20, label: "20" },
                    { value: 40, label: "40" },
                    { value: 30, label: "30" },
                    { value: 10, label: "10" },
                    { value: 0, label: "0" },
                  ]}
                  styles={{
                    bar: { background: "#3347B0" },
                    thumb: { borderColor: "#3347B0" },
                    markFilled: { borderColor: "#3347B0" },
                  }}
                />
              </Input.Wrapper>

              {/* <Select
                required
                label={"Location"}
                data={["Math", "Physics", "Biologie"]}
                searchable
                mt={"md"}
                placeholder="Location"
                rightSection={<></>}
                styles={{ rightSection: { pointerEvents: "none" } }}
              /> */}

              
        <AC
          className="location-input"
          onLoad={(autoC) => setAutoComplete(autoC)}
          onPlaceChanged={onPlaceChanged}
          
          
          >
          <>
            <Input
              // icon={<IconAt />}
              placeholder="Your Location"
               
              p={0}
              // variant="unstyled"
              radius={0}
              // icon={<FaMapMarkerAlt size={isSmall ? 16 : 24} />}
              icon={<FaMapMarkerAlt  />}
              size={"md"}
              required
              label={"Location"}
              searchable
              mt={"md"}
              rightSection={<></>}
              styles={{ rightSection: { pointerEvents: "none" } }}
          style={{marginTop: '32px'}}

            />
          </>
        </AC>
              {/* <Group position="center" mt="xl">
                <Button variant="default" onClick={prevStep}>
                  Back
                </Button>
                <Button
                  sx={{ background: "#3347B0" }}
                  color={"indigo"}
                  onClick={nextStep}>
                  Next step
                </Button>
              </Group> */}

              <Group position="center" mt="xl">
                <Button variant="default" onClick={e => setShowForm(prevState => prevState-1)}>
                  Back
                </Button>
                <Button
                  sx={{ background: "#3347B0" }}
                  color={"indigo"}
                  onClick={e =>{
                    if(years_of_experience && location && document.getElementById(`end_year_0`).value && document.getElementById(`start_year_0`).value && document.getElementById(`degree_name_0`).value && document.getElementById(`university_name_0`).value &&  window[`certificate_${0}`]){
                      setShowForm(prevState => prevState + 1)
                    } else {
                      toast.error("Please fill all required fields!!",)

                    }
                  }}
                  type="button"
                  >
                  Next
                </Button>
              </Group>
            </Paper>
            <Paper  style={  {display: showForm !==3 ?`none`: 'block'}} withBorder shadow="md" p={30} mt={30} radius="md">
              <Text mb={48} mt={"xl"} align="center" weight={"600"} size="26px">
                Profile Picture
              </Text>
              <Input.Wrapper required label="Profile picture" mt={"md"}>
                <InputImage
                  required
                  imgIndex={3}
                  onDrop={(files) =>
                    {
                      setFormData((prevState) => ({
                      ...formData,
                      profile_picture: files[0],
                    }));
                    document.getElementById(`file-3`).innerHTML =
                    files[0].path;
                  }

                  }
                />
              </Input.Wrapper>

              <Group position="center" mt="xl">
              <Button variant="default" onClick={e => setShowForm(prevState => prevState-1)}>
                  Back
                </Button>
                <Button
                  sx={{ background: "#3347B0" }}
                  color={"indigo"}
                  disabled={!profile_picture}
                  type="submit">
                  Submit
                </Button>
              </Group>
            </Paper>
          </div>
        </Container>
      </form>
    </>
  );
}

function InputImage(props, onDrop, onReject) {
  const theme = useMantineTheme();

  return (
    <>
      <Dropzone
        onDrop={onDrop}
        onReject={onReject}
        // maxSize={2 * 1024 ** 2}
        accept={{ "image/*": [] }}
        maxFiles={1}
        {...props}>
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: 100, pointerEvents: "none" }}>
          <Dropzone.Accept>
            <IconUpload
              size={50}
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === "dark" ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <FaStopCircle
              size={50}
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto color="#86909D" size={50} stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 2mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      <aside>
        <h4>Files</h4>
        <ul id={`file-${props.imgIndex}`}></ul>
      </aside>
    </>
  );
}
