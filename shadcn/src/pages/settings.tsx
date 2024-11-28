import { Button } from '@/components/ui/button';
import { logout } from '@/lib/api';

const Settings = () => {
  return <Button onClick={() => logout()}>Logout</Button>;
};

export default Settings;
