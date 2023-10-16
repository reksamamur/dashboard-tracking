'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const labels = [
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
];

export default function Productivity() {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='font-semibold text-sm'>Productivity</CardTitle>
      </CardHeader>
      <CardContent className='space-y-10 w-full'>
        <Bar
          options={{
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  display: false,
                },
                grid: {
                  display: false,
                },
              },
              x: {
                beginAtZero: true,
                ticks: {
                  display: true,
                },
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
          data={{
            labels,
            datasets: [
              {
                data: labels.map(() =>
                  faker.number.int({ min: 0, max: 1000 })
                ),
                backgroundColor: 'rgba(59, 130, 246, 1)',
                borderRadius: 99,
              },
            ],
          }}
        />
      </CardContent>
    </Card>
  );
}
