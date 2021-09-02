import { mask, unMask } from 'remask';

import {
  Input as InputBase,
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
} from '@chakra-ui/react';

export function Input({
  error,
  label,
  touched,
  onChange,
  mask: pattern,
  ...props
}) {
  const handleChange = (event) => {
    const unmaskedValue = unMask(event.target.value);
    const maskedValue = mask(unmaskedValue, pattern);

    onChange && onChange(event.target.name)(maskedValue);
  };
  return (
    <Box>
      <FormControl id={props.name} p={4} isRequired>
        <FormLabel>{label}</FormLabel>
        <InputBase {...props} onChange={pattern ? handleChange : onChange} />
        {touched && (
          <FormHelperText textColor="#E74C3C">{error}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
