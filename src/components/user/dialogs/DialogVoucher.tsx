// const DiscountCodeButton = () => {
//     const [open, setOpen] = useState(false);
  
//     const discountCodes = [
//       { code: 'GIAM10', description: 'Giảm 10% cho đơn hàng đầu tiên' },
//       { code: 'FREESHIP', description: 'Miễn phí vận chuyển cho đơn hàng trên 500k' },
//       // Thêm các mã giảm giá khác ở đây
//     ];
  
//     const handleClickOpen = () => {
//       setOpen(true);
//     };
  
//     const handleClose = () => {
//       setOpen(false);
//     };
  
//     return (
//       <div>
//         <Button variant="outlined" sx={{ ml: 2 }} onClick={handleClickOpen}>
//           Mã giảm giá
//         </Button>
//         <Dialog onClose={handleClose} open={open}>
//           <DialogTitle>Danh sách mã giảm giá</DialogTitle>
//           <List sx={{ pt: 0 }}>
//             {discountCodes.map((item, index) => (
//               <ListItem button key={index}>
//                 <ListItemText primary={item.code} secondary={item.description} />
//               </ListItem>
//             ))}
//           </List>
//         </Dialog>
//       </div>
//     );
//   };
  
//   export default DiscountCodeButton;
  