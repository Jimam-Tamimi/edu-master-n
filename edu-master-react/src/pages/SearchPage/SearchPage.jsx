import {
  Box,
  Button,
  createStyles,
  Grid,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import TutorCard from "./TutorCard";
import { useMediaQuery } from "@mantine/hooks";
import Filters from "./Filters";
import SortBox from "./SortBox";
import axios from "axios";

const useStyles = createStyles((t) => ({
  wrapper: {
    background: t.colors.gray[0],
  },
  searchBox: {
    background: "white",
    boxShadow: t.shadows.xs,
    borderRadius: t.radius.sm,
  },
}));

export default function SearchPage() {
  const [filteredList, setFilteredList] = useState(null);

  const searchQ = window.location.search; // could be '?foo=bar'
  const params = new URLSearchParams(searchQ);
  let locationFromUrl = params.get("location");
  let subjectFromUrl = params.get("subject");

  const initialFormData = {
    search: "",
    subject: subjectFromUrl ? subjectFromUrl : "",
    curriculum: "",
    years_of_experience: 0,
    location: locationFromUrl ? locationFromUrl : "",
    distance: 10,
  };
  const [filterData, setFilterData] = useState(initialFormData);

  const {
    search,
    subject,
    curriculum,
    years_of_experience,
    location,
    distance,
  } = filterData;

  async function run() {
    try {
      let params = ``;
      // Object.keys(filterData).forEach(function(key, index) { params += (`&${key}=${typeof(filterData[key]) == "object" ? JSON.stringify(filterData[key]) : filterData[key]  }`)});
      Object.keys(filterData).forEach(function (key, index) {
        params += `&${key}=${filterData[key]}`;
      });
      console.log({ params });
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/tutors/filter/?is_verified=True${params}`
      );
      console.log(res);
      setFilteredList(res.data);
    } catch (error) {
      console.log(error);
      // toast    ('Failed to get tutors', { appearance: 'error' });
    }
  }

  // useEffect(() => {

  //   const searchQ = window.location.search // could be '?foo=bar'
  //   const params = new URLSearchParams(searchQ);
  //   let location = params.get("location")
  //   if(location){
  //     setFilterData(prevData => ({...prevData, location: location.replaceAll(" ", "")}))
  //   }
  //   let subject = params.get("subject")
  //   if(subject){
  //     setFilterData(prevData => ({...prevData, subject: subject}))
  //   }
  // }, [])
  // console.log({filterData})

  useEffect(() => {
    console.log("2");
    run();
  }, [
    search,
    subject,
    curriculum,
    years_of_experience,
    location,
    distance,
    filterData,
  ]);

  //filters

  //search name
  // function searchName(n) {

  // }

  // //location filter
  // function filterByLocation(l) {
  //   if (l === null) return;
  //   setFilteredList((fl) =>
  //     fl.filter((tut) => tut.location.toLowerCase() === l.toLowerCase())
  //   );
  // }

  // //experience filter
  // function filterByExperience(e) {
  //   if (e === null) return;
  //   setFilteredList((fl) => fl.filter((tut) => tut.experience >= e));
  // }

  // //qualification filter
  // function filterByQualifications(q) {
  //   if (q === null) return;
  //   setFilteredList((fl) => fl.filter((tut) => tut.qualifications.includes(q)));
  // }

  // //curriculum filter
  // function filterByCurriculum(c) {
  //   if (c === null) return;
  //   setFilteredList((fl) => fl.filter((tut) => tut.curiculum.includes(c)));
  // }

  // //subjects filter
  // function filterBySubjects(s) {
  //   if (s === null) return;
  //   setFilteredList((fl) => fl.filter((tut) => tut.subjects.includes(s)));
  // }

  // //distance filter
  // function filterByDistance(d) {
  //   if (d === null) return;
  //   setFilteredList((fl) => fl.filter((tut) => tut.distance <= d));
  // }

  // //styling
  const { classes } = useStyles();
  const isSmall = useMediaQuery("(max-width: 1000px)");
  const isLil = useMediaQuery("(max-width: 600px)");

  // //rest to default list
  // function reset() {
  //   setFilteredList(TUTORS);
  // }

  // const filtersProps = {
  //   filterByLocation,
  //   reset,
  //   filterByExperience,
  //   filterByQualifications,
  //   filterByCurriculum,
  //   filterByDistance,
  //   filterBySubjects,
  // };
  // //components

  const [windowWidth, setWindowWidth] = useState(1000);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth <= 1000) {
      setShowFilterOptions(false);
    } else {
      setShowFilterOptions(true);
    }
  }, [window.innerWidth]);

  useEffect(() => {
    document.title = "Search | Tutors Street"
    window.scroll(0, 0);
  }, []);

  const [showSearchModal, setShowSearchModal] = useState(false);
  const FILTER_BAR = (
    <Grid.Col span={isSmall ? 4 : 1}>
      <Paper pb={"xl"} shadow={"xs"} radius="sm" p={"md"}>
        {isSmall ? (
          <>
            <Box style={{margin: '20px 0px'}} className={classes.searchBox}>
              <SearchBox
                searchName={(n) =>
                  setFilterData((prevS) => ({ ...prevS, search: n }))
                }
                value={filterData.search}
              />
            </Box>
            <Button style={{margin: '20px 0px', background: "#4263EB"}} onClick={(e) => setShowSearchModal(true)} fullWidth>
              Show Filter Options
            </Button>
          </>
        ) : (
          <Text weight={"bold"}>Filters</Text>
        )}
        {isSmall ? (
          <Modal
            title={<Text weight={700}>Filter</Text>}
            opened={showSearchModal}
            onClose={(e) => setShowSearchModal(false)}>
            <Filters
              closeModal={(e) => setShowSearchModal(false)}
              filterByCurriculum={(c) =>
                setFilterData((prevS) => ({ ...prevS, curriculum: c }))
              }
              // filterByCurriculum={c => console.log(c)}
              filterByExperience={(e) =>
                setFilterData((prevS) => ({ ...prevS, years_of_experience: e }))
              }
              filterBySubjects={(s) =>
                setFilterData((prevS) => ({ ...prevS, subject: s }))
              }
              filterByDistance={(d) =>
                setFilterData((prevS) => ({ ...prevS, distance: d }))
              }
              filterByLocation={(l) =>
                setFilterData((prevS) => ({ ...prevS, location: l }))
              }
              filterData={filterData}
              reset={() =>
                setFilterData({
                  search: "",
                  subject: "",
                  curriculum: "",
                  years_of_experience: 0,
                  location: "",
                  distance: 10,
                })
              }
            />
          </Modal>
        ) : (
          <Filters
            closeModal={(e) => setShowSearchModal(false)}
            filterByCurriculum={(c) =>
              setFilterData((prevS) => ({ ...prevS, curriculum: c }))
            }
            // filterByCurriculum={c => console.log(c)}
            filterByExperience={(e) =>
              setFilterData((prevS) => ({ ...prevS, years_of_experience: e }))
            }
            filterBySubjects={(s) =>
              setFilterData((prevS) => ({ ...prevS, subject: s }))
            }
            filterByDistance={(d) =>
              setFilterData((prevS) => ({ ...prevS, distance: d }))
            }
            filterByLocation={(l) =>
              setFilterData((prevS) => ({ ...prevS, location: l }))
            }
            filterData={filterData}
            reset={() =>
              setFilterData({
                search: "",
                subject: "",
                curriculum: "",
                years_of_experience: 0,
                location: "",
                distance: 10,
              })
            }
          />
        )}
      </Paper>
    </Grid.Col>
  );

  const TUTORS_LIST = (
    <Grid.Col span={isSmall ? 4 : 3}>
      <Stack>
        {!isSmall ? (
          <Box className={classes.searchBox}>
            <SearchBox
              searchName={(n) =>
                setFilterData((prevS) => ({ ...prevS, search: n }))
              }
              value={filterData.search}
            />
          </Box>
        ) : (
          ""
        )}

        <Stack>
          {filteredList?.map((tutor, i) => (
            <TutorCard key={i} tutor={tutor} />
          ))}
        </Stack>
      </Stack>
    </Grid.Col>
  );

  return (
    <Box
      className={classes.wrapper}
      py={"xl"}
      px={isSmall ? "md" : "xl"}
      style={{ padding: isLil ? "40px" : "0 100px" }}>
      {/* <Box
        style={{background: "url(https://images.pexels.com/photos/5905492/pexels-photo-5905492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)", 
        width: "100%", height: isLil ? "200px" : "350px", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPositionY: "20%"}}
      >
        
      </Box> */}
      <Box mt={isSmall ? 0 : 72} mb={isSmall ? 10 : 48}>
        <Title sx={{ color: "#3347B0" }}>
          {isSmall
            ? "Find tutors nearby"
            : `Online tutors & teachers for private lessons`}
        </Title>
        <Text color={"dimmed"}>
          {isSmall
            ? ""
            : `Looking for an online tutor? ABc is the leading online language
          learning platform worldwide. You can choose from 110 teachers with an
          average rating of 4.9 out of 5 stars given by 90632 customers`}
        </Text>
      </Box>
      <Grid columns={4}>
        {FILTER_BAR}
        {TUTORS_LIST}
      </Grid>
    </Box>
  );
}

//fake data
const TUTORS = [
  {
    name: "Anas Deyra",
    picture:
      "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "TN",
    experience: 5,
    qualifications: ["PhD", "Masters", "Bachelor"],
    distance: 100,
    subjects: ["Maths", "Physics", "Biologie", "Algebra"],
    hourly: 16,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In suscipit commodi ipsam quam, dolore velit aperiam hic fuga odit? Facere molestias, cumque iusto eligendi consequatur pariatur magni debitis omnis quos. ",
    lessonsCount: 5,
    rating: 4,
    reviewsCount: 12,
    curiculum: ["zzz", "zzz", "zzz"],
    title: "Certified TEFL Tutor",
    job: "English teacher",
  },
  {
    name: "Fayza Duhi",
    picture:
      "https://images.pexels.com/photos/943084/pexels-photo-943084.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: "LB",
    experience: 2,
    qualifications: ["PhD"],
    distance: 1000,
    subjects: ["Arts"],
    hourly: 16,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In suscipit commodi ipsam quam, dolore velit aperiam hic fuga odit? Facere molestias, cumque iusto eligendi consequatur pariatur magni debitis omnis quos. ",
    lessonsCount: 5,
    rating: 4,
    reviewsCount: 12,
    curiculum: ["zzz", "zzz", "zzz"],
    title: "Certified TEFL Tutor",
    job: "English teacher",
  },
  {
    name: "Lana Rock",
    picture:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: "GB",
    experience: 4,
    qualifications: ["PhD", "Masters", "Bachelor"],
    distance: 650,
    subjects: ["English", "Danish"],
    hourly: 16,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In suscipit commodi ipsam quam, dolore velit aperiam hic fuga odit? Facere molestias, cumque iusto eligendi consequatur pariatur magni debitis omnis quos. ",
    lessonsCount: 5,
    rating: 4,
    reviewsCount: 12,
    curiculum: ["zzz", "zzz", "zzz"],
    title: "Certified TEFL Tutor",
    job: "English teacher",
  },
  {
    name: "Akram Mag",
    picture: "",
    location: "IN",
    experience: 5,
    qualifications: ["PhD", "Masters", "Bachelor"],
    distance: 100,
    subjects: ["Maths", "Physics", "Biologie", "Algebra"],
    hourly: 16,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In suscipit commodi ipsam quam, dolore velit aperiam hic fuga odit? Facere molestias, cumque iusto eligendi consequatur pariatur magni debitis omnis quos. ",
    lessonsCount: 5,
    rating: 4,
    reviewsCount: 12,
    curiculum: ["zzz", "zzz", "zzz"],
    title: "Certified TEFL Tutor",
    job: "English teacher",
  },
  {
    name: "Muta Ryuhi",
    picture: "",
    location: "IN",
    experience: 5,
    qualifications: ["PhD", "Masters", "Bachelor"],
    distance: 100,
    subjects: ["Maths", "Physics", "Biologie", "Algebra"],
    hourly: 16,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In suscipit commodi ipsam quam, dolore velit aperiam hic fuga odit? Facere molestias, cumque iusto eligendi consequatur pariatur magni debitis omnis quos. ",
    lessonsCount: 5,
    rating: 4,
    reviewsCount: 12,
    curiculum: ["zzz", "zzz", "zzz"],
    title: "Certified TEFL Tutor",
    job: "English teacher",
  },
];
