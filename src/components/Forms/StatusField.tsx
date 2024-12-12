

import { Autocomplete, TextField } from "@mui/material";

export type CourseCategoryFieldProps = {
  label: string;
  name: string;
  onChange: (value: string | null) => void;  // Specify the type of onChange to accept a string or null
};
type CourseCategory = {
   value:string;
    name: string;
  };
const StatusField = ({ label, name, onChange }: CourseCategoryFieldProps) => {
  const courseCategories = [
    {name: 'In stock', value: 'INSTOCK'},
    {name: 'Out of stock', value: 'OUTOFFSTOCK'},

  ]
  

  return (
    <Autocomplete
      options={courseCategories || []}
      getOptionLabel={(option:CourseCategory) => option.name || ""}
      onChange={(event, value) => {
        onChange(value ? value.value : null); // Pass the selected category ID to the parent
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};

export default StatusField;
