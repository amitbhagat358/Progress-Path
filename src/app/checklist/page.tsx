import Checklist from "@/components/Checklist";
import { fetchChecklistData } from "@/app/actions/checklist";
import { formatDateToYYYYMMDD } from "@/lib/utils";
import { Suspense } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Loading from "@/components/Loading";
import { Header } from "@/components/Header";

const CheckLIstDataFetcher = async () => {
  const rawDate = formatDateToYYYYMMDD(new Date());
  const date = new Date(rawDate).toISOString();
  const checklistData = await fetchChecklistData(date);

  // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay

  console.log("fetchChecklistData called at", new Date().toISOString());

  return <Checklist initialData={checklistData} />;
};

const ChecklistPage = async () => {
  return (
    <div className="w-full">
      <Header />
      <div className="w-full md:w-[70%] mx-auto p-5">
        <div className="flex justify-between md:justify-center font-semibold md:text-center text-3xl mb-6">
          <span className="underline underline-offset-8 decoration-1 decoration-primary">
            Today&apos;s Checklist
          </span>
          <SidebarTrigger className="md:hidden" />
        </div>
        <Suspense fallback={<Loading />}>
          <CheckLIstDataFetcher />
        </Suspense>
      </div>
    </div>
  );
};

export default ChecklistPage;
