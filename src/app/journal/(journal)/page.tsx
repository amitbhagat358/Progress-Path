import { redirect } from "next/navigation";
import { getAvailableJournalYears } from "../../actions/journal";
import JournalBrowser from "./journal-browser";

export const dynamic = "force-dynamic";

export default async function JournalHomePage() {
  const availableYears = await getAvailableJournalYears();

  if (availableYears.length === 0) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    redirect(`/journal/${currentYear}/${currentMonth}`);
  }

  const mostRecentYear = Math.max(...availableYears);

  return (
    <JournalBrowser
      initialYear={mostRecentYear}
      availableYears={[...availableYears]}
    />
  );
}
