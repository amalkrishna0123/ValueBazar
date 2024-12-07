import React from 'react';
import { getDatabase, ref, update } from 'firebase/database';

const StatusToggle = ({ userId, currentStatus }) => {

    const [status, setStatus] = React.useState(currentStatus);
  const [isLoading, setIsLoading] = React.useState(false);

  const toggleStatus = async () => {
    setIsLoading(true);
    const newStatus = status === 'disabled' ? 'active' : 'disabled';
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);
    
    try {
      await update(userRef, {
        status: newStatus
      });
      setStatus(newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleStatus}
      disabled={isLoading}
      className={`px-4 py-1 rounded-full text-white text-sm font-medium ${
        status === 'active' 
          ? 'bg-green-500 hover:bg-green-600' 
          : 'bg-red-500 hover:bg-red-600'
      } transition-colors duration-200`}
    >
      {isLoading ? 'Updating...' : status}
    </button>
  )
}

export default StatusToggle
