import SummaryPageWrapper from "./SummaryPageWrapper";

const GetSummary = async ({
  params,
}: {
  params: Promise<{ date: string }>;
}) => {
  const date: string = (await params).date;
  return (
    <div className="w-full">
      <SummaryPageWrapper date={date} />
    </div>
  );
};

export default GetSummary;
