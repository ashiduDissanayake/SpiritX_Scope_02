'use client';
import { useEffect } from 'react';
import { useTeam } from '@/context/TeamContext';

export default function BudgetTracker() {
  const { team } = useTeam();
  const { budgetSpent, remainingBudget } = team;

  // Store remaining budget in local storage whenever it changes
  useEffect(() => {
    if (remainingBudget !== undefined) {
      localStorage.setItem('remainingBudget', remainingBudget);
    }
  }, [remainingBudget]);

  // Format currency (player value)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Calculate percentage of budget spent
  const spentPercentage = (budgetSpent / 9000000) * 100;
  const dangerZone = remainingBudget < 1000000;

  return (
    <div className="bg-dark-lighter rounded-xl p-5 border border-dark-lightest">
      <h2 className="text-lg font-semibold text-light mb-4">Team Budget</h2>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-light-darker text-sm">Initial Budget:</span>
          <span className="text-light font-medium">LKR 9,000,000</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-light-darker text-sm">Spent:</span>
          <span className="text-primary-light font-medium">{formatCurrency(budgetSpent)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-light-darker text-sm">Remaining:</span>
          <span className={`font-medium ${dangerZone ? 'text-boundary' : 'text-secondary-light'}`}>
            {formatCurrency(remainingBudget)}
          </span>
        </div>
      </div>

      <div className="mt-4 h-2 bg-dark rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${spentPercentage > 80 ? 'bg-boundary' : 'bg-primary'}`}
          style={{ width: `${spentPercentage}%` }}
        ></div>
      </div>

      <div className="mt-1 flex justify-end">
        <span className={`text-xs ${spentPercentage > 80 ? 'text-boundary' : 'text-light-darker'}`}>
          {spentPercentage.toFixed(1)}% Used
        </span>
      </div>

      {dangerZone && (
        <div className="mt-3 text-boundary text-xs flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Low budget remaining
        </div>
      )}
    </div>
  );
}
