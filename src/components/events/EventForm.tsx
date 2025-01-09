// ... existing imports ...

export function EventForm({ 
  open, 
  onClose, 
  onSubmit, 
  initialData, 
  title 
}: EventFormProps) {
  // ... existing code ...

  return (
    // ... existing drawer code ...
      <Slide direction="left" in={open} timeout={500}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Stack spacing={3}>
            {/* ... other fields ... */}
            <TextField
              size="small"
              select
              label="Locations"
              SelectProps={{
                multiple: true,
                value: watch('locations') || [],
                onChange: (e) => setValue('locations', e.target.value as string[])
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
            {/* ... other fields ... */}
          </Stack>
        </form>
      </Slide>
    // ... rest of the component ...
  );
}
