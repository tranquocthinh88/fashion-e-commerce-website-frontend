import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton } from '@mui/material';

const CustomArrow = ({ type, onClick, currentSlide, slideCount }: any) => {
    const isDisabled = type === 'prev' ? currentSlide === 0 : currentSlide === slideCount - 1;
    const Icon = type === 'prev' ? ArrowBackIosNewIcon : ArrowForwardIosIcon;
    const position = type === 'prev' ? { left: '-5%' } : { right: '-5%' };
    
    return (
        <IconButton
            onClick={onClick}
            disabled={isDisabled}
            sx={{
                position: 'absolute',
                top: '50%',
                zIndex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': { backgroundColor: 'black' },
                '&.slick-disabled': { opacity: 0.5, cursor: 'not-allowed' },
                ...position, // Sử dụng position tùy theo type
            }}
        >
            <Icon />
        </IconButton>
    );
};

export default CustomArrow
