import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFetch } from '@refetty/react';
import axios from 'axios';
import { addDays, subDays } from 'date-fns';
import { Box, Button, Container, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import { getToken } from '../config/firebase/client';
import { useAuth, Logo, formatDate } from '../components';

const getAgenda = async (when) => {
  const token = await getToken();

  return axios({
    method: 'get',
    url: '/api/agenda',
    params: { when },
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

export default function Agenda() {
  const [auth, { logout }] = useAuth();
  const router = useRouter();
  const [when, setWhen] = useState(() => new Date());
  const [data, { loading, status, error }, fetch] = useFetch(getAgenda, {
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
    </Container>
  );
}
