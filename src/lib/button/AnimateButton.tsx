// import React from 'react';
// import { Button } from '@mui/material';
// import { motion } from 'framer-motion';
// interface AnimatedButton{
//   name:string;
//   variant?: any;
//   onClick?: any;
//   background?:any
// }
// const TeleCareButton = ({name,variant, onClick,background}:AnimatedButton) => {
//   return (
//     <motion.div
//       whileHover={{
//         scale: 1.0, // Enlarge the button on hover
//         backgroundColor: 'rgba(255, 255, 255, 0.2)', // Change color on hover
//         // boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.4)', // Add shadow
//       }}
//       whileTap={{ scale: 0.9 }} // Shrink the button on tap/click
//       transition={{ type: 'spring', stiffness: 300 }} // Animation settings
//     >
//       <Button
//       onClick={onClick}
//       variant= {variant ? variant : "contained"}
//         sx={{
//           background: background ? background : 'linear-gradient(90deg, #4ECDC4, #43B3AC)', // Gradient color
//           borderRadius: '15px', // Rounded button
//           padding: '10px 20px',
//           color: '#fff', // Text color
//           fontSize: '15px',
//           fontWeight: 'bold', 
//           textTransform: 'none',// Initial shadow
          
//         }}
//       >
//         {name}
//       </Button>
//     </motion.div>
//   );
// };

// export default TeleCareButton;
