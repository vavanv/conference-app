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
import { organizationSchema } from "../../schemas/organization";
import { OrganizationFormData } from "../../types/organization";

interface OrganizationFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: OrganizationFormData) => void;
  initialData?: OrganizationFormData;
  title: string;
}

export function OrganizationForm({
  open,
  onClose,
  onSubmit,
  initialData,
  title,
}: OrganizationFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationFormData>({
    resolver: yupResolver(organizationSchema),
    defaultValues: initialData,
  });

  const handleFormSubmit = (data: OrganizationFormData) => {
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
          width: { xs: "100%", sm: 400 },
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
                  label="Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...register("name")}
                  fullWidth
                />
                <TextField
                  size="small"
                  select
                  label="Type"
                  error={!!errors.type}
                  helperText={errors.type?.message}
                  {...register("type")}
                  fullWidth
                >
                  <MenuItem value="Corporate">Corporate</MenuItem>
                  <MenuItem value="Non-Profit">Non-Profit</MenuItem>
                  <MenuItem value="Educational">Educational</MenuItem>
                  <MenuItem value="Government">Government</MenuItem>
                  <MenuItem value="Startup">Startup</MenuItem>
                </TextField>
                <TextField
                  size="small"
                  label="Contact Email"
                  error={!!errors.contactEmail}
                  helperText={errors.contactEmail?.message}
                  {...register("contactEmail")}
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
                  label="Address"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  {...register("address")}
                  fullWidth
                />
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
