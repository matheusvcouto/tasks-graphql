import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie'

const httpLink = createHttpLink({
  uri: 'http://localhost:3333/graphql/', // Altere para a URL da sua API GraphQL
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('user');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export { client }