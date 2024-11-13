import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Account = () => {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <Label htmlFor="firstName">First Name</Label>
            <Input name="firstName" placeholder="First Name" />
          </form>
        </CardContent>
        <CardFooter className="border-t p-6">
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Account;
