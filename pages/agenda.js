import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFetch } from '@refetty/react';
import axios from 'axios';
import { addDays, subDays, format } from 'date-fns';
import {
  Box,
  Button,
  Center,
  Container,
  IconButton,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import { getToken } from '../config/firebase/client';
import { useAuth, Logo, formatDate } from '../components';

const getAgenda = async (when) => {
  const token = await getToken();

  return axios({
    method: 'get',
    url: '/api/agenda',
    params: { date: format(when, 'yyyy-MM-dd') },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

function Header({ children }) {
  return (
    <Box
      p={4}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      {children}
    </Box>
  );
}

const AgendaBlock = ({ time, name, phone, ...props }) => (
  <Box {...props} display="flex" bg="gray.100" borderRadius={8} p={4} alignItems="center">
    <Box flex={1} >{time}</Box>
    <Box textAlign="right">
      <Text fontSize="2xl">{name}</Text>
      <Text>{phone}</Text>
    </Box>
  </Box>
);

export default function Agenda() {
  const [auth, { logout }] = useAuth();
  const router = useRouter();
  const [when, setWhen] = useState(() => new Date());
  const [data, { loading }, fetch] = useFetch(getAgenda, {
    lazy: true,
  });

  const addDay = () => {
    setWhen((prevState) => addDays(prevState, 1));
  };
  const removeDay = () => {
    setWhen((prevState) => subDays(prevState, 1));
  };

  useEffect(() => {
    !auth.user && router.push('/');
  }, [auth.user]);

  useEffect(() => {
    fetch(when);
  }, [when]);

  return (
    <Container>
      <Header>
        <Logo size={150} />
        <Button onClick={logout}>Sair</Button>
      </Header>

      <Box mt={8} display="flex" alignItems="center">
        <IconButton icon={<ChevronLeftIcon />} onClick={removeDay} />
        <Box flex={1} textAlign="center">
          {formatDate(when, 'PPPP')}
        </Box>
        <IconButton icon={<ChevronRightIcon />} onClick={addDay} />
      </Box>

      {loading && (
        <Center width="100%" height="100%">
          <Spinner
            tickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      )}

      {data?.map((doc) => (
        <AgendaBlock
          key={doc.id}
          time={doc.time}
          name={doc.name}
          phone={doc.phone}
          mt={4}
        />
      ))}
    </Container>
  );
}
