
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const mockSkills = [
  { id: 1, name: 'React', category: 'Technical', level: 'Advanced', usageCount: 45 },
  { id: 2, name: 'TypeScript', category: 'Technical', level: 'Intermediate', usageCount: 38 },
  { id: 3, name: 'Project Management', category: 'Soft Skills', level: 'Expert', usageCount: 52 },
  { id: 4, name: 'Python', category: 'Technical', level: 'Advanced', usageCount: 29 },
  { id: 5, name: 'UI/UX Design', category: 'Design', level: 'Intermediate', usageCount: 31 },
];

const SkillsLibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSkills = mockSkills.filter(skill => 
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-gray-100 text-gray-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-green-100 text-green-800';
      case 'Expert': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Library</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search skills by name or category..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {filteredSkills.length > 0 ? (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Skill Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Usage Count</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSkills.map((skill) => (
                    <TableRow key={skill.id}>
                      <TableCell className="font-medium">{skill.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{skill.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getLevelColor(skill.level)}>
                          {skill.level}
                        </Badge>
                      </TableCell>
                      <TableCell>{skill.usageCount}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No skills found matching your search.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsLibraryPage;
