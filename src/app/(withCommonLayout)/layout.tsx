
import Footer from "@/components/shared/Footer";
import TwoStepNavbar from "@/components/shared/TwoStepNavbar";
import { Box } from "@mui/material";

const CommonLayoutPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* <Navbar />
      <SecondBar/> */}
      <TwoStepNavbar/>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <Footer />
    </Box>
    )
};

export default CommonLayoutPage;
