import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { link as linkStyles } from '@nextui-org/theme';
import NextLink from 'next/link';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/theme-switch';
import { HeartFilledIcon, LogoIcon } from '@/components/icons';
import { subtitle } from './primitives';

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth='xl' position='sticky'>
      <NavbarContent className='basis-1/5 md:basis-full' justify='start'>
        <NavbarBrand className='gap-3 max-w-fit'>
          <NextLink className='flex justify-start items-center gap-1' href='/'>
            <LogoIcon />
          </NextLink>
        </NavbarBrand>
        <NextLink
          className='flex w-full items-center gap-1 text-start justify-cstartnter'
          href='/'
        >
          <h4
            className={
              'hidden tracking-tight md:inline font-semibold from-[#FF72E1] to-[#F54C7A] text-md bg-clip-text text-transparent bg-gradient-to-b'
            }
          >
            น้ำท่วมภาคใต้67.com
          </h4>
        </NextLink>
        {/* <div className='hidden md:flex gap-4 justify-start ml-2'>
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-md data-[active=true]:font-medium'
                )}
                color='foreground'
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </div> */}
      </NavbarContent>

      {/* <NavbarContent
        className='hidden md:flex basis-1/5 md:basis-full'
        justify='end'
      >
        <NavbarItem className='hidden md:flex gap-2'>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className='hidden md:flex'>
          <Button
            isExternal
            as={Link}
            className='text-md font-normal text-default-600 bg-background'
            href={'https://buymeacoffee.com/rommadon21j'}
            startContent={<HeartFilledIcon className='text-danger' />}
            variant='flat'
          >
            สนับสนุน
          </Button>
        </NavbarItem>
      </NavbarContent> */}

      <NavbarContent className='basis-1 pl-4' justify='end'>
        <ThemeSwitch />

        <Button
          isExternal
          as={Link}
          className='text-md font-normal text-default-600 bg-background'
          href={'https://buymeacoffee.com/rommadon21j'}
          startContent={<HeartFilledIcon className='text-danger' />}
          variant='flat'
        >
          สนับสนุน
        </Button>

        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className='top-36'>
        <div className='mx-4 mt-6 flex flex-col gap-6'>
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color={'foreground'} href={item.href} size='lg'>
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
