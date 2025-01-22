import Link from 'next/link';
import { Header } from './Header';
import { PurposeType } from '@/interfaces/purpose';

export default function Purpose({ data }: { data: PurposeType[] }) {
  return (
    <div className="w-full">
      <Header />
      <div
        className="w-full flex flex-col items-center"
        suppressHydrationWarning
      >
        <div className="w-[70%]">
          <span className="border-b border-b-primary text-3xl font-semibold">
            Why Should I Study?
          </span>
        </div>
        <div className="w-[70%] flex flex-col mt-10 rounded-lg border">
          {data?.map((item, index) => (
            <div key={item.id}>
              <div className="group flex items-center px-4 py-2">
                <div className="flex-1">
                  {`${index + 1}. `}
                  {item.text}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-1 w-[70%] flex m-auto mt-10">
          <div className="underline hover:text-primary cursor-pointer font-semibold ">
            <Link href={'/purpose-of-study/edit'} prefetch>
              Edit Purpose List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
