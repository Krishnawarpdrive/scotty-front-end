
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PipelineStage } from '../types/MultiPipelineTypes';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  Pause, 
  ArrowRight,
  FileText,
  MessageSquare
} from 'lucide-react';

interface StageActionDialogProps {
  open: boolean;
  onClose: () => void;
  stage: PipelineStage;
  applicationId: string;
  onAction: (actionId: string, data?: any) => void;
}

export const StageActionDialog: React.FC<StageActionDialogProps> = ({
  open,
  onClose,
  stage,
  applicationId,
  onAction
}) => {
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [actionData, setActionData] = useState<any>({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const stageActions = [
    {
      id: 'complete',
      label: 'Mark as Complete',
      icon: <CheckCircle className="h-4 w-4" />,
      type: 'primary',
      requiresConfirmation: true
    },
    {
      id: 'advance',
      label: 'Advance to Next Stage',
      icon: <ArrowRight className="h-4 w-4" />,
      type: 'primary',
      requiresConfirmation: true
    },
    {
      id: 'hold',
      label: 'Put on Hold',
      icon: <Pause className="h-4 w-4" />,
      type: 'secondary',
      requiresInput: true,
      inputFields: [
        { name: 'reason', type: 'textarea', label: 'Reason for hold', required: true }
      ]
    },
    {
      id: 'reject',
      label: 'Reject Candidate',
      icon: <XCircle className="h-4 w-4" />,
      type: 'danger',
      requiresConfirmation: true,
      requiresInput: true,
      inputFields: [
        { name: 'reason', type: 'textarea', label: 'Rejection reason', required: true }
      ]
    },
    {
      id: 'reschedule',
      label: 'Reschedule',
      icon: <Clock className="h-4 w-4" />,
      type: 'secondary',
      requiresInput: true,
      inputFields: [
        { name: 'new_date', type: 'date', label: 'New date', required: true },
        { name: 'reason', type: 'textarea', label: 'Reason for rescheduling', required: false }
      ]
    },
    {
      id: 'add_notes',
      label: 'Add Notes',
      icon: <MessageSquare className="h-4 w-4" />,
      type: 'secondary',
      requiresInput: true,
      inputFields: [
        { name: 'notes', type: 'textarea', label: 'Notes', required: true }
      ]
    }
  ];

  const handleActionSelect = (actionId: string) => {
    const action = stageActions.find(a => a.id === actionId);
    if (!action) return;

    setSelectedAction(actionId);
    setActionData({});

    if (action.requiresConfirmation && !action.requiresInput) {
      setShowConfirmation(true);
    }
  };

  const handleSubmit = () => {
    if (!selectedAction) return;

    const action = stageActions.find(a => a.id === selectedAction);
    if (action?.requiresInput) {
      // Validate required fields
      const missingFields = action.inputFields?.filter(field => 
        field.required && !actionData[field.name]
      );

      if (missingFields && missingFields.length > 0) {
        alert(`Please fill in required fields: ${missingFields.map(f => f.label).join(', ')}`);
        return;
      }
    }

    onAction(selectedAction, actionData);
  };

  const renderInputField = (field: any) => {
    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            value={actionData[field.name] || ''}
            onChange={(e) => setActionData({ ...actionData, [field.name]: e.target.value })}
            placeholder={field.label}
            rows={3}
          />
        );
      case 'date':
        return (
          <Input
            type="date"
            value={actionData[field.name] || ''}
            onChange={(e) => setActionData({ ...actionData, [field.name]: e.target.value })}
          />
        );
      default:
        return (
          <Input
            type="text"
            value={actionData[field.name] || ''}
            onChange={(e) => setActionData({ ...actionData, [field.name]: e.target.value })}
            placeholder={field.label}
          />
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Stage Actions - {stage.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!selectedAction ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-4">
                Choose an action for this stage:
              </p>
              {stageActions.map((action) => (
                <Button
                  key={action.id}
                  variant={action.type === 'danger' ? 'destructive' : action.type === 'primary' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => handleActionSelect(action.id)}
                >
                  {action.icon}
                  <span className="ml-2">{action.label}</span>
                </Button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {(() => {
                const action = stageActions.find(a => a.id === selectedAction);
                if (!action) return null;

                return (
                  <>
                    <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                      {action.icon}
                      <span className="font-medium">{action.label}</span>
                    </div>

                    {action.requiresInput && action.inputFields && (
                      <div className="space-y-3">
                        {action.inputFields.map((field) => (
                          <div key={field.name}>
                            <Label htmlFor={field.name}>
                              {field.label}
                              {field.required && <span className="text-red-500">*</span>}
                            </Label>
                            {renderInputField(field)}
                          </div>
                        ))}
                      </div>
                    )}

                    {action.requiresConfirmation && (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-sm text-amber-800">
                          Are you sure you want to {action.label.toLowerCase()}? This action cannot be undone.
                        </p>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedAction('');
                          setActionData({});
                          setShowConfirmation(false);
                        }}
                      >
                        Back
                      </Button>
                      <Button
                        variant={action.type === 'danger' ? 'destructive' : 'default'}
                        onClick={handleSubmit}
                        className="flex-1"
                      >
                        Confirm {action.label}
                      </Button>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
