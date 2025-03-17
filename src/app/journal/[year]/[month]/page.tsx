import { getJournalByMonth } from "@/app/actions/journal";
import { JSDOM } from "jsdom";
import JournalPage from "./journal-page";

interface JournalEntry {
  date: Date;
  title: string;
  description: string;
  location?: string;
  tags?: string[];
  imageUrl?: string;
  highlighted?: boolean;
}

const parseJournalEntries = (entries: { date: Date; content: string }[]) => {
  return entries.map(({ date, content }) => {
    const dom = new JSDOM(content);
    const document = dom.window.document;

    const title = document.querySelector("h1")?.textContent || "";

    const paragraphs = document.querySelectorAll("p");
    const description = Array.from(paragraphs)
      .map((p) => p.textContent?.trim())
      .filter((text) => text && text !== "\u200B")
      .join("\n\n");
    const imageUrl = document.querySelector("img")?.getAttribute("src") || "";

    return { date, title, description, imageUrl };
  });
};

function getDaysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

const getEntries = async (
  year: number,
  month: number
): Promise<JournalEntry[]> => {
  const data: { date: Date; content: string }[] = await getJournalByMonth(
    year,
    month
  );
  const dataEntries = parseJournalEntries(data);
  const daysInMonth = getDaysInMonth(new Date(year, month - 1));
  const entries: JournalEntry[] = [];

  dataEntries.forEach((entry, index) => {
    if (entry.date.getDate() <= daysInMonth) {
      entries.push({
        date: entry.date,
        title: entry?.title,
        description: entry?.description,
        imageUrl: entry?.imageUrl,
        highlighted: index % 2 === 0,
        // location: sampleLocations[index % sampleLocations.length],
        // tags: sampleTags[index % sampleTags.length],
      });
    }
  });

  return entries;

  // return entries.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export default async function JournalPageServer({
  params,
}: {
  params: Promise<{ year: string; month: string }>;
}) {
  const year = Number.parseInt((await params).year);
  const month = Number.parseInt((await params).month);

  const entries = await getEntries(year, month);

  return <JournalPage year={year} month={month} initialEntries={entries} />;
}
