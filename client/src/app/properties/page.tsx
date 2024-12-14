import { auth, currentUser } from '@clerk/nextjs/server';

export default async function Properties() {
  const user = await currentUser();
  console.log(user);
  return (
    <h1 className='text-4xl'>
      This is a protected page for {user?.firstName} {user?.lastName}
    </h1>
  );
}
