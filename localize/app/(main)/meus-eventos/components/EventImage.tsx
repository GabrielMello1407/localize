'use client';
import Image from 'next/image';
import React from 'react';

interface EventImageProps {
  imageUrl: string;
  name: string;
}

const EventImage: React.FC<EventImageProps> = ({ imageUrl, name }) => (
  <Image
    src={imageUrl}
    alt={name}
    width={400}
    height={300}
    style={{ width: 'auto', height: 'auto' }}
    priority
  />
);

export default EventImage;
