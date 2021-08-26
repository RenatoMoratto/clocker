import Link from 'next/link';
import { useFormik } from 'formik';
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
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';

import { Logo } from '../components/Logo';
import firebase, { persistenceMode } from '../config/firebase';

export default function Home() {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('E-mail inválido')
      .required('Preenchimento obrigatório'),
    password: yup.string().required('Preenchimento obrigatório'),
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
      firebase.auth().setPersistence(persistenceMode);

      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(values.email, values.password)
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

        <Box p={4}>
          <Button
            colorScheme="blue"
            width="100%"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Entrar
          </Button>
        </Box>
      </Box>
      <Link href="/signup">
        <a>Ainda não tem uma conta? Cadastre-se!</a>
      </Link>
    </Container>
  );
}
