export default async function YearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const year = (await params).year;
  return <div>{year}</div>;
}
