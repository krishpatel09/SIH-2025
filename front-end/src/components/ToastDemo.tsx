'use client';

import React from 'react';
import { useToast } from '@/hooks/useToast';
import { CheckCircle, XCircle, Info, AlertTriangle, Loader } from 'lucide-react';

export const ToastDemo: React.FC = () => {
  const { showSuccess, showError, showInfo, showWarning, showLoading, dismiss } = useToast();

  const handleSuccessToast = () => {
    showSuccess('This is a success message!');
  };

  const handleErrorToast = () => {
    showError('This is an error message!');
  };

  const handleInfoToast = () => {
    showInfo('This is an info message!');
  };

  const handleWarningToast = () => {
    showWarning('This is a warning message!');
  };

  const handleLoadingToast = () => {
    const loadingId = showLoading('Loading...');
    
    // Simulate async operation
    setTimeout(() => {
      dismiss(loadingId);
      showSuccess('Loading completed!');
    }, 2000);
  };

  const handleDismissAll = () => {
    dismiss();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Toast Notification Demo</h3>
      <p className="text-gray-600 mb-6">Click the buttons below to test different types of toast notifications:</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button
          onClick={handleSuccessToast}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <CheckCircle className="w-4 h-4" />
          Success Toast
        </button>
        
        <button
          onClick={handleErrorToast}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <XCircle className="w-4 h-4" />
          Error Toast
        </button>
        
        <button
          onClick={handleInfoToast}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Info className="w-4 h-4" />
          Info Toast
        </button>
        
        <button
          onClick={handleWarningToast}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          <AlertTriangle className="w-4 h-4" />
          Warning Toast
        </button>
        
        <button
          onClick={handleLoadingToast}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          <Loader className="w-4 h-4" />
          Loading Toast
        </button>
        
        <button
          onClick={handleDismissAll}
          className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <XCircle className="w-4 h-4" />
          Dismiss All
        </button>
      </div>
    </div>
  );
};
