import { Card, CardContent } from "@/components/ui/card";

export default function JournalPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="w-60 h-10 bg-muted animate-pulse rounded-md" />
        <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0 w-full md:w-auto">
          <div className="w-full md:w-64 h-10 bg-muted animate-pulse rounded-md" />
          <div className="w-full md:w-64 h-10 bg-muted animate-pulse rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {[...Array(10)].map((_, index) => (
          <Card
            key={index}
            className="overflow-hidden border bg-card animate-pulse"
          >
            <CardContent className="p-0">
              <div className="flex items-stretch">
                <div className="flex flex-col items-center justify-center p-4 w-20 bg-muted">
                  <div className="w-10 h-4  rounded-md" />
                  <div className="w-10 h-6  rounded-md mt-2" />
                </div>
                <div className="flex-1 p-4">
                  <div className="w-3/4 h-5  rounded-md" />
                  <div className="w-full h-4  rounded-md mt-2" />
                  <div className="w-1/2 h-4  rounded-md mt-2" />
                </div>
                <div className="flex justify-center items-center w-20 relative">
                  <div className="w-full h-full " />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
