import { Box, Button, Container, Rating, Typography } from "@mui/material";
import Slide from "../../../component/Slide";
import { pink, red } from "@mui/material/colors";
import VisibilityIcon from '@mui/icons-material/Visibility';

const Home = () => {
    return (
        <Box>
            <Slide />
            <Box sx={{
                height: 500,
                background: "white",
                pt: 2,
                pb: 2,
            }}>

            </Box>
        </Box >
    );
}
export default Home;