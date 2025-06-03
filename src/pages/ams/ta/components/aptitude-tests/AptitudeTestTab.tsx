
import React, { useState } from 'react';
import { AptitudeTestsList } from './components/AptitudeTestsList';
import { AptitudeTestForm } from './components/AptitudeTestForm';
import { useAptitudeTests } from './hooks/useAptitudeTests';
import { AptitudeTest, AptitudeTestFormData } from './types/AptitudeTestTypes';

export const AptitudeTestTab: React.FC = () => {
  const { tests, loading, createTest, updateTest, deleteTest } = useAptitudeTests();
  const [formOpen, setFormOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<AptitudeTest | null>(null);

  const handleCreateTest = () => {
    setEditingTest(null);
    setFormOpen(true);
  };

  const handleEditTest = (test: AptitudeTest) => {
    setEditingTest(test);
    setFormOpen(true);
  };

  const handleDeleteTest = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this test? This action cannot be undone.')) {
      await deleteTest(id);
    }
  };

  const handleViewTest = (test: AptitudeTest) => {
    // For now, just edit the test. In a full implementation, this would open a read-only view
    handleEditTest(test);
  };

  const handleFormSubmit = async (data: AptitudeTestFormData): Promise<boolean> => {
    if (editingTest) {
      return await updateTest(editingTest.id, data);
    } else {
      return await createTest(data);
    }
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingTest(null);
  };

  return (
    <>
      <AptitudeTestsList
        tests={tests}
        loading={loading}
        onCreateTest={handleCreateTest}
        onEditTest={handleEditTest}
        onDeleteTest={handleDeleteTest}
        onViewTest={handleViewTest}
      />

      <AptitudeTestForm
        open={formOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={editingTest || undefined}
        title={editingTest ? 'Edit Aptitude Test' : 'Create New Aptitude Test'}
      />
    </>
  );
};
