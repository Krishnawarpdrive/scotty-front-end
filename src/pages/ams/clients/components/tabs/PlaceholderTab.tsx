
import React from 'react';

interface PlaceholderTabProps {
  title: string;
  description: string;
}

const PlaceholderTab: React.FC<PlaceholderTabProps> = ({ title, description }) => {
  return (
    <div className="text-center p-8 bg-muted/20 rounded-lg border">
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
    </div>
  );
};

export default PlaceholderTab;
