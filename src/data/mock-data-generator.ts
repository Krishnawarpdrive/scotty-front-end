
// Mock data generator without external dependencies

export const generateMockData = (count: number = 10) => {
  const mockData: any[] = [];
  
  for (let i = 0; i < count; i++) {
    mockData.push({
      id: `mock-${i}`,
      name: `Mock Item ${i + 1}`,
      status: i % 2 === 0 ? 'active' : 'inactive',
      createdAt: new Date().toISOString(),
    });
  }
  
  return mockData;
};

export const generateMockUser = () => ({
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'user',
});

export const generateMockClients = (count: number = 5) => {
  const clients: any[] = [];
  
  for (let i = 0; i < count; i++) {
    clients.push({
      id: `client-${i}`,
      name: `Client ${i + 1}`,
      industry: i % 2 === 0 ? 'Technology' : 'Healthcare',
      status: 'active',
      contactEmail: `client${i + 1}@example.com`,
    });
  }
  
  return clients;
};
