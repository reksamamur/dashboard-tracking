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
  ChevronLeft
} from 'lucide-react';

import { useBreakpoint } from '@/lib/breakPoints';

import { useSelectedLayoutSegment } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface Menu {
  id: number;
  icon: LucideIcon;
  name: string;
  href: string;
  slug: string;
  current: boolean;
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
  const segment = useSelectedLayoutSegment();
  const sidebar = useSidebarStore();

  const [hide, setHide] = useState('');
  const { isAboveSm, isBelowSm, sm } = useBreakpoint('sm');

  const menus: MenuGroups[] = [
    {
      groupId: null,
      groupName: null,
      subMenu: [
        {
          id: 0,
          icon: LayoutDashboard,
          name: 'Dashboard',
          href: '/dashboard',
          slug: 'dashboard',
          current: segment === 'dashboard' ? true : false,
        },
      ],
    },
    {
      groupId: 1,
      groupName: 'Track',
      subMenu: [
        {
          id: 0,
          icon: Joystick,
          name: 'Tracking',
          href: '/tracking',
          slug: 'tracking',
          current: segment === 'tracking' ? true : false,
        },
      ],
    },
    {
      groupId: 2,
      groupName: 'Analyze',
      subMenu: [
        {
          id: 0,
          icon: ScrollText,
          name: 'Report',
          href: '/report',
          slug: 'report',
          current: segment === 'report' ? true : false,
        },
      ],
    },
  ];

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
  });

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
                    className='flex items-center p-2 mt-2 text-zinc-400 text-sm'
                  >
                    {item.groupName ? item.groupName.toUpperCase() : ''}
                  </div>
                ) : null}
                {item.subMenu.map((itemSub) => (
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
                ))}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
