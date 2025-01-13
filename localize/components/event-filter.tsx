'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface EventFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  filter: string;
  setFilter: (filter: string) => void;
}

const EventFilter: React.FC<EventFilterProps> = ({
  className,
  filter,
  setFilter,
}) => {
  const router = useRouter();
  const [search, setSearch] = useState(filter);

  const handleSearch = () => {
    if (search) {
      setFilter(search);
      router.push(`/eventos?txt_busca=${search}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={cn('flex items-center justify-center w-full', className)}>
      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg">
        <Input
          type="text"
          placeholder="Buscar eventos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full px-4 py-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none"
        />
        <Button
          type="button"
          variant={'filter'}
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <Search size={20} />
        </Button>
      </div>
    </div>
  );
};

export default EventFilter;
