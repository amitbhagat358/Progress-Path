'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="w-full">
      <div className="w-full flex text-3xl font-bold py-3 border-b">
        <div className=" w-full h-full text-center">Progress Path</div>
      </div>
      <div className="p-5 flex justify-center gap-5 w-full">
        <div className="w-[100px]">
          <Link href={'/signup'}>
            <Button>Sign up</Button>
          </Link>
        </div>
        <div className="w-[100px]">
          <Link href={'/login'}>
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
