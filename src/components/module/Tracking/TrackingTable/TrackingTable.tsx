'use client';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

import {
  BatteryFull,
  BatteryMedium,
  BatteryLow,
  Tag,
  Building,
} from 'lucide-react';

import { Tracking } from '@/model';

const columnHelper = createColumnHelper<Tracking>();

const columns = [
  columnHelper.display({
    id: 'index',
    header: () => <span>No</span>,
    cell: (info) => {
      return <div>{info.row.index + 1}</div>;
    },
  }),
  columnHelper.accessor('device_id', {
    cell: (info) => (
      <h6 className='font-semibold inline-flex gap-2 items-center'>
        <Tag className='text-zinc-700 w-3 h-3' strokeWidth={3} />
        <span className='font-mono p-1 rounded-md bg-zinc-200 border border-zinc-100'>
          {info.getValue()}
        </span>
      </h6>
    ),
    header: () => <span>Device ID</span>,
  }),
  columnHelper.accessor('position', {
    cell: (info) => (
      <h6 className='font-semibold inline-flex gap-2 items-center'>
        <span className='font-mono p-1 rounded-md bg-zinc-200 border border-zinc-100'>
          {info.getValue()}
        </span>
      </h6>
    ),
    header: () => <span>Position</span>,
  }),
  columnHelper.accessor('elevation', {
    header: () => <span>Elevation</span>,
    cell: (info) => (
      <h6 className='font-semibold inline-flex gap-2 items-center'>
        <Building className='text-zinc-700 w-5 h-5' strokeWidth={3} />
        <span className='font-medium text-center'>{info.getValue()}</span>
      </h6>
    ),
  }),
  columnHelper.display({
    id: 'latlong',
    header: () => <span>Latitude, Longitude</span>,
    cell: (info) => {
      return (
        <div>
          {info.row.original.latitude}, {info.row.original.longitude}
        </div>
      );
    },
  }),
  columnHelper.accessor('battery_percentage', {
    header: () => <span>Battery</span>,
    cell: (info) => {
      const battery = Number(info.getValue());
      if (battery >= 70) {
        return (
          <div className='flex flex-col xl:flex-row justify-start items-center gap-2 font-semibold'>
            <BatteryFull className='text-emerald-600' />
            <span>{info.getValue()} %</span>
          </div>
        );
      }

      if (battery >= 30 && battery <= 70) {
        return (
          <div className='flex flex-col xl:flex-row justify-start items-center gap-2 font-semibold'>
            <BatteryMedium className='text-yellow-600' />
            <span>{info.getValue()} %</span>
          </div>
        );
      }

      if (battery < 30) {
        return (
          <div className='flex flex-col xl:flex-row justify-start items-center gap-2 font-semibold'>
            <BatteryLow className='text-red-600' />
            <span>{info.getValue()} %</span>
          </div>
        );
      }
    },
  }),

  columnHelper.accessor('datetime', {
    header: () => <span>Date time</span>,
    cell: (info) => (
      <span className='text-xs font-medium'>
        {dayjs
          .unix(info.getValue())
          .tz('Asia/Kuala_Lumpur')
          .format('dddd, MMMM D, YYYY h:mm A')}
      </span>
    ),
  }),
];

interface TrackingTableProp {
  dataTracking: any[];
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
  refresh: () => void;
}

export default function TrackingTable({
  dataTracking,
  isError,
  isFetching,
  isLoading,
  refresh,
}: TrackingTableProp) {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const table = useReactTable({
    data: dataTracking,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='font-semibold text-sm'>Error</CardTitle>
        </CardHeader>
        <CardContent>Whoops something went wrong</CardContent>
      </Card>
    );
  }

  return (
    <Card className='col-auto row-auto'>
      <CardHeader>
        <div className='flex justify-between items-center'>
          <CardTitle className='font-semibold text-sm flex-1'>
            Tracking
          </CardTitle>
          <Button
            onClick={() => refresh()}
            variant='outline'
            className='flex-shrink'
          >
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className='flex items-center justify-center w-full h-56'>
            <div className='px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse '>
              loading...
            </div>
          </div>
        ) : (
          <Table className='table-auto overflow-scroll w-full'>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className='text-start'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {!dataTracking.length ? (
                <TableRow>
                  <TableCell colSpan={7} className='text-center'>
                    Empty
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {isFetching ? (
                    <TableRow>
                      <TableCell colSpan={7} className='text-center'>
                        <div className='flex items-center justify-center w-full'>
                          <div className='px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse '>
                            loading...
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          onClick={() => console.log(row)}
                          className='cursor-pointer'
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
