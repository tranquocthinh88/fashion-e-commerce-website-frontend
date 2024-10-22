import { Box, Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CartItemModel } from "../../../models/cart.model";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateQuantityProduct } from "../../../utils/cart.handle";
import { updateCartState } from "../../../redux/reducers/cart.reducer";

type Props = {
    quantity: number,
    setQuantity: (quantity: number) => void
    maxValue: number,
    cartItem?: CartItemModel
}

const QuantityProduct = ({ quantity, setQuantity, maxValue, cartItem }: Props) => {

    const distpatch = useDispatch();

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

    useEffect(() => {
        if (cartItem) {
            let newCartItem: CartItemModel = { ...cartItem, quantity: quantity };
            updateQuantityProduct(newCartItem);
            distpatch(updateCartState());
        }
    }, [quantity])

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