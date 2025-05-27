
import React from 'react';
import { motion } from 'framer-motion';
import { RoleRequirementsIntegration } from '../role-requirements/RoleRequirementsIntegration';

interface RoleRequirementsTabProps {
  mockRolesWithRequirements: any[];
  handleCreateRole: () => void;
}

export const RoleRequirementsTab: React.FC<RoleRequirementsTabProps> = ({
  mockRolesWithRequirements,
  handleCreateRole
}) => {
  return (
    <motion.div
      key="role-requirements"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <RoleRequirementsIntegration
        roles={mockRolesWithRequirements}
        onCreateRole={handleCreateRole}
        onCreateRequirement={(roleId) => console.log('Create requirement for role:', roleId)}
        onEditRole={(role) => console.log('Edit role:', role)}
        onEditRequirement={(req) => console.log('Edit requirement:', req)}
      />
    </motion.div>
  );
};
