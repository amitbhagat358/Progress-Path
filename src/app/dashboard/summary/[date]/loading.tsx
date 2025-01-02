import { Skeleton } from '@/components/ui/skeleton';

export default function Component() {
  return (
    <div className="w-full">
      <div className="w-full flex h-[74px] justify-between items-center p-5 border border-b sticky top-0">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-8 w-40 mx-2" />
        <Skeleton className="h-10 w-10 rounded-[100%]" />
      </div>
      <div className="w-full border-b">
        <div className="w-full flex rounded-lg">
          <div className="done w-[25%] min-h-[600px] flex flex-col justify-between gap-5 p-5">
            <div className="flex justify-center items-center">
              <Skeleton className="h-10 w-1/2" />
            </div>
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-60 w-full" />
            <Skeleton className="h-28 w-full" />
          </div>
          <div className="w-[40%] flex flex-col gap-5 p-5">
            <div className="flex justify-center items-center">
              <Skeleton className="h-10 w-1/2" />
            </div>
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="w-[35%] flex flex-col gap-5 p-5">
            <div className="flex justify-center items-center">
              <Skeleton className="h-10 w-1/2" />
            </div>
            <div className="flex justify-center items-center">
              <Skeleton className="h-[300px] w-[90%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
