import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export function useNavigationState() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => 
    window.localStorage.getItem('sidebarCollapsed') === 'true'
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Persist sidebar state
  useEffect(() => {
    window.localStorage.setItem('sidebarCollapsed', String(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = useCallback(() => {
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(prev => !prev);
    } else {
      setIsSidebarCollapsed(prev => !prev);
    }
  }, []);

  return {
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleSidebar
  };
}