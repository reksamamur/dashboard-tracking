'use client';

import { Chart as ChartJS, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Legend);

type DoughnutBustAttendanceProp = {
  firstValue: number;
  secondValue: number;
};

export default function DoughnutBustAttendance({
  firstValue,
  secondValue,
}: DoughnutBustAttendanceProp) {
  return (
    <div className='relative w-24 h-24'>
      <Doughnut
        data={{
          datasets: [
            {
              data: [firstValue, secondValue],
              borderRadius: 99,
              backgroundColor: ['#48BB78', '#EDF2F7'],
              borderWidth: 0,
            },
          ],
        }}
        options={{
          cutout: '70%',
        }}
      />
    </div>
  );
}
