import { TodayTable, Summary, Productivity } from '@/components/module/Dashboard';

export default function Dashboard() {
  return (
    <div className='grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-6'>
      <TodayTable />
      <Summary />
      <Productivity />
    </div>
  );
}
