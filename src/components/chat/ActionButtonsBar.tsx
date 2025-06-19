
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Mail, 
  Table, 
  Brain, 
  ListChecks, 
  Play 
} from 'lucide-react';

export type ActionType = 'charts' | 'draft-email' | 'tables' | 'mind-map' | 'action-items' | 'run';

interface ActionButtonsBarProps {
  onActionSelect: (action: ActionType) => void;
  disabled?: boolean;
}

const actionButtons = [
  {
    id: 'charts' as ActionType,
    label: 'Charts',
    icon: BarChart3,
    description: 'Generate charts and visualizations'
  },
  {
    id: 'draft-email' as ActionType,
    label: 'Draft Email',
    icon: Mail,
    description: 'Create email drafts'
  },
  {
    id: 'tables' as ActionType,
    label: 'Tables',
    icon: Table,
    description: 'Create data tables'
  },
  {
    id: 'mind-map' as ActionType,
    label: 'Mind Map',
    icon: Brain,
    description: 'Generate mind maps'
  },
  {
    id: 'action-items' as ActionType,
    label: 'Action Items',
    icon: ListChecks,
    description: 'Extract action items'
  },
  {
    id: 'run' as ActionType,
    label: 'Run',
    icon: Play,
    description: 'Execute analysis'
  }
];

export const ActionButtonsBar: React.FC<ActionButtonsBarProps> = ({ 
  onActionSelect, 
  disabled = false 
}) => {
  return (
    <div className="glass-effect border border-white/10 rounded-lg p-4 mx-6 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-white/80">Quick Actions</h4>
        <span className="text-xs text-white/50">Select an action to get started</span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {actionButtons.map((action) => {
          const IconComponent = action.icon;
          return (
            <Button
              key={action.id}
              variant="ghost"
              size="sm"
              onClick={() => onActionSelect(action.id)}
              disabled={disabled}
              className="h-auto p-3 flex flex-col items-center space-y-2 text-white/70 hover:text-white hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-200 group"
              title={action.description}
            >
              <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-xs font-medium">{action.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
