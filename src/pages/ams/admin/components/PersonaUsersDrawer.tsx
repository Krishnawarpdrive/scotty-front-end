
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PersonaType, personaConfigs } from '@/types/persona';
import { Search, UserMinus } from 'lucide-react';

interface PersonaUser {
  id: string;
  name: string;
  email: string;
  assignedAt: string;
}

interface PersonaUsersDrawerProps {
  open: boolean;
  onClose: () => void;
  persona: PersonaType | null;
  users: PersonaUser[];
  onRemoveUser: (userId: string, persona: PersonaType) => void;
}

export const PersonaUsersDrawer: React.FC<PersonaUsersDrawerProps> = ({
  open,
  onClose,
  persona,
  users,
  onRemoveUser
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  if (!persona) return null;

  const config = personaConfigs[persona];
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Badge className={config.color}>
              {config.name}
            </Badge>
            Users ({users.length})
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Assigned: {new Date(user.assignedAt).toLocaleDateString()}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveUser(user.id, persona)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700"
                >
                  <UserMinus className="h-3 w-3" />
                  Remove
                </Button>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm ? 'No users found matching your search' : 'No users assigned to this persona'}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
