'use client';
import React from 'react';

interface RevenueDetailsProps {
  totalRevenue: number;
  totalExpectedRevenue: number;
}

const RevenueDetails: React.FC<RevenueDetailsProps> = ({
  totalRevenue,
  totalExpectedRevenue,
}) => (
  <>
    <p>
      Lucro Total Esperado:
      <span className="font-bold"> R$ {totalExpectedRevenue.toFixed(2)}</span>
    </p>
    <p>
      Lucro Total Atual:
      <span className="font-bold"> R$ {totalRevenue.toFixed(2)}</span>
    </p>
  </>
);

export default RevenueDetails;
