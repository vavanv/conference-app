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
    } from "@mui/material";
    import { X } from "lucide-react";
    import { useForm } from "react-hook-form";
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
      const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
      } = useForm<UserFormData>({
        resolver: yupResolver(userSchema),
        defaultValues: initialData,
      });
    
      const handleFormSubmit = (data: UserFormData) => {
        onSubmit(data);
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
                    <TextField
                      size="small"
                      label="First Name"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      {...register("firstName")}
                      fullWidth
                    />
                    <TextField
                      size="small"
                      label="Last Name"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      {...register("lastName")}
                      fullWidth
                    />
                    <TextField
                      size="small"
                      label="Email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      {...register("email")}
                      fullWidth
                    />
                    <TextField
                      size="small"
                      label="Phone"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      {...register("phone")}
                      fullWidth
                    />
                    <TextField
                      size="small"
                      select
                      label="Role"
                      error={!!errors.role}
                      helperText={errors.role?.message}
                      {...register("role")}
                      fullWidth
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="presenter">Presenter</MenuItem>
                      <MenuItem value="attendee">Attendee</MenuItem>
                    </TextField>
                    <TextField
                      size="small"
                      select
                      label="Status"
                      error={!!errors.status}
                      helperText={errors.status?.message}
                      {...register("status")}
                      fullWidth
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </TextField>
    
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