import {
  Autocomplete,
  Group,
  Divider,
  Select,
  Button,
  Text,
  createStyles,
  Box,
  Input,
} from "@mantine/core";
import { forwardRef, useEffect, useState } from "react";
import {
  FaBook,
  FaMapMarkerAlt,
  FaLocationArrow as FaRadiation,
  FaVideo as FaCamera,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { Autocomplete as AC } from "@react-google-maps/api";
import axios from "axios";
import { toast } from "react-toastify";
const useStyles = createStyles((t) => ({
  wrapper: {
    // marginLeft: "80px",
    display: "flex",
    background: "white",
    alignSelf: "start",
    borderRadius: "5px",
    zIndex: 1,
    flexFlow: "row",
    [t.fn.smallerThan("md")]: {
      flexFlow: "column",
      gap: t.spacing.md,
    },
    alignItems: "stretch",
  },
  iputWrapper: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function SearchBox() {

  const navigate = useNavigate()
  const [autoComplete, setAutoComplete] = useState(null);
  const onPlaceChanged = () => {
    try {
      const lat = autoComplete.getPlace().geometry.location.lat();
      const lng = autoComplete.getPlace().geometry.location.lng();
      console.log(autoComplete.getPlace());
      // setLocationName(autoComplete.getPlace().formatted_address);
      setSearchFormData({...searchFormData, location:  JSON.stringify({lat: lat, lng: lng}) } );
    } catch {}
  };

  const isSmall = useMediaQuery("(max-width: 1000px)");
  const isLil = useMediaQuery("(max-width: 600px)");
  const { classes } = useStyles();



  const [subjectsAvailable, setSubjectsAvailable] = useState([]);
  useEffect(() => {
    async function run() {
      try {
        let res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/subject/`
        );
        setSubjectsAvailable(res.data);
      } catch (error) {toast.error("Failed to fetch subjects for filter. You will not be able to filter using subjects")}
       
    }
    run();
  }, []);
  
  const [searchFormData, setSearchFormData] = useState({
    subject: '',
    location: ''
  })
  const {subject, location} = searchFormData
  
  const filterToSearchPage = () => {
    console.log(searchFormData)
    navigate(`/search?subject=${subject}&location=${location}`,)
    
  }
  
  
  return (
    <Box p={"xs"} className={classes.wrapper} mt={48} style={{marginLeft: isLil ? "20px" : "80px",
    width: isLil ? "90%" : "auto"}}>
      <Box className={classes.iputWrapper}>
        <Autocomplete
          p={0}
          variant="unstyled"
          radius={0}
          icon={<FaBook size={isSmall ? 16 : 24} />}
          placeholder="Subject"
          dropdownPosition="bottom"
          size={isSmall ? "xs" : "md"}
          data={subjectsAvailable?.map((sub) => sub.subject)}
          onChange={s => setSearchFormData({...searchFormData, subject: s})}
          value={subject}
          maxDropdownHeight={"175px"}
          
        />

        <Divider orientation="vertical" />
        {/* <Select
          styles={{
            item: {
              "&[data-selected]": {
                "&, &:hover": {
                  background: "white",
                  color: "#222",
                },
              },
            },
          }}
          p={0}
          variant="unstyled"
          radius={0}
          icon={<FaMapMarkerAlt size={isSmall ? 16 : 24} />}
          placeholder="Cours location"
          dropdownPosition="bottom"
          itemComponent={ItemComponent}
          data={[
            { value: 1, label: "Online", Icon: FaCamera },
            { value: 2, label: "Near me", Icon: FaRadiation },
          ]}
          size={isSmall ? "xs" : "md"}
        /> */}

        <AC
          className="location-input"
          onLoad={(autoC) => setAutoComplete(autoC)}
          onPlaceChanged={onPlaceChanged}>
          <>
            <Input
              // icon={<IconAt />}
              placeholder="Your Location"
              styles={{
                item: {
                  "&[data-selected]": {
                    "&, &:hover": {
                      background: "white",
                      color: "#222",
                    },
                  },
                },
              }}
              p={0}
              variant="unstyled"
              radius={0}
              icon={<FaMapMarkerAlt size={isSmall ? 16 : 24} />}
              size={isSmall ? "xs" : "md"}
            />
          </>
        </AC>
      </Box>
      <Button
      onClick={filterToSearchPage}
        radius={"sm"}
        color="indigo"
        sx={{ background: "#3347B0" }}
        size={isSmall ? "sm" : "xl"}>
        Find tutor
      </Button>
    </Box>
  );
}

const ItemComponent = forwardRef(({ Icon, label, ...other }, ref) => {
  const isSmall = useMediaQuery("(max-width: 1000px)");
  return (
    <Group {...other} noWrap ref={ref}>
      <Icon color={"#222"} size={isSmall ? 16 : 24} />
      <Text>{label}</Text>
    </Group>
  );
});
