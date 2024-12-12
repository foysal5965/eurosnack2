import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

// Define types for columns and data
interface Column {
  id: string;
  label: string;
}

interface RowData {
  [key: string]: string | number | React.JSX.Element; // Allows flexible row data with any string or number values
}

interface AnimatedTableProps {
  columns: Column[];
  data: RowData[];
}

const AnimatedTable: React.FC<AnimatedTableProps> = ({ columns, data }) => {
  return (
    <Box
      sx={{
        overflowX: 'auto', // Enable horizontal scrolling
        width: '100%',
      }}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.id}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {columns.map((col) => (
                  <TableCell key={col.id}>{row[col.id]}</TableCell>
                ))}
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AnimatedTable;
