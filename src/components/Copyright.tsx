import { Typography, Box } from '@mui/material';

interface CopyrightProps {
  isDrawerOpen: boolean;
}

export default function Copyright({ isDrawerOpen }: CopyrightProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box sx={{ 
      p: 2, 
      mt: 'auto',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <Typography 
        variant="body2" 
        color={isDrawerOpen ? "text.secondary" : "common.white"}
        align="center"
        sx={{
          fontSize: isDrawerOpen ? undefined : '10px',
          writingMode: isDrawerOpen ? undefined : 'vertical-rl',
          textOrientation: isDrawerOpen ? undefined : 'mixed',
          transform: isDrawerOpen ? undefined : 'rotate(180deg)'
        }}
      >
        © {currentYear}
      </Typography>
    </Box>
  );
}
