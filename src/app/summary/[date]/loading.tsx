import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="w-full flex flex-col justify-between items-center p-5 mb-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0">
        <div className="w-full flex justify-between">
          <Skeleton className="h-8 w-10" />
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-8 w-10" />
        </div>
        <div className="w-full flex justify-center items-center mt-2">
          <Skeleton className="h-8 w-[150px]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col items-center gap-20">
        {/* Checklist Section */}
        <div className="w-full flex flex-col md:flex-row justify-center gap-20 rounded-lg">
          <div className="done w-full md:w-[35%] min-h-[500px] flex flex-col justify-start gap-5 p-5">
            <Skeleton className="h-10 w-1/2 mx-auto" />
            <div className="h-[500px] shadow-sm rounded-lg">
              <Skeleton className="h-[150px] w-full mb-4" />
              <Skeleton className="h-[150px] w-full mb-4" />
              <Skeleton className="h-[150px] w-full" />
            </div>
          </div>

          {/* Daily Reflection Section */}
          <div className="w-full md:w-[50%] p-5">
            <div className="w-full h-full flex flex-col justify-start gap-5">
              <Skeleton className="h-10 w-1/2 mx-auto" />
              <div className="rounded-lg shadow-sm">
                <Skeleton className="h-[100px] w-full mb-4" />
                <Skeleton className="h-[100px] w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Diary Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-5">
          <Skeleton className="h-10 w-1/2 mx-auto" />
          <Skeleton className="h-64 w-full mt-5" />
        </div>
      </div>
    </div>
  );
}
