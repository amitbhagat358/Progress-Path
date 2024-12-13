const Page = async ({ params }) => {
  const date = (await params).date;
  return <div>The date for this is {date}</div>;
};

export default Page;
