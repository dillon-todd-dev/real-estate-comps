import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { newPropertyAddressForm } from '@/schemas';

const NewProperty = () => {
    const form = useForm<z.infer<typeof newPropertyAddressForm>>({
        resolver: zodResolver(newPropertyAddressForm),
        defaultValues: {
            address: '',
            city: '',
            state: 'TX'
        }
    })

    const onSubmit = (values: z.infer<typeof newPropertyAddressForm>) => {
        console.log(values);
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">New Single-family Property</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Single-family Property</DialogTitle>
        </DialogHeader>
        {/* <Tabs defaultValue="address" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="address">Address</TabsTrigger>
            <TabsTrigger value="mls">MLS</TabsTrigger>
          </TabsList>
          <TabsContent value="address">
            <div>Create by address</div>
            <Button type='button'>Create By Address</Button>
          </TabsContent>
          <TabsContent value="mls">
            <div>Create by MLS</div>
            <Button type='button'>Create By MLS</Button>
          </TabsContent>
        </Tabs> */}
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField
                        control={form.control}
                        name='address'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address Search</FormLabel>
                                <FormControl>
                                    <Input placeholder='Address...' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='city'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder='City...' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='state'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input placeholder='State...' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='zipcode'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Zipcode</FormLabel>
                                <FormControl>
                                    <Input placeholder='Zip...' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Create Property
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewProperty;
