import {
  Input as InputBase,
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
} from '@chakra-ui/react';

export const Input = ({ error, label, touched, ...props }) => (
  <Box>
    <FormControl id="password" p={4} isRequired>
      <FormLabel>{label}</FormLabel>
      <InputBase {...props} />
      {touched && <FormHelperText textColor="#E74C3C">{error}</FormHelperText>}
    </FormControl>
  </Box>
);
