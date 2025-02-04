import Link from "next/link";
import { Header } from "./Header";
import { PurposeType } from "@/interfaces/purpose";

export default function Purpose({ data }: { data: PurposeType[] }) {
  return (
    <div className="w-full">
      <Header />
      <div
        className="w-full p-5 flex flex-col items-center"
        suppressHydrationWarning
      >
        <div className="w-full md:w-[70%] flex md:justify-center">
          <span className="underline underline-offset-8 decoration-1 decoration-primary text-3xl font-semibold">
            Why Should I Study?
          </span>
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
