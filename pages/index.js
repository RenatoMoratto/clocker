import { Formik, useFormik } from 'formik';
import * as yup from 'yup';

import {
  Container,
  Box,
  Input,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react';

import { Logo } from '../components/Logo';

export default function Home() {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('E-mail inválido')
      .required('Preenchimento obrigatório'),
    password: yup.string().required('Preenchimento obrigatório'),
    username: yup.string().required('Preenchimento obrigatório'),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: () => {},
      validationSchema,
      initialValues: {
        email: '',
        usename: '',
        password: '',
      },
    });

  return (
    <Container p={4} centerContent>
      <Logo />
      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>
      <Box>
        <FormControl id="email" p={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            values={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && (
            <FormHelperText textColor="#E74C3C">
              {errors.email}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl id="password" p={4} isRequired>
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            values={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && (
            <FormHelperText textColor="#E74C3C">
              {errors.password}
            </FormHelperText>
          )}
        </FormControl>

        <Box display="flex" flexDirection="row" alignItems="center">
          <Text>clocker.work/</Text>
          <FormControl id="username" p={4} isRequired>
            <Input
              type="username"
              values={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.username && (
              <FormHelperText textColor="#E74C3C">
                {errors.username}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box p={4}>
          <Button width="100%" onClick={handleSubmit}>
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
