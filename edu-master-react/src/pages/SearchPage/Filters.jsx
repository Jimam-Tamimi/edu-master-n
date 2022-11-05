import {
  Button,
  Input,
  NumberInput,
  Select,
  Slider,
  Stack,
} from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Autocomplete as AC } from "@react-google-maps/api";
import {
  FaMapMarkerAlt,
} from "react-icons/fa";
export default function Filters({
  filterByLocation,
  reset,
  filterByExperience,
  // filterByQualifications,
  filterByCurriculum,
  filterByDistance,
  filterBySubjects,
  filterData,
  closeModal
}) {
  //filters
  const [location, setLocation] = useState(filterData.location);
  const [experience, setExperience] = useState(filterData.years_of_experience);
  const [qualifications, setQualifications] = useState(filterData.qualifications);
  const [curriculum, setCurriculum] = useState(filterData.curriculum);
  const [distance, setDistance] = useState(filterData.distance);
  const [subjects, setSubjects] = useState(filterData.subject);

  //reset
  function resetFillters() {
    setLocation("");
    setExperience(0);
    setQualifications("");
    setDistance(10);
    setSubjects("");
    setCurriculum("");
    closeModal()
    reset();
  }

  //submit
  function submitFilters() {
    console.log("first");
    filterByLocation(location);
    filterByExperience(experience);
    // filterByQualifications(qualifications);
    filterByCurriculum(curriculum);
    filterByDistance(distance);
    filterBySubjects(subjects);
    closeModal()
  }

  const [subjectsAvailable, setSubjectsAvailable] = useState([]);
  const [curriculumAvailable, setCurriculumAvailable] = useState([])
  useEffect(() => {
    async function run() {
      try {
        let res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/subject/`
        );
        setSubjectsAvailable(res.data);
      } catch (error) {toast.error("Failed to fetch subjects for filter. You will not be able to filter using subjects")}
      try {
        let res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/curriculum/`
        );
        setCurriculumAvailable(res.data);
      } catch (error) {toast.error("Failed to fetch curriculums for filter. You will not be able to filter using curriculums")}
    }
    run();
  }, []);


  
  const [autoComplete, setAutoComplete] = useState(null);
  const onPlaceChanged = () => {
    try {
      const lat = autoComplete.getPlace().geometry.location.lat();
      const lng = autoComplete.getPlace().geometry.location.lng();
      console.log(autoComplete.getPlace());
      setLocation(JSON.stringify({lat:lat,lng:lng}).replaceAll(" ", ""));
    } catch {}
  };
  
  
  
  
  return (

    <Stack mt={"xl"}>
      <Select
        searchable
        label="Subjects"
        placeholder="Maths, Physics, Biologie.."
        data={subjectsAvailable?.map((sub) => sub.subject)}
        onChange={setSubjects}
        value={subjects}
        maxDropdownHeight={"175px"}

      />
      {/* <Select
        mt={"xl"}
        label="Location"
        placeholder="Choose a location"
        data={["tunisia", "India", "Poland", "Serbia"]}
        searchable
        onChange={setLocation}
        value={location}
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
      <Input.Wrapper label="Max radius">
        <Slider
          value={distance}
          onChange={setDistance}
          defaultValue={0}
          max={5000}
        />
      </Input.Wrapper>

      {/* <Select
        value={qualifications}
        searchable
        mt={"xl"}
        label="Qualifications"
        placeholder="PhD, Master, Bachelor.."
        data={["PhD", "Master", "Bachelor"]}
        onChange={setQualifications}
      /> */}
      <Select
        searchable
        label="Curriculum"
        placeholder="Choose a curriculum"
        onChange={setCurriculum}
        value={curriculum}
        data={curriculumAvailable?.map((c) => c.curriculum)}
        maxDropdownHeight={"175px"}

      />
      <NumberInput
        label="Minimum years of experiece"
        placeholder="Choose minimum years of experiece"
        hideControls
        onChange={setExperience}
        value={experience}
      />
      <Button
        onClick={() => {
          submitFilters();
        }}
        mt={"xl"}
        color={"indigo"}
        sx={{ background: "#3347B0" }}>
        Filter
      </Button>
      <Button onClick={resetFillters} variant="default">
        Reset
      </Button>
    </Stack> 

  );
}
