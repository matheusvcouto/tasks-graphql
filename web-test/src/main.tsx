import './index.css'

import ReactDOM from 'react-dom/client'

import { ApolloProvider } from '@apollo/client'
import { client as apolloClient } from './apollo/client.ts'
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { AuthProvider } from "./providers/auth-provider.tsx"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as JotaiProvider } from 'jotai'
import { routeTree } from "./routeTree.gen.ts"
import React, { Suspense } from "react"


const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
          <JotaiProvider>
            <AuthProvider>
              <RouterProvider router={router} />
            </AuthProvider>
          </JotaiProvider>
        </QueryClientProvider>
    </ApolloProvider>
  </React.StrictMode>,
)
