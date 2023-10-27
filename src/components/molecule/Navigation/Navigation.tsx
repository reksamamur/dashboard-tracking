'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/store/sidebar';
import {
  Loader2,
  LucideIcon,
  LayoutDashboard,
  Joystick,
  ScrollText,
  ChevronLeft,
  Bus,
  DoorOpen,
  Backpack,
  AlertTriangle,
  Home,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

import { useBreakpoint } from '@/lib/breakPoints';

import {
  usePathname,
  useSearchParams,
} from 'next/navigation';
import { Button } from '@/components/ui/button';

interface Menu {
  id: number;
  icon: LucideIcon;
  name: string;
  href: string;
  slug: string;
  current: boolean;
  openSubMenu?: boolean;
  subMenu?: Menu[];
}

interface MenuGroups {
  groupId: number | string | null;
  groupName: string | null;
  subMenu: Menu[];
}

const Logo = () => {
  const sidebar = useSidebarStore();
  const { isBelowSm } = useBreakpoint('sm');

  return (
    <div className='flex justify-between items-center px-2 py-4 text-zinc-900 text-2xl font-bold border-b border-b-zinc-200'>
      <div className='flex gap-3 items-center'>
        <Loader2 className='text-blue-500' strokeWidth={4} />
        <span>Now</span>
      </div>
      <div>
        {isBelowSm ? (
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={() => sidebar.setOpen()}
          >
            <ChevronLeft />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default function Navigation() {
  const sidebar = useSidebarStore();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [hide, setHide] = useState('');
  const { isAboveSm, isBelowSm, sm } = useBreakpoint('sm');

  const menus: MenuGroups[] = [
    {
      groupId: null,
      groupName: null,
      subMenu: [
        {
          id: 890,
          icon: Home,
          name: 'Home',
          href: '/',
          slug: 'home',
          current: pathname === '/' ? true : false,
        },
      ],
    },
    {
      groupId: 189,
      groupName: 'Track',
      subMenu: [
        {
          id: 221,
          icon: Joystick,
          name: 'Tracking',
          href: '/tracking',
          slug: 'tracking',
          current: pathname === '/tracking' ? true : false,
        },
      ],
    },
    {
      groupId: 342,
      groupName: 'Analyze',
      subMenu: [
        {
          id: 123,
          icon: LayoutDashboard,
          name: 'Dashboard',
          href: '/dashboard',
          slug: 'dashboard',
          current: pathname === '/dashboard' ? true : false,
        },
        {
          id: 650,
          icon: ScrollText,
          name: 'Report',
          href: '/report',
          slug: 'report',
          current: false,
          openSubMenu: false,
          subMenu: [
            {
              id: 651,
              icon: Bus,
              name: 'Transportation',
              href: '/report/transportation',
              slug: 'transportation',
              current: pathname === '/report/transportation' ? true : false,
            },
            {
              id: 652,
              icon: DoorOpen,
              name: 'Attendance',
              href: '/report/attendance',
              slug: 'attendance',
              current: pathname === '/report/attendance' ? true : false,
            },
            {
              id: 653,
              icon: Backpack,
              name: 'Classroom Attendance',
              href: '/report/classroom_attendance',
              slug: 'classroom_attendance',
              current:
                pathname === '/report/classroom_attendance' ? true : false,
            },
            {
              id: 654,
              icon: Backpack,
              name: 'School Facilities Attendance',
              href: '/report/school_facilities_attendance',
              slug: 'school_facilities_attendance',
              current:
                pathname === '/report/school_facilities_attendance'
                  ? true
                  : false,
            },
            {
              id: 655,
              icon: AlertTriangle,
              name: 'Emergency',
              href: '/report/emergency',
              slug: 'emergency',
              current: pathname === '/report/emergency' ? true : false,
            },
          ],
        },
      ],
    },
  ];

  const [dataMenu, setDataMenu] = useState(menus)

  const hideBelowSM = () => {
    if (isBelowSm) {
      if (sidebar.open) {
        setHide('translate-x-0');
      } else {
        setHide('-translate-x-full');
      }
    } else {
      setHide('translate-x-0');
    }
  };

  useEffect(() => {
    hideBelowSM();
  }, [pathname, searchParams]);

  return (
    <aside
      id='sidebar'
      className={cn(
        'fixed top-0 left-0 z-40 w-64 h-screen transition-transform',
        hide
      )}
      aria-label='sidebar'
    >
      <div className='h-full px-3 py-1 space-y-4 overflow-y-auto bg-white border border-r-zinc-200 divide-y divide-zinc-200'>
        <Logo />
        <ul className='space-y-2 font-medium'>
          {menus.map((item, index) => {
            return (
              <li key={index}>
                {item.groupId ? (
                  <div
                    key={item.groupId}
                    className='flex items-center p-2 mt-4 text-zinc-400 text-sm font-light'
                  >
                    {item.groupName ? item.groupName.toUpperCase() : ''}
                  </div>
                ) : null}
                {item.subMenu.map((itemSub, ssindex) => {
                  if (itemSub.subMenu) {
                    return (
                      <div className='flex flex-col' key={itemSub.id}>
                        <div
                          className={cn(
                            'flex items-center justify-between cursor-pointer px-2 py-3 gap-3 rounded-lg transition-colors duration-200 hover:bg-zinc-50 hover:text-zinc-900',
                            dataMenu[index].subMenu[ssindex].openSubMenu
                              ? 'bg-zinc-100 text-zinc-900'
                              : 'bg-white text-zinc-500'
                          )}
                        >
                          <div className='flex gap-3 items-center flex-1'>
                            <itemSub.icon strokeWidth={2} className='w-4 h-4' />
                            <span className='text-base'>{itemSub.name}</span>
                          </div>

                          {menus[index].subMenu[ssindex].openSubMenu ? (
                            <ChevronDown />
                          ) : (
                            <ChevronUp />
                          )}
                        </div>

                        {itemSub.subMenu.map((itemSSub) => (
                          <Link
                            key={itemSSub.id}
                            href={itemSSub.href}
                            className={cn(
                              'flex items-center px-4 py-3 gap-3 rounded-lg transition-colors duration-200 hover:bg-zinc-50 hover:text-zinc-900',
                              itemSSub.current
                                ? 'bg-zinc-100 text-zinc-900'
                                : 'bg-white text-zinc-500'
                            )}
                          >
                            <itemSSub.icon
                              strokeWidth={2}
                              className='w-4 h-4'
                            />
                            <span className='text-base'>{itemSSub.name}</span>
                          </Link>
                        ))}
                      </div>
                    );
                  } else {
                    return (
                      <Link
                        key={itemSub.id}
                        href={itemSub.href}
                        className={cn(
                          'flex items-center px-2 py-3 gap-3 rounded-lg transition-colors duration-200 hover:bg-zinc-50 hover:text-zinc-900',
                          itemSub.current
                            ? 'bg-zinc-100 text-zinc-900'
                            : 'bg-white text-zinc-500'
                        )}
                      >
                        <itemSub.icon strokeWidth={2} className='w-4 h-4' />
                        <span className='text-base'>{itemSub.name}</span>
                      </Link>
                    );
                  }
                })}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
