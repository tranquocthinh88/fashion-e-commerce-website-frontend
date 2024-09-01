import { Box, IconButton } from "@mui/material";
import carousel1 from "../assets/slides/anh-bia-1.png";
import carousel2 from "../assets/slides/anh-bia-2.png";
import carousel3 from "../assets/slides/anh-bia-3.png";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const images = [
    carousel1,
    carousel2,
    carousel3
]

const Slide = () => {
    const [viewIndex, setViewIndex] = useState<number>(0);
    useEffect(() => {
        const timeoutId = setInterval(() => {
            setViewIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
        }, 4000);

        return () => {
            clearInterval(timeoutId);
        };
    }, [viewIndex]);

    return (
        <Box sx={{
            backgroundImage: `url(${images[viewIndex]})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            height: "500px",
            width: "100%",
            position: "relative",
            transition: "background-image 1s ease-in-out",
            backgroundPosition: "center",
            zIndex: 1,
            "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.3)",
                zIndex: -1,
            }
        }}>
            <IconButton sx={{
                position: "absolute",
                top: "50%",
                ml: 2,
                color: "#fff",
                background: "rgba(0,0,0,0.4)",
                zIndex: 2,
                transition: "background-color 1.5s ease-in-out",
                "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.8)",
                }
            }} onClick={() => setViewIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}>
                <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton sx={{
                position: "absolute",
                top: "50%",
                right: 0,
                mr: 2,
                color: "#fff",
                background: "rgba(0,0,0,0.4)",
                zIndex: 2,
                transition: "background-color 1.5s ease-in-out",
                ":hover": {
                    backgroundColor: "rgba(0,0,0,0.8)",
                }
            }} onClick={() => setViewIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}>
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    )
}

export default Slide;