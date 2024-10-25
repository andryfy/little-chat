import { AttachFile, SentimentSatisfied, Send } from '@mui/icons-material';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import 'tailwindcss/tailwind.css'; // Assurez-vous que Tailwind CSS est bien configuré

export const MessageInput = () => {
  return (
    <div className="flex items-center rounded-lg p-2 w-full">
      <TextField
        placeholder="Type your message here..."
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <AttachFile />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SentimentSatisfied />
              </IconButton>
              <IconButton color="primary">
                <Send />
              </IconButton>
            </InputAdornment>
          ),
          className: 'bg-gray-200 dark:bg-gray-700 dark:text-gray-100',
        }}
        className="flex-1 dark:text-gray-100"
      />
    </div>
  );
};
