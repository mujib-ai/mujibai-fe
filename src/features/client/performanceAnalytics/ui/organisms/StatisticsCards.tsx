'use client';

import StatisticsCard from '../atoms/StatisticsCard';

export default function StatisticsCards({
  t,
}: {
  t: (key: string) => string;
}) {
  const statisticsCardsData = [
    { icon: '/dashboard-images/calla.svg', number: '9', title: t('totalCalls') },
    {
      icon: '/dashboard-images/timer.svg',
      number: '124',
      title: t('averageCallDuration'),
    },
    {
      icon: '/dashboard-images/tickets.svg',
      number: '4',
      title: t('ticketsCreated'),
    },
    {
      icon: '/dashboard-images/correct-call.svg',
      number: '124',
      title: t('answeredCalls'),
    },
    {
      icon: '/dashboard-images/success-calls.svg',
      number: '104',
      title: t('customerSatisfaction'),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {statisticsCardsData.map((item, index) => (
        <StatisticsCard
          key={index}
          icon={item.icon}
          number={item.number}
          title={item.title}
        />
      ))}
    </div>
  );
}
