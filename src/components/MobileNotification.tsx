import { useEffect } from 'react';
import { NotificationService } from '@/services/NotificationService';

const MobileNotification = () => {
  useEffect(() => {
    // Initialize notifications when component mounts
    NotificationService.initialize();
  }, []);

  return null; // This component doesn't render anything
};

export default MobileNotification;