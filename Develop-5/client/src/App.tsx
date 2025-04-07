import { Outlet } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import  Navbar  from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // uri: '/graphql',
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
function App() {
  return (
    <ApolloProvider client={client}>  
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
