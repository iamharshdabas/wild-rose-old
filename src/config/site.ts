export type SiteConfig = typeof siteConfig

export const siteConfig = {
  navItems: [
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Bookings',
      href: '/bookings',
    },
    {
      label: 'Rooms',
      href: '/room',
    },
    {
      label: 'Users',
      href: '/users',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Bookings',
      href: '/bookings',
    },
    {
      label: 'Rooms',
      href: '/room',
    },
    {
      label: 'Users',
      href: '/users',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  queryKey: {
    rooms: 'rooms',
    lastRoom: 'last_room',
    settings: 'settings',
  },
}
