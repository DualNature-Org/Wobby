import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function IndeterminateCheckbox(props) {

  const handleChange1 = (event) => {
    props.setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    props.setChecked([event.target.checked, props.checked[1]]);
  };

  const handleChange3 = (event) => {
    props.setChecked([props.checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="All tools access"
        control={<Checkbox checked={props.checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="All automated services access"
        control={<Checkbox checked={props.checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );

  return (
    <div>
      <FormControlLabel
        label="Select access"
        control={
          <Checkbox
            checked={props.checked[0] && props.checked[1]}
            indeterminate={props.checked[0] !== props.checked[1]}
            onChange={handleChange1}
          />
        }
      />
      {children}
    </div>
  );
}
