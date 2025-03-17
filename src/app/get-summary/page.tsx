"use client";
import { Header } from "@/components/Header";
import CalendarForSummary from "@/components/CalendarForSummary";

const GetSummary = () => {
  return (
    <div className="w-full">
      {/* <Header /> */}
      <div className="w-full p-5">
        <div className="font-semibold text-3xl text-center pb-5">
          <span className="underline underline-offset-8 decoration-1 decoration-primary">
            Wanna see how that day was?
          </span>
        </div>
        <CalendarForSummary />
      </div>
    </div>
  );
};

export default GetSummary;
