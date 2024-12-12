
import { useBrandsQuery } from "@/redux/api/brandApi";
import { Autocomplete, TextField } from "@mui/material";

export type CourseCategoryFieldProps = {
  label: string;
  name: string;
  onChange: (value: string | null) => void;  // Specify the type of onChange to accept a string or null
};
type CourseCategory = {
    id: string;
    title: string;
  };
const BrandFieled = ({ label, name, onChange }: CourseCategoryFieldProps) => {
  const query = {};
  const { data: courseCategories } = useBrandsQuery({ ...query });
  

  return (
    <Autocomplete
      options={courseCategories?.data || []}
      getOptionLabel={(option:CourseCategory) => option.title || ""}
      onChange={(event, value) => {
        onChange(value ? value.id : null); // Pass the selected category ID to the parent
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

export default BrandFieled;
