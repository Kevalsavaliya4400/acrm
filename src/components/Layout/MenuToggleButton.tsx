import React from 'react';
import { motion } from 'framer-motion';

interface MenuToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function MenuToggleButton({ isOpen, onClick }: MenuToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={`${isOpen ? 'Close' : 'Open'} menu`}
      aria-expanded={isOpen}
      aria-controls="sidebar"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gray-600"
      >
        <motion.path
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={{
            closed: { d: "M3 6h18M3 12h18M3 18h18" },
            open: { d: "M6 6l12 12M6 18L18 6" }
          }}
          transition={{ duration: 0.3 }}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}