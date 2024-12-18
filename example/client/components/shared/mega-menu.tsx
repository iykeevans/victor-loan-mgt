import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const menuItems = [
  {
    title: 'Products',
    items: ['Featured', 'Categories', 'New Arrivals', 'Best Sellers', 'Special Offers'],
  },
  {
    title: 'Solutions',
    items: ['For Individuals', 'For Teams', 'For Enterprise', 'Case Studies', 'Resources'],
  },
  {
    title: 'Company',
    items: ['About Us', 'Careers', 'Press', 'Blog', 'Contact'],
  },
  {
    title: 'Support',
    items: ['Help Center', 'Documentation', 'Community', 'Training', 'Status'],
  },
]

export function MegaMenu() {
  return (
    <header className="bg-background shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Logo
            </Link>
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item.items.map((subItem) => (
                        <li key={subItem}>
                          <NavigationMenuLink asChild>
                            <a
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              href="#"
                            >
                              {subItem}
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden md:block">
            <Button variant="outline" className="mr-2">
              Log In
            </Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

