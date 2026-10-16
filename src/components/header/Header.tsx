import React from 'react';
import TaskTitleCount from './TaskTitleCount';
import Avatar from './Avatar';

interface HeaderProps {
  taskCount?: number;
}

const Header: React.FC<HeaderProps> = ({ taskCount = 0 }) => {
  return (
    <header className="flex justify-between items-center w-full px-6 py-4 border-b border-zinc-200 bg-white">
      <TaskTitleCount count={taskCount} />
      <Avatar />
    </header>
  );
};

export default Header;