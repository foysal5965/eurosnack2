// "use client";

// import React from "react";
// import { useFormContext, Controller, Control } from "react-hook-form";
// import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";

// export type SelectOptions = {
//   label: string;
//   value: string;
// };

// type SelectFieldProps = {
//   options: SelectOptions[];
//   name: string;
//   size?: "medium" | "small";
//   placeholder?: string;
//   label?: string;
//   defaultValue?: string;
//   control: Control<any>;  // Changed from SelectOptions to string
// };

// const FormSelectField = ({
//   name,
//   size = "medium",
//   placeholder = "Select",
//   options,
//   label,
//   defaultValue,control
// }: SelectFieldProps) => {

//   return (
//     <FormControl fullWidth variant="outlined" size={size}>
//       {label && <InputLabel id={`${name}-label`}>{label}</InputLabel>}
//       <Controller
//         control={control}
//         name={name}
//         defaultValue={defaultValue || ""}
//         render={({ field: { value, onChange } }) => (
//           <Select
//             labelId={`${name}-label`}
//             value={value}
//             onChange={(event: SelectChangeEvent<string>) => {
//               onChange(event.target.value); // Call onChange from Controller
//             }}
//             displayEmpty
//             placeholder={placeholder}
//           >
//             {options.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </Select>
//         )}
//       />
//     </FormControl>
//   );
// };

// export default FormSelectField;
