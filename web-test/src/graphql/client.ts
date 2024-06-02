import { GraphQLClient, ClientError } from 'graphql-request'

const client = new GraphQLClient('http://localhost:3333/graphql/')


export { client as gqlClient }