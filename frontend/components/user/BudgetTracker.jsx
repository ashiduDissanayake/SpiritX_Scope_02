'use client';

import { useTeam } from '@/context/TeamContext';
import styles from './BudgetTracker.module.css';

export default function BudgetTracker() {
  const { team } = useTeam();
  const { budgetSpent, remainingBudget } = team;
  
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
  
  return (
    <div className={styles.budgetTracker}>
      <h2>Team Budget</h2>
      
      <div className={styles.budgetInfo}>
        <div className={styles.budgetItem}>
          <span className={styles.budgetLabel}>Initial Budget:</span>
          <span className={styles.budgetValue}>₹9,000,000</span>
        </div>
        
        <div className={styles.budgetItem}>
          <span className={styles.budgetLabel}>Spent:</span>
          <span className={styles.budgetValue}>{formatCurrency(budgetSpent)}</span>
        </div>
        
        <div className={styles.budgetItem}>
          <span className={styles.budgetLabel}>Remaining:</span>
          <span className={styles.budgetValue}>{formatCurrency(remainingBudget)}</span>
        </div>
      </div>
      
      <div className={styles.progressBarContainer}>
        <div 
          className={styles.progressBar} 
          style={{ width: `${spentPercentage}%` }}
        ></div>
      </div>
      
      <div className={styles.percentageLabel}>
        {spentPercentage.toFixed(1)}% Used
      </div>
    </div>
  );
}