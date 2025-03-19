import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, ChevronRight } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function JournalBrowserSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-pulse">
        <div className="w-full">
          <div className="w-full flex justify-between items-center text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-0">
            <div className="h-12 w-60 bg-muted rounded" />
            <SidebarTrigger className="md:hidden" />
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <Select>
            <SelectTrigger className="w-[180px] bg-muted h-10 rounded" />
          </Select>
          <Button className="h-10 w-40 bg-muted rounded" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <Card
            key={i}
            className="h-full animate-pulse overflow-hidden border-muted"
          >
            <CardContent className="p-0 h-full">
              <div className="relative h-48 bg-muted" />
              <div className="flex justify-between items-center p-4">
                <div className="h-6 w-32 bg-muted rounded" />
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
