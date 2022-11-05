import { TextInput } from "@mantine/core";
import { FaSearch } from "react-icons/fa";

export default function SearchBox({ searchName, value="" }) {
  return (
    <TextInput
      sx={{ flexGrow: 1 }}
      variant="unstyled"
      icon={!value? <FaSearch /> :''}
      value={value}
      size="md"
      placeholder="     Search a tutor"
      onChange={(e) => {
        searchName(e.currentTarget.value);
      }}
    />
  );
}
