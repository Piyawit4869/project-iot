import { Breadcrumb } from '@/components/common/breadcrumb';
import PageLayout from './components/PageLayout';

const page = () => {
  return (
    <div>
      <div className="fixed mt-6 ml-12 top-0 z-10">
        <Breadcrumb />
      </div>
      <PageLayout />
    </div>
  );
};

export default page;
