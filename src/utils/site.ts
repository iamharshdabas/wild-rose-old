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
      label: 'Guests',
      href: '/guests',
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
      label: 'Guests',
      href: '/guests',
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
    guests: 'guests',
    rooms: 'rooms',
    lastRoom: 'last_room',
    settings: 'settings',
  },
}
