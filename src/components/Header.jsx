import React from 'react';
import {
  MapPin,
  Trash2,
  Package,
  FileCheck,
  Calendar,
  CreditCard,
} from 'lucide-react';

const Header = ({ currentStep = 'Select Skip' }) => {
  const steps = [
    { id: 'postcode', label: 'Postcode', icon: MapPin },
    { id: 'waste-type', label: 'Waste Type', icon: Trash2 },
    { id: 'select-skip', label: 'Select Skip', icon: Package },
    { id: 'permit-check', label: 'Permit Check', icon: FileCheck },
    { id: 'choose-date', label: 'Choose Date', icon: Calendar },
    { id: 'payment', label: 'Payment', icon: CreditCard },
  ];

  const getCurrentStepIndex = () => {
    const stepMap = {
      'Postcode': 0,
      'Waste Type': 1,
      'Select Skip': 2,
      'Permit Check': 3,
      'Choose Date': 4,
      'Payment': 5,
    };
    return stepMap[currentStep] || 2;
  };

  const currentStepIndex = getCurrentStepIndex();

  const getStepStatus = (index) => {
    if (index < currentStepIndex) return 'completed';
    if (index === currentStepIndex) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status) => {
    const base =
      'flex items-center space-x-2 px-3 py-2 rounded-lg transition-all whitespace-nowrap text-sm';
    switch (status) {
      case 'completed':
        return `${base} bg-purple-100 text-purple-700`;
      case 'current':
        return `${base} bg-purple-600 text-white shadow-md`;
      case 'upcoming':
        return `${base} bg-gray-100 text-gray-500`;
      default:
        return base;
    }
  };

  const getIconClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'w-4 h-4 text-purple-600';
      case 'current':
        return 'w-4 h-4 text-white';
      case 'upcoming':
        return 'w-4 h-4 text-gray-400';
      default:
        return 'w-4 h-4';
    }
  };

  return (
    <div className="w-full bg-transparent">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex items-center space-x-2">
                <div className={getStepClasses(status)}>
                  <Icon className={getIconClasses(status)} />
                  <span>{step.label}</span>
                </div>
                {index !== steps.length - 1 && (
                  <svg
                    className="w-3 h-3 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Header;

