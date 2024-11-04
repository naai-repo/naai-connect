
import { useRouter } from 'next/router';
interface Params {
    id: string;
  }
const DynamicPage = ({ params }: { params: Params }) => {

  const { id } = params;

  return (
    <div>
    
      <p>User ID : {id}</p>
    </div>
  );
};


export default DynamicPage;
