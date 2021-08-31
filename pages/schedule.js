import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFetch } from '@refetty/react';
import axios from 'axios';
import { addDays, subDays } from 'date-fns';
import {
  Box,
  Button,
  Container,
  IconButton,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import { useAuth, Logo, formatDate } from '../components';

const getSchedule = async (when) =>
  axios({
    method: 'get',
    url: '/api/schedule',
    params: { when, username: window.location.pathname },
  });

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

function TimeBlock(props) {
  return (
    <Button p={8}  bg="blue.500" color="white" >
      {props.time}
    </Button>
  );
}

export default function Schedule() {
  const [auth, { logout }] = useAuth();
  const router = useRouter();
  const [when, setWhen] = useState(() => new Date());
  const [data, { loading, status, error }, fetch] = useFetch(getSchedule, {
    lazy: true,
  });

  const addDay = () => {
    setWhen((prevState) => addDays(prevState, 1));
  };
  const removeDay = () => {
    setWhen((prevState) => subDays(prevState, 1));
  };

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

      <SimpleGrid p={4} columns={2} spacing={4}>
        {loading && (
          <Spinner
            tickness="4px"
            speed="0.65s"
            emptyColor="gary.200"
            color="blue.500"
            size="xl"
          />
        )}
        {data?.map((time) => (
          <TimeBlock time={time} key={time}/>
        ))}
      </SimpleGrid>
    </Container>
  );
}
