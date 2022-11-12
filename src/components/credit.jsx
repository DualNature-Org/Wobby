import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
import { useState } from 'react';

const marks = [
  {
    value: 10,
    label: '20k',
  },
  {
    value: 30,
    label: '100k',
  },
  {
    value: 70,
    label: '300k',
  },
  {
    value: 100,
    label: '500k',
  },
];

function valuetext(value) {
  return `${value}`;
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

export default function DiscreteSliderValues(props) {
    
    const handle_change= (e)=> {
        const value= e.target.value
        if(value == 10) props.onChange(e, 20)
        else if(value == 30) props.onChange(e, 100)
        else if(value == 70) props.onChange(e, 300)
        else if(value == 100) props.onChange(e, 500)
    }

    const handle_min= ()=> {
        if(props.checked) return '30'
        else return '10'
    }

  return (
    <Box sx={{ width: 300 }}>
        <Typography variant='body1'>
            Select Wordcount
        </Typography>
        <Slider
            aria-label="Restricted values"
            defaultValue={30}
            onChange={handle_change}
            valueLabelFormat={valueLabelFormat}
            getAriaValueText={valuetext}
            step={null}
            valueLabelDisplay="auto"
            marks={marks}
        />
    </Box>
  );
}
