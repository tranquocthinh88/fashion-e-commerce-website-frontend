import TextField from '@mui/material/TextField';

// Component TextField tùy chỉnh
import { FormikProps } from 'formik';

interface CustomTextFieldProps {
  label: string;
  name: string;
  type: string;
  formik?: FormikProps<any>;
  width?: string;
  [key: string]: any;
}

const CustomTextField = ({ label, name, type, formik , width = '100%',}: CustomTextFieldProps) => {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      placeholder={`Nhập ${label.toLowerCase()}`} // Hiển thị placeholder tùy theo label
      value={formik?.values[name]} // Sử dụng formik để liên kết giá trị
      onChange={formik?.handleChange} // Xử lý sự kiện thay đổi
      onBlur={formik?.handleBlur} // Xử lý sự kiện blur
      error={formik?.touched[name] && Boolean(formik.errors[name])} // Hiển thị lỗi nếu có
      helperText={formik?.touched[name] && typeof formik.errors[name] === 'string' ? formik.errors[name] : undefined} // Thông báo lỗi
      sx={{
        width: width, // Điều chỉnh chiều rộng
        '& .MuiInputBase-root': {
          height: 40, // Điều chỉnh chiều cao
        },
      }}
      InputProps={{
        sx: {
          height: 40, // Tùy chỉnh chiều cao của input bên trong
        },
      }}
      // InputLabelProps={{
      //   shrink: true, // Bắt buộc label luôn thu nhỏ để không bị lệch
      //   sx: {
      //     fontSize: 14, // Tùy chỉnh kích thước chữ của label
      //     transform: 'translate(14px, 12px) scale(1)', // Vị trí của label khi không focus
      //   },
      // }}
      // {...props} // Truyền thêm các thuộc tính khác nếu cần
    />
  );
};

export default CustomTextField;