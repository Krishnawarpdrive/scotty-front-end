
import { useParams } from 'react-router-dom';

const CandidateApplicationDetailPage = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Application Detail</h1>
      <p>Application ID: {applicationId}</p>
    </div>
  );
};

export default CandidateApplicationDetailPage;
