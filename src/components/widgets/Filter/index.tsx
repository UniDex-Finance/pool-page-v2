import { Select, Option } from "@material-tailwind/react";
// import { useState } from "react";

interface Props {
  title: string;
  onSelect: (value: any) => void;
}

export default ({}: Props) => {
  // const [value, setValue] = useState(null);

  const handleChange = (value: any) => {
    console.log("value:", value);
  };

  return (
    <div className="w-72">
      <Select label="Select Version" onChange={handleChange}>
        <Option value="123">Material Tailwind HTML</Option>
        <Option>Material Tailwind React</Option>
        <Option>Material Tailwind Vue</Option>
        <Option>Material Tailwind Angular</Option>
        <Option>Material Tailwind Svelte</Option>
      </Select>
    </div>
  );
};
