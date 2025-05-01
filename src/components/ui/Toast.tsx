import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning';
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    // Handle animation and auto-close
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = endTime - now;
      const newProgress = (remaining / duration) * 100;
      
      if (remaining <= 0) {
        clearInterval(timer);
        setIsVisible(false);
        setTimeout(() => onClose(), 300); // Wait for fade out animation
      } else {
        setProgress(newProgress);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [duration, onClose]);
  
  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };
  
  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      default:
        return 'text-gray-800';
    }
  };
  
  const getProgressColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div 
      className={`fixed right-4 top-4 flex items-start rounded-lg border p-4 shadow-lg ${getBgColor()} transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ maxWidth: '90vw', zIndex: 50 }}
    >
      
      <div className="mr-2 flex-1">
        <p className={`text-sm font-medium ${getTextColor()}`}>
          {message}
        </p>
      </div>
      
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose(), 300);
        }}
        className="ml-2 shrink-0 text-gray-400 transition-colors hover:text-gray-600"
      >
        X
      </button>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-1 overflow-hidden rounded-b-lg" style={{ width: `${progress}%`, transition: 'width linear' }}>
        <div className={`size-full ${getProgressColor()}`}></div>
      </div>
    </div>
  );
};

export default Toast;