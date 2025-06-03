
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, CheckSquare } from 'lucide-react';

interface ChecklistItem {
  item: string;
  status: 'compliant' | 'non-compliant' | 'partially-compliant' | 'not-applicable';
  notes: string;
}

interface ChecklistComplianceData {
  items: ChecklistItem[];
  overallCompliance: number;
}

interface ChecklistComplianceSectionProps {
  data: ChecklistComplianceData;
  onChange: (data: ChecklistComplianceData) => void;
}

export const ChecklistComplianceSection: React.FC<ChecklistComplianceSectionProps> = ({
  data,
  onChange
}) => {
  const addChecklistItem = () => {
    const newItem: ChecklistItem = {
      item: '',
      status: 'not-applicable',
      notes: ''
    };
    onChange({
      ...data,
      items: [...data.items, newItem]
    });
  };

  const updateChecklistItem = (index: number, field: keyof ChecklistItem, value: string) => {
    const updated = data.items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onChange({ ...data, items: updated });
  };

  const removeChecklistItem = (index: number) => {
    const updated = data.items.filter((_, i) => i !== index);
    onChange({ ...data, items: updated });
  };

  const getStatusBadge = (status: ChecklistItem['status']) => {
    const variants = {
      'compliant': 'default',
      'non-compliant': 'destructive',
      'partially-compliant': 'secondary',
      'not-applicable': 'outline'
    } as const;

    const labels = {
      'compliant': 'Compliant',
      'non-compliant': 'Non-Compliant',
      'partially-compliant': 'Partially Compliant',
      'not-applicable': 'Not Applicable'
    };

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const calculateCompliance = () => {
    const applicableItems = data.items.filter(item => item.status !== 'not-applicable');
    if (applicableItems.length === 0) return 0;
    
    const compliantItems = applicableItems.filter(item => 
      item.status === 'compliant' || item.status === 'partially-compliant'
    );
    
    return Math.round((compliantItems.length / applicableItems.length) * 100);
  };

  React.useEffect(() => {
    const compliance = calculateCompliance();
    if (compliance !== data.overallCompliance) {
      onChange({ ...data, overallCompliance: compliance });
    }
  }, [data.items]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5" />
          Checklist Compliance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Compliance Items</h3>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm text-gray-600">Overall Compliance</div>
              <div className="text-2xl font-bold text-green-600">
                {data.overallCompliance}%
              </div>
            </div>
            <Button onClick={addChecklistItem} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {data.items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 border rounded-lg">
              <div>
                <Label>Compliance Item</Label>
                <Input
                  value={item.item}
                  onChange={(e) => updateChecklistItem(index, 'item', e.target.value)}
                  placeholder="e.g., Background verification completed"
                />
              </div>
              
              <div>
                <Label>Status</Label>
                <Select
                  value={item.status}
                  onValueChange={(value) => updateChecklistItem(index, 'status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compliant">Compliant</SelectItem>
                    <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                    <SelectItem value="partially-compliant">Partially Compliant</SelectItem>
                    <SelectItem value="not-applicable">Not Applicable</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-2">
                  {getStatusBadge(item.status)}
                </div>
              </div>
              
              <div>
                <Label>Notes</Label>
                <Textarea
                  value={item.notes}
                  onChange={(e) => updateChecklistItem(index, 'notes', e.target.value)}
                  placeholder="Additional details..."
                  rows={2}
                />
              </div>
              
              <div className="flex items-end">
                <Button
                  onClick={() => removeChecklistItem(index)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {data.items.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <CheckSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No compliance items added yet.</p>
            <p className="text-sm">Click "Add Item" to start building your checklist.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
