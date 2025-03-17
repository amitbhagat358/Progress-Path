import Link from "next/link";
import { PurposeType } from "@/interfaces/purpose";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Purpose({ data }: { data: PurposeType[] }) {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
      <div
        className="w-full p-5 flex flex-col items-center"
        suppressHydrationWarning
      >
        <div className="w-full md:w-[70%] md:justify-center flex justify-between items-center">
          <span className="underline underline-offset-8 decoration-1 decoration-primary text-3xl font-semibold">
            Why Should I Study?
          </span>
          <SidebarTrigger className="md:hidden" />
        </div>
        <div className="w-full md:w-auto md:min-w-[40%] md:max-w-full flex flex-col mt-10">
          <div className="rounded-lg border empty:hidden">
            {data?.map((item, index) => (
              <div key={item.id}>
                <div className="group flex items-center p-2">
                  <div className="flex-1">
                    {`${index + 1}. `}
                    {item.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full md:min-w-[50%]  md:max-w-full flex m-auto mt-10">
            <div className="w-full flex justify-end">
              <Link
                href={"/purpose-of-study/edit"}
                className="underline hover:text-primary cursor-pointer font-semibold "
              >
                Edit Purpose List
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
