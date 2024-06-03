import { Avatar } from '@nextui-org/avatar'
import { Link } from '@nextui-org/link'
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from '@nextui-org/navbar'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import { link } from '@nextui-org/theme'

import { LogoIcon } from './icons'

import { siteConfig } from '@/site'
import { ThemeSwitch } from '@/components/theme-switch'

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand className="max-w-fit gap-3">
          <Link
            className="flex items-center justify-start gap-1"
            color="foreground"
            href="/"
          >
            <LogoIcon />
            <p className="font-bold text-inherit">Wild Rose</p>
          </Link>
        </NavbarBrand>
        <div className="ml-2 hidden justify-start gap-4 sm:flex">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NavLink
                className={({ isActive }) =>
                  clsx(
                    link({ color: 'foreground' }),
                    isActive ? 'font-medium text-primary' : ''
                  )
                }
                color="foreground"
                to={item.href}
              >
                {item.label}
              </NavLink>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent className="pl-20" justify="end">
        <ThemeSwitch />
        <Avatar
          isBordered
          radius="md"
          size="sm"
          src="https://i.pravatar.cc/150?u=a04258114e29026302d"
        />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${item.href}`}>
              <NavLink
                className={({ isActive }) =>
                  clsx(
                    index === siteConfig.navMenuItems.length - 1
                      ? link({ color: 'danger' })
                      : link({ color: 'foreground' }),
                    isActive ? 'font-medium text-primary' : ''
                  )
                }
                color="foreground"
                to={item.href}
              >
                {item.label}
              </NavLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  )
}
