import {LoginRequired} from '@/f/components/login-required';
import {MembershipRequired} from '@/f/components/membership-required';

const PageContent: React.FC = () => {
  return <div className="p-8">Hello there!</div>;
};

const Index: React.FC = () => {
  return (
    <LoginRequired>
      <MembershipRequired>
        <PageContent />
      </MembershipRequired>
    </LoginRequired>
  );
};

export default Index;
