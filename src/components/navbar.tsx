import { Avatar } from '@nextui-org/avatar'
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from '@nextui-org/navbar'
import { link } from '@nextui-org/theme'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

import { LogoIcon } from './icons'

import { ThemeSwitch } from '@/components/theme-switch'
import { siteConfig } from '@/config/site'

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand className="max-w-fit gap-3">
          <NavLink
            className="flex items-center justify-start gap-1"
            color="foreground"
            to="/"
          >
            <LogoIcon />
            <p className="font-bold text-inherit">Wild Rose</p>
          </NavLink>
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

      <NavbarContent justify="end">
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
                    index === siteConfig.navMenuItems.length - 1 &&
                      link({ color: 'danger' }),
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
