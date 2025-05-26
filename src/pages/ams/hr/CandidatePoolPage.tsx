
import React from 'react';

const CandidatePoolPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-white border-b px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Candidate Pool</h1>
            <p className="text-gray-600 mt-1">Manage and track all candidates across your hiring pipeline</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg border p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Candidate Pool Coming Soon</h2>
          <p className="text-gray-600">This page will contain the candidate pool functionality you described.</p>
        </div>
      </div>
    </div>
  );
};

export default CandidatePoolPage;
