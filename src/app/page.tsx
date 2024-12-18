'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="w-full">
      <div className="w-full h-[70px] flex text-3xl font-bold my-5 border-b border-b-[#e3e3e7]">
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
