import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  IconButton,
  Fade,
  Slide,
  InputAdornment,
} from "@mui/material";
import { X, Eye, EyeOff } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../schemas/user";
import { UserFormData } from "../../types/user";

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  initialData?: UserFormData;
  title: string;
}

export default function UserForm({
  open,
  onClose,
  onSubmit,
  initialData,
  title,
}: UserFormProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: yupResolver(userSchema),
    defaultValues: initialData || {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      phone: '',
      role: 'attendee',
      status: 'active'
    },
  });

  const handleFormSubmit = (data: UserFormData) => {
    const { confirmPassword, ...userData } = data;
    onSubmit(userData);
    reset();
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 500 },
          transition: (theme) =>
            theme.transitions.create(["transform"], {
              duration: theme.transitions.duration.standard,
              easing: theme.transitions.easing.easeInOut,
            }),
        },
      }}
      transitionDuration={400}
      SlideProps={{
        appear: true,
        direction: "left",
      }}
    >
      <Fade in={open} timeout={600}>
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6">{title}</Typography>
            <IconButton onClick={onClose} size="small">
              <X />
            </IconButton>
          </Box>

          <Slide direction="left" in={open} timeout={500}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Stack spacing={3}>
                {/* Personal Information */}
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      label="First Name"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      label="Last Name"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      label="Email"
                      type="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      label="Phone"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      fullWidth
                    />
                  )}
                />

                {/* Role and Status */}
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      size="small"
                      label="Role"
                      error={!!errors.role}
                      helperText={errors.role?.message}
                      fullWidth
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="presenter">Presenter</MenuItem>
                      <MenuItem value="attendee">Attendee</MenuItem>
                    </TextField>
                  )}
                />

                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      size="small"
                      label="Status"
                      error={!!errors.status}
                      helperText={errors.status?.message}
                      fullWidth
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </TextField>
                  )}
                />

                {/* Authentication Information */}
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      label="Username"
                      error={!!errors.username}
                      helperText={errors.username?.message}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              size="small"
                            >
                              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      type={showConfirmPassword ? 'text' : 'password'}
                      label="Confirm Password"
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                              size="small"
                            >
                              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  fullWidth
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </Stack>
            </form>
          </Slide>
        </Box>
      </Fade>
    </Drawer>
  );
}
