import SummaryPage from './SummaryPage';

const GetSummary = async ({
  params,
}: {
  params: Promise<{ date: string }>;
}) => {
  const date: string = (await params).date;
  return (
    <div>
      <SummaryPage date={date} />
    </div>
  );
};

export default GetSummary;
