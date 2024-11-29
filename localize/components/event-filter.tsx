'use client';

import React from 'react';
import { useEventFilter } from '@/providers/EventFilterProvider';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';

const EventFilter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  const { filter, setFilter } = useEventFilter();

  return (
    <div className={cn('flex items-center justify-center w-full', className)}>
      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg">
        <Input
          type="text"
          placeholder="Buscar eventos..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-4 py-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none"
        />
        <Button
          type="button"
          variant={'filter'}
          onClick={() => console.log('Pesquisar:', filter)}
        >
          <Search size={20} />
        </Button>
      </div>
    </div>
  );
};

export default EventFilter;
