'use client';

import dayjs from 'dayjs';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { AlignJustify } from 'lucide-react';
import { useSidebarStore } from '@/store/sidebar';
import { useBreakpoint } from '@/lib/breakPoints';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function Header() {
  const sidebar = useSidebarStore();
  const { isBelowSm } = useBreakpoint('sm');

  return (
    <nav className='bg-white border-b border-zinc-200 shadow-sm px-4 py-6 flex justify-between items-center'>
      <div className='inline-flex gap-2 flex-1'>
        {isBelowSm ? (
          <Button
            type='button'
            variant='outline'
            size='icon'
            onClick={() => sidebar.setOpen()}
          >
            <AlignJustify />
          </Button>
        ) : null}

        <span>{dayjs().format('dddd, MMMM D, YYYY')}</span>
      </div>
      <div>
        <div className='inline-flex items-center gap-2 rounded-lg p-2 cursor-pointer hover:bg-zinc-100'>
          <span className='font-semibold text-lg'>Lisa</span>
          <div className='relative w-8 h-8'>
            <Image
              alt='profile pic'
              className='h-full w-full object-cover rounded-full'
              src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
              height={512}
              width={512}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
