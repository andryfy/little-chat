import React from 'react';

import SendIcon from '@mui/icons-material/Send'; // Material UI icon
import IconButton from '@mui/material/IconButton';

export const SendButton = () => {
  return (
    <IconButton aria-label="send">
      <SendIcon />
    </IconButton>
  );
};
