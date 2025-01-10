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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventSchema } from "../../schemas/event";
import { EventFormData } from "../../types/event";

const allLocations = [
  "Main Hall",
  "Conference Room A",
  "Conference Room B",
  "Auditorium",
  "Exhibition Hall",
  "Workshop Room 1",
  "Workshop Room 2",
  "Networking Lounge",
  "Panel Discussion Room",
  "Keynote Hall",
];

interface EventFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EventFormData) => void;
  initialData?: EventFormData;
  title: string;
}

export function EventForm({
  open,
  onClose,
  onSubmit,
  initialData,
  title,
}: EventFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    resolver: yupResolver(eventSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      locations: [],
      organizer: "",
      status: "scheduled",
      organizationId: "",
    },
  });

  const handleFormSubmit = (data: EventFormData) => {
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
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      label="Event Name"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      label="Description"
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      fullWidth
                      multiline
                      rows={3}
                    />
                  )}
                />

                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      label="Start Date"
                      type="datetime-local"
                      error={!!errors.startDate}
                      helperText={errors.startDate?.message}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />

                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      label="End Date"
                      type="datetime-local"
                      error={!!errors.endDate}
                      helperText={errors.endDate?.message}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />

                <Controller
                  name="locations"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      select
                      label="Locations"
                      SelectProps={{
                        multiple: true,
                        value: field.value || [],
                        onChange: (e) => field.onChange(e.target.value),
                      }}
                      error={!!errors.locations}
                      helperText={errors.locations?.message}
                      fullWidth
                    >
                      {allLocations.map((location) => (
                        <MenuItem key={location} value={location}>
                          {location}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <Controller
                  name="organizer"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      label="Organizer"
                      error={!!errors.organizer}
                      helperText={errors.organizer?.message}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      select
                      label="Status"
                      error={!!errors.status}
                      helperText={errors.status?.message}
                      fullWidth
                    >
                      <MenuItem value="scheduled">Scheduled</MenuItem>
                      <MenuItem value="ongoing">Ongoing</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </TextField>
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
