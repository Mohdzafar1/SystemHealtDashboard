import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';



// ----------------------------------------------------------------------

export default function ProcessTask({ title, total,proId,memory, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}

      <Stack spacing={0.5}>
        <Typography variant="h4">{title}</Typography>
        <div>
        <span>
         Cpu:-{total}
        </span>
        </div>
        <div>
          <span>
          PId:-{proId}
          </span>
        </div>
        <div>
          <span>
          Memory:-{memory}
          </span>
        </div>

      </Stack>
    </Card>
  );
}

ProcessTask.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  proId: PropTypes.number,
  memory: PropTypes.number,
};
