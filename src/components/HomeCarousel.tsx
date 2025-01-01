import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography, Box } from '@mui/material';
import { carouselItems } from '../config/carouselItems';

export default function HomeCarousel() {
  return (
    <Box sx={{ height: 'calc(100vh - 84px)' }}> {/* Adjusted for AppBar height */}
      <Carousel
        animation="slide"
        interval={5000}
        indicators={true}
        navButtonsAlwaysVisible={true}
        sx={{ height: '100%' }}
        indicatorContainerProps={{
          style: {
            position: 'absolute',
            bottom: '16px',
            zIndex: 1
          }
        }}
      >
        {carouselItems.map((item, index) => (
          <Paper
            key={index}
            sx={{
              position: 'relative',
              height: '100%',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: 2
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: 4,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                borderRadius: '0 0 8px 8px'
              }}
            >
              <Typography variant="h4" color="common.white" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="subtitle1" color="common.white">
                {item.description}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Carousel>
    </Box>
  );
}