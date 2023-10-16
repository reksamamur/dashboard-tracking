'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Summary() {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='font-semibold text-sm'>Summary</CardTitle>
      </CardHeader>
      <CardContent className='space-y-10'>
        <div className='grid grid-cols-1 xl:grid-cols-2 w-full gap-6'>
          <div className='flex flex-col gap-2'>
            <span className='text-xs text-zinc-500'>Today total time</span>
            <h6 className='text-2xl font-bold'>25 hr 20 min</h6>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-xs text-zinc-500'>Today total movement</span>
            <h6 className='space-x-2'>
              <span className='text-2xl font-bold inline-flex items-center gap-1'>
                <Loader2 strokeWidth={4} className='w-5 h-5' />
                80 %
              </span>
              <span className='text-base text-zinc-500'>of 10 hr 0 min</span>
            </h6>
          </div>
        </div>
        <div className='grid grid-cols-1 xl:grid-cols-2 w-full gap-6'>
          <div className='relative space-y-3'>
            <h4 className='text-zinc-700 font-semibold'>Most visited</h4>

            <div className='w-full space-y-2'>
              <div className='flex justify-between items-center'>
                <span className='flex-1 text-xs text-zinc-500'>Location</span>
                <span className='flex-1 text-xs text-zinc-500 text-end'>
                  Visit
                </span>
              </div>

              <div className='w-full flex justify-between items-center'>
                <div className='bg-blue-100 w-3/4 rounded-md text-zinc-900 font-medium p-2 items-center'>
                  Canteen
                </div>
                <span className='font-medium'>80</span>
              </div>

              <div className='w-full flex justify-between items-center'>
                <div className='bg-blue-100 w-1/2 rounded-md text-zinc-900 font-medium p-2 items-center'>
                  Toilet
                </div>
                <span className='font-medium'>30</span>
              </div>

              <div className='w-full flex justify-between items-center'>
                <div className='bg-blue-100 w-2/3 rounded-md text-zinc-900 font-medium p-2 items-center'>
                  Lobby
                </div>
                <span className='font-medium'>40</span>
              </div>

              <div className='w-full flex justify-between items-center'>
                <div className='bg-blue-100 w-1/4 rounded-md text-zinc-900 font-medium p-2 items-center'>
                  Classroom A2
                </div>
                <span className='font-medium'>20</span>
              </div>

              <div className='w-full flex justify-between items-center'>
                <div className='bg-blue-100 w-1/4 rounded-md text-zinc-900 font-medium p-2 items-center'>
                  Classroom A3
                </div>
                <span className='font-medium'>20</span>
              </div>
            </div>
          </div>

          <div className='relative flex items-center justify-center h-full'>
            <Doughnut
              data={{
                datasets: [
                  {
                    data: [80, 20],
                    borderRadius: 99,
                    backgroundColor: ['#48BB78', '#EDF2F7'],
                    borderWidth: 0,
                  },
                ],
              }}
              options={{
                cutout: '80%',
              }}
              plugins={[
                {
                  id: 'text',
                  beforeDatasetDraw(chart, args, plugin) {
                    const { ctx, data } = chart;
                    ctx.save();
                    const xCor = chart.getDatasetMeta(0).data[0].x;
                    const yCor = chart.getDatasetMeta(0).data[0].y;
                    ctx.font = 'bold 35px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('80 %', xCor, yCor);
                  },
                },
              ]}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
