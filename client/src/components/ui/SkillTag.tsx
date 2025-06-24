import React from 'react';

interface SkillTagProps {
  skill: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  removable?: boolean;
  onRemove?: (skill: string) => void;
  className?: string;
}

const SkillTag: React.FC<SkillTagProps> = ({ 
  skill, 
  level,
  removable = false,
  onRemove,
  className = '' 
}) => {
  const levelColors = {
    beginner: 'from-green-100 to-green-200 text-green-800 border-green-300',
    intermediate: 'from-blue-100 to-blue-200 text-blue-800 border-blue-300',
    advanced: 'from-purple-100 to-purple-200 text-purple-800 border-purple-300',
    expert: 'from-orange-100 to-orange-200 text-orange-800 border-orange-300',
  };
  
  const levelColor = level ? levelColors[level] : 'from-primary-100 to-secondary-100 text-primary-800 border-primary-200';
  
  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${levelColor} border ${className}`}>
      <span>{skill}</span>
      {level && (
        <span className="ml-2 text-xs opacity-75 capitalize">
          {level}
        </span>
      )}
      {removable && onRemove && (
        <button
          onClick={() => onRemove(skill)}
          className="ml-2 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current rounded-full"
          aria-label={`Remove ${skill}`}
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SkillTag; 