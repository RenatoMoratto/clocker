import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFetch } from '@refetty/react';
import axios from 'axios';
import { addDays, subDays, format } from 'date-fns';

import {
  Box,
  Container,
  IconButton,
  SimpleGrid,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import { Logo, formatDate, TimeBlock } from '../components';

const getSchedule = async ({ when, username }) =>
  axios({
    method: 'get',
    url: '/api/schedule',
    params: {
      username,
      date: format(when, 'yyyy-MM-dd'),
    },
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

export default function Schedule() {
  const router = useRouter();
  const [when, setWhen] = useState(() => new Date());
  const [data, { loading }, fetch] = useFetch(getSchedule, {
    lazy: true,
  });

  const addDay = () => {
    setWhen((prevState) => addDays(prevState, 1));
  };
  const removeDay = () => {
    setWhen((prevState) => subDays(prevState, 1));
  };

  const refresh = () => {
    fetch({ when, username: router.query.username });
  };

  useEffect(() => {
    refresh();
  }, [when, router.query.username]);

  return (
    <Container>
      <Header>
        <Link href="/">
          <Logo size={150} />
        </Link>
      </Header>

      <Box mt={8} display="flex" alignItems="center">
        <IconButton
          icon={<ChevronLeftIcon />}
          bg="transparent"
          onClick={removeDay}
        />
        <Box flex={1} textAlign="center">
          {formatDate(when, 'PPPP')}
        </Box>
        <IconButton
          icon={<ChevronRightIcon />}
          bg="transparent"
          onClick={addDay}
        />
      </Box>

      <SimpleGrid p={4} columns={2} spacing={4}>
        {loading && (
          <Center width="200%" height="100%">
            <Spinner
              tickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        )}
        {data?.map(({ time, isBlocked }) => (
          <TimeBlock
            key={time}
            time={time}
            date={when}
            disabled={isBlocked}
            onSucess={refresh}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}
