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
import { cn } from '@nextui-org/theme'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Tent } from 'lucide-react'

import { siteConfig } from '@/config/site'
import { ThemeSwitch } from '@/components/theme-switch'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <NextUINavbar
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand className="max-w-fit">
          <NavLink
            className="flex items-center justify-start gap-2"
            color="foreground"
            to="/"
          >
            <Tent />
            <p className="font-bold text-inherit">Wild Rose</p>
          </NavLink>
        </NavbarBrand>
        <div className="ml-2 hidden justify-start gap-4 sm:flex">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NavLink
                className={({ isActive }) => cn(isActive && 'text-primary')}
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
        <div className="m-4 flex flex-col gap-4">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${item.href}`}>
              <NavLink
                className={({ isActive }) =>
                  cn(
                    'text-4xl font-bold',
                    index === siteConfig.navMenuItems.length - 1 &&
                      'text-danger',
                    isActive && 'text-primary'
                  )
                }
                color="foreground"
                to={item.href}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
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
