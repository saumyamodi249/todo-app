import React from 'react';

interface ItemNumberProps {
  count: number;
}

const ItemNumber: React.FC<ItemNumberProps> = ({ count  }) => {
  return (
    <span className="font-mono text-xs font-semibold text-zinc-700">
      {count}
    </span>
  );
};

export default ItemNumber;