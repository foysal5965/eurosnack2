import React, { useEffect, useState } from 'react';
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface Exam {
  id: string;
  status: string;
}

interface Props {
  exam: Exam;
  STATUS_OPTIONS: string[];
  handleUpdateExamStatus: (data: { id: string; status: string }) => void;  // Explicitly type as an array of strings
}

const ExamStatusSelect: React.FC<Props> = ({ exam, STATUS_OPTIONS ,handleUpdateExamStatus}) => {
    // Set up local state to handle the selected status
    const [selectedStatus, setSelectedStatus] = useState<string>('');

    useEffect(() => {
        // Ensure that selectedStatus is updated whenever exam.status changes
        if (exam.status) {
            setSelectedStatus(exam.status);
        }
    }, [exam.status]);

    // Handle changes when a new option is selected
    const handleChange = (event: SelectChangeEvent<string>) => {
        const newStatus = event.target.value;
        setSelectedStatus(newStatus);
        handleUpdateExamStatus({ id: exam.id, status: newStatus });
    };
const data ={
    id:exam.id,
    selectedStatus
}
    return (
        <FormControl fullWidth>
            <Select
                labelId={`status-label-${exam.id}`}
                value={selectedStatus} // Use the state value instead of defaultValue
                onChange={handleChange} // Add change handler to update state
            >
                {STATUS_OPTIONS.map((status: string) => (
                    <MenuItem key={status} value={status}>
                        {status}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default ExamStatusSelect;
