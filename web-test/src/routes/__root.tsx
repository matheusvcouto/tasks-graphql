import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import React, { Suspense } from 'react'
import { AuthContext } from '../hooks/useAuth';

// @ts-expect-error
const TanStackRouterDevtools = process.env.NODE_ENV === 'production'
  ? () => null // Render nothing in production
  : React.lazy(() =>
    // Lazy load in development
    import('@tanstack/router-devtools').then((res) => ({
      default: res.TanStackRouterDevtools,
      // For Embedded Mode
      // default: res.TanStackRouterDevtoolsPanel
    })),
  )

type RouterContext = {
  authentication?: AuthContext
};

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/auth/user"  className="[&.active]:font-bold">
          AuthUser
        </Link>{' '}
        <Link to="/auth" className="[&.active]:font-bold">
          Auth
        </Link>
      </div>
      <hr />
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>

    </>
  ),
})
