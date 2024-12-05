/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
function RouteNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname()
  const params = useParams()

  const routes = [
    
    {
      href: `/${params.storeId}/`,
      label: 'Dashboard',
      active: pathname === `/${params.storeId}/`,
    },
    {
      href: `/${params.storeId}/priorities`,
      label: 'Priorities',
      active: pathname === `/${params.storeId}/priorities`,
    },
    {
      href: `/${params.storeId}/statuses`,
      label: 'Statuses',
      active: pathname === `/${params.storeId}/statuses`,
    },
    // {
    //   href: `/${params.storeId}/tasks`,
    //   label: 'Tasks',
    //   active: pathname === `/${params.storeId}/tasks`,
    // },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
  ]
  return (
   <nav
    className={cn('flex items-center space-x-4 mx-4 lg:mx-6 lg:space-x-6', className)}
   >
   {routes.map((route) => (
      <Link
        key={route.href}
        href={route.href}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          route.active
            ? "text-black dark:text-white"
            : "text-muted-foreground"
        )}
        >
         {route.label}
      </Link>
    ))}
   </nav>
  )
}

export default RouteNav
