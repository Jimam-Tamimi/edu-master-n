import { Select, Text } from "@mantine/core";
import { FaSortUp } from "react-icons/fa";

export default function SortBox({ sort }) {
  return (
    <Select
      variant="filled"
      data={["Relevence", "Price", "Distance"]}
      defaultValue="Relevence"
      size="md"
    />
  );
}
