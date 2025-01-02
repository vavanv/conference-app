import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Card, CardMedia, Typography, Box, useTheme } from '@mui/material';
import { carouselItems } from '../config/carouselItems';

export default function HomeCarousel() {
  const theme = useTheme();

  return (
    <Box sx={{ 
      height: '100%',
      bgcolor: 'background.paper',
      borderRadius: 1,
      overflow: 'hidden'
    }}>
      <Carousel
        animation="slide"
        interval={5000}
        indicators={true}
        navButtonsAlwaysVisible={true}
        sx={{ 
          height: '100%',
          '& .MuiIconButton-root': {
            color: 'white',
            bgcolor: 'rgba(0, 0, 0, 0.3)',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        }}
        indicatorContainerProps={{
          style: {
            position: 'absolute',
            bottom: '16px',
            zIndex: 1,
          }
        }}
        indicatorIconButtonProps={{
          style: {
            color: 'rgba(255, 255, 255, 0.5)',
          }
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: 'white',
          }
        }}
      >
        {carouselItems.map((item, index) => (
          <Card 
            key={index} 
            elevation={0}
            sx={{ 
              height: '100%',
              position: 'relative',
              bgcolor: 'transparent'
            }}
          >
            <CardMedia
              component="img"
              image={item.image}
              alt={item.title}
              sx={{
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                p: 4,
                color: 'white'
              }}
            >
              <Typography 
                variant="h4" 
                gutterBottom
                sx={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  fontWeight: 600
                }}
              >
                {item.title}
              </Typography>
              <Typography 
                variant="subtitle1"
                sx={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  maxWidth: '600px'
                }}
              >
                {item.description}
              </Typography>
            </Box>
          </Card>
        ))}
      </Carousel>
    </Box>
  );
}