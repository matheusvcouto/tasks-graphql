/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LogoutImport } from './routes/logout'
import { Route as LoginImport } from './routes/login'
import { Route as AuthLayoutImport } from './routes/auth/_layout'
import { Route as AuthLayoutIndexImport } from './routes/auth/_layout/index'
import { Route as AuthLayoutUserImport } from './routes/auth/_layout/user'
import { Route as AuthLayoutTasksImport } from './routes/auth/_layout/tasks'

// Create Virtual Routes

const AuthImport = createFileRoute('/auth')()

// Create/Update Routes

const AuthRoute = AuthImport.update({
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const LogoutRoute = LogoutImport.update({
  path: '/logout',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthLayoutRoute = AuthLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLayoutIndexRoute = AuthLayoutIndexImport.update({
  path: '/',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutUserRoute = AuthLayoutUserImport.update({
  path: '/user',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutTasksRoute = AuthLayoutTasksImport.update({
  path: '/tasks',
  getParentRoute: () => AuthLayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/logout': {
      id: '/logout'
      path: '/logout'
      fullPath: '/logout'
      preLoaderRoute: typeof LogoutImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/auth/_layout': {
      id: '/auth/_layout'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthLayoutImport
      parentRoute: typeof AuthRoute
    }
    '/auth/_layout/tasks': {
      id: '/auth/_layout/tasks'
      path: '/tasks'
      fullPath: '/auth/tasks'
      preLoaderRoute: typeof AuthLayoutTasksImport
      parentRoute: typeof AuthLayoutImport
    }
    '/auth/_layout/user': {
      id: '/auth/_layout/user'
      path: '/user'
      fullPath: '/auth/user'
      preLoaderRoute: typeof AuthLayoutUserImport
      parentRoute: typeof AuthLayoutImport
    }
    '/auth/_layout/': {
      id: '/auth/_layout/'
      path: '/'
      fullPath: '/auth/'
      preLoaderRoute: typeof AuthLayoutIndexImport
      parentRoute: typeof AuthLayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  LoginRoute,
  LogoutRoute,
  AuthRoute: AuthRoute.addChildren({
    AuthLayoutRoute: AuthLayoutRoute.addChildren({
      AuthLayoutTasksRoute,
      AuthLayoutUserRoute,
      AuthLayoutIndexRoute,
    }),
  }),
})

/* prettier-ignore-end */
