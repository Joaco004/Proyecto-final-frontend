import React, { useEffect } from 'react';

const ToastMessage = ({ msg, type = 'success', onClose }) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';
  
  const boxClass = isSuccess ? 'toast-success' : 'toast-error';
  const titleColorClass = isSuccess ? 'text-success-gamer' : 'text-error-gamer';
  const progressColorClass = isSuccess ? 'bg-success-gamer' : 'bg-error-gamer';
  const icon = isSuccess ? '✅ Misión Cumplida' : '❌ Error de Sistema';

  return (
    <div className="toast-overlay">
      <div className={`toast-box ${boxClass}`}>
        
        <h2 className={`toast-title ${titleColorClass}`}>
          {icon}
        </h2>
        
        <p className="toast-message-text">
          {msg}
        </p>
        
        <div className="toast-progress-bg">
            <div className={`toast-progress-fill ${progressColorClass}`} />
        </div>

      </div>
    </div>
  );
};

export { ToastMessage };