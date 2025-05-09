import { IconButton, styled } from "@mui/material";
import { navbarHover } from "../../theme";

const IconButtonGradient = styled(IconButton)({
    borderRadius: '50%',
    '&:hover': {
        background: navbarHover,
        borderRadius: '0',
        transition: 'background 0.5s ease-in-out',
        color: 'white',
    },
})
export default IconButtonGradient;