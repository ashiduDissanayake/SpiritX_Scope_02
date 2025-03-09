'use client';
import { useTeam } from '@/context/TeamContext';

export default function TeamCompletenessIndicator() {
  const { team } = useTeam();
  const { totalPlayers } = team;
  
  // Calculate completion percentage
  const completionPercentage = (totalPlayers / 11) * 100;
  
  // Determine status and color based on completeness
  const getStatusInfo = () => {
    if (totalPlayers === 11) {
      return {
        text: 'Complete',
        colorClass: 'bg-secondary',
        textClass: 'text-secondary'
      };
    } else if (totalPlayers > 7) {
      return {
        text: 'Almost Complete',
        colorClass: 'bg-accent',
        textClass: 'text-accent'
      };
    } else {
      return {
        text: 'Incomplete',
        colorClass: 'bg-primary',
        textClass: 'text-primary-light'
      };
    }
  };
  
  const { text, colorClass, textClass } = getStatusInfo();
  
  return (
    <div className="bg-dark-lighter rounded-xl p-5 border border-dark-lightest">
      <h2 className="text-lg font-semibold text-light mb-4">Team Status</h2>
      
      <div className="h-2 bg-dark rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${colorClass}`}
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          {/* Show player icons for the number of selected players */}
          <div className="flex -space-x-2">
            {[...Array(Math.min(totalPlayers, 5))].map((_, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            ))}
            {totalPlayers > 5 && (
              <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs text-primary-light font-medium">
                +{totalPlayers - 5}
              </div>
            )}
          </div>
          <span className="ml-3 text-light-darker text-sm">
            {totalPlayers}/11 players
          </span>
        </div>
        
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${textClass} bg-opacity-10 border border-opacity-30`} style={{borderColor: `var(--${textClass.split('-')[1]})`}}>
          {text}
        </span>
      </div>
      
      {totalPlayers === 11 ? (
        <div className="mt-3 text-secondary text-xs flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Your team is ready!
        </div>
      ) : totalPlayers < 11 ? (
        <div className="mt-3 text-light-darkest text-xs">
          Select {11 - totalPlayers} more player{11 - totalPlayers > 1 ? 's' : ''} to complete your team
        </div>
      ) : null}
    </div>
  );
}