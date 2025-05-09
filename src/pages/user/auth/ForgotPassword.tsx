import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { resetPassword, sendVerificationEmail, verifyEmailOtp } from '../../../services/auth.service';
import { Alert, IconButton, InputAdornment, Snackbar, TextField } from '@mui/material';
import { VerifyEmailDto } from '../../../dtos/requests/verify.dto';
import { ResetPasswordDto } from '../../../dtos/requests/auth/reset.password.dto';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const steps = ['Nhập email', 'Nhập OTP lấy lại mật khẩu', 'Nhập mật khẩu mớ'];

const Forgotpassword = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped] = React.useState(new Set<number>());
  const [email, setEmail] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();
  const MIN_PASSWORD_LENGTH = 6;
  const [openAlert, setOpenAlert] = React.useState({ show: false, status: '', message: '' });
  const [showPassword, setShowPassword] = React.useState(false);

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep1 = async () => {
    try {
      await sendVerificationEmail(email);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      console.log(error);
    }
  }

  const handleStep2 = async () => {
    try {
      const verifyEmailDto: VerifyEmailDto = {
        email,
        otp
      }
      await verifyEmailOtp(verifyEmailDto);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      showAlert('success', 'Xác minh OTP thành công.');
    } catch (error) {
      console.log(error);
      showAlert('error', 'Xác minh OTP thất bại. Vui lòng thử lại.');
    }
  }

  const handleStepFinal = async () => {
    try {
      if (!handleSubmit()) {
        return;
      }
      const resetPasswordDto: ResetPasswordDto = {
        email,
        resetOtp: otp,
        newPassword
      };
      await resetPassword(resetPasswordDto);
      showAlert('success', 'Đặt lại mật khẩu thành công!');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.log(error);
      showAlert('error', 'Đặt lại mật khẩu thất bại!');
      console.log(openAlert);
    }
  }

  const handleSubmit = (): boolean => {
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setError(`Mật khẩu phải có ít nhất ${MIN_PASSWORD_LENGTH} ký tự.`);
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu không khớp! Vui lòng thử lại.');
      return false;
    }
    setError('');
    return true;
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography>Vui lòng nhập email của bạn:</Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                aria-label='Email'
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ width: '40%' }}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
              <Button
                color="inherit"
                onClick={handleBack}
                disabled={true}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Button onClick={handleStep1}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </Box>);
      case 1:
        return (
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography>Vui lòng nhập OTP từ email:</Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                aria-label='OTP'
                label="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                sx={{ width: '40%' }}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
              <Button
                color="inherit"
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Button onClick={handleStep2}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </Box>);
      case 2:
        return (
          <Box>
            <form onSubmit={(e) => {
              e.preventDefault();
            }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography>Đặt lại mật khẩu mới:</Typography>
                <TextField
                  id="newPassword"
                  variant="outlined"
                  aria-label='newPassword'
                  label="Mật khẩu mới"
                  type={showPassword ? 'text' : 'password'}  // Hiển thị dưới dạng text khi showPassword là true
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{ width: '40%', mb: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  id="confirmPassword"
                  variant="outlined"
                  aria-label='confirmPassword'
                  label="Xác nhận mật khẩu"
                  type={showPassword ? 'text' : 'password'}  // Hiển thị dưới dạng text khi showPassword là true
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{ width: '40%' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {error && (
                  <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
                <Button
                  color="inherit"
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Button onClick={handleStepFinal}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </form>
          </Box>
        );
    }
  }

  const showAlert = (status: string, message: string) => {
    setOpenAlert({ show: true, status, message });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant='h5'>Thực hiện 3 thao tác để lấy lại mật khẩu</Typography>
      </Box>
      <Box>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {renderStep()}
      </Box>
      <Snackbar
        key={openAlert.message}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openAlert.show}
        autoHideDuration={3000}
        onClose={() => setOpenAlert({ show: false, status: '', message: '' })}
      >
        <Alert severity={openAlert.status === 'success' ? 'success' : 'error'} variant="filled">
          {openAlert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
export default Forgotpassword;