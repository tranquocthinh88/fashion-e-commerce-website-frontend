import { Box, Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type Props = {
    quantity: number,
    setQuantity: (quantity: number) => void
    maxValue: number,
}

const QuantityProduct = ({ quantity, setQuantity, maxValue }: Props) => {

    const increasement = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        if (maxValue > quantity) {
            setQuantity(quantity + 1);
        }
    }

    const decreasement = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }

    }


    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', }}>
            <Button onClick={(e) => decreasement(e)}>
                <RemoveIcon />
            </Button>
            <Box sx={{width: '100px'}}>
                <TextField size="small" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            </Box>
            <Button onClick={(e) => increasement(e)}>
                <AddIcon />
            </Button>
        </Box>
    )
}

export default QuantityProduct;