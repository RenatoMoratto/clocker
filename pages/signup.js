import { useFormik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
import {
  Container,
  Box,
  Input,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';

import { Logo } from '../components/Logo';
import { firebaseClient } from '../config/firebase/client';

export default function SignUp() {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('E-mail inválido')
      .required('Preenchimento obrigatório'),
    password: yup.string().required('Preenchimento obrigatório'),
    username: yup.string().required('Preenchimento obrigatório'),
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    onSubmit: async (values, form) => {
      try {
        const user = await firebaseClient
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password)
          .then((res) => console.log(res));
      } catch (erro) {
        console.error('Erro:\n', erro);
      }
    },
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
            size="lg"
            type="email"
            values={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && (
            <FormHelperText textColor="#E74C3C">{errors.email}</FormHelperText>
          )}
        </FormControl>

        <FormControl id="password" p={4} isRequired>
          <FormLabel>Senha</FormLabel>
          <Input
            size="lg"
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

        <FormControl id="username" p={4} isRequired>
          <InputGroup size="lg">
            <InputLeftAddon children="clocker.work/" />
            <Input
              type="username"
              values={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </InputGroup>
          {touched.username && (
            <FormHelperText textColor="#E74C3C">
              {errors.username}
            </FormHelperText>
          )}
        </FormControl>
        <Box p={4}>
          <Button
            colorScheme="blue"
            width="100%"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Cadastrar
          </Button>
        </Box>
      </Box>
      <Link href="/">
        <a>Já tem uma conta? Acesse!</a>
      </Link>
    </Container>
  );
}
