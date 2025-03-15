import { format, getDaysInMonth } from "date-fns";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getJournalByMonth } from "@/app/actions/journal";
import { JSDOM } from "jsdom";

interface JournalEntry {
  date: Date;
  title: string;
  description: string;
  location?: string;
  tags?: string[];
  imageUrl?: string;
  highlighted?: boolean;
}

interface JournalEntryCardProps {
  date: Date;
  title: string;
  description: string;
  location?: string;
  tags?: string[];
  imageUrl?: string;
  isHighlighted?: boolean;
}

const parseJournalEntries = (entries: { date: Date; content: string }[]) => {
  return entries.map(({ date, content }) => {
    const dom = new JSDOM(content);
    const document = dom.window.document;

    const title = document.querySelector("h1")?.textContent || "";

    // Find the first meaningful <p> tag (ignoring empty ones)
    let description = "";
    const paragraphs = document.querySelectorAll("p");
    for (const p of paragraphs) {
      const text = p.textContent?.trim();
      if (text && text !== "\u200B") {
        // Ignore empty & zero-width space content
        description = text;
        break;
      }
    }

    // Get the first valid image URL
    const imageUrl = document.querySelector("img")?.getAttribute("src") || "";

    return { date, title, description, imageUrl };
  });
};

const getEntries = async (
  year: number,
  month: number
): Promise<JournalEntry[]> => {
  const data: { date: Date; content: string }[] = await getJournalByMonth(
    year,
    month
  );
  const dataEntries = parseJournalEntries(data);
  console.log(dataEntries, "😁😁");

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

  return entries.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export default async function JournalPage({
  params,
}: {
  params: Promise<{ year: string; month: string }>;
}) {
  const year = Number.parseInt((await params).year);
  const month = Number.parseInt((await params).month);

  const monthName = format(new Date(year, month - 1), "MMMM");
  const entries = await getEntries(year, month);

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-md md:max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-foreground">
        {monthName} {year}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {entries.map((entry, index) => (
          <Link
            href={`/journal/${year}/${month}/${format(entry.date, "d")}`}
            key={index}
          >
            <JournalEntryCard
              date={entry.date}
              title={entry.title}
              description={entry.description}
              location={entry.location}
              tags={entry.tags}
              imageUrl={entry.imageUrl || "/placeholder.jpg"}
              isHighlighted={entry.highlighted}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

function JournalEntryCard({
  date,
  title,
  description,
  location,
  tags,
  imageUrl,
  isHighlighted = true,
}: JournalEntryCardProps) {
  const dayOfWeek = format(date, "EEE").toUpperCase();
  const dayOfMonth = format(date, "d");

  return (
    <Card
      className={cn(
        "overflow-hidden border bg-card ",
        isHighlighted ? "border-primary/50" : ""
      )}
    >
      <CardContent className="p-0">
        <div className="flex items-stretch">
          <div className="flex flex-col items-center justify-center p-4 w-20 text-center">
            <span className="text-sm text-muted-foreground font-medium">
              {dayOfWeek}
            </span>
            <span className="text-3xl font-bold text-foreground">
              {dayOfMonth}
            </span>
          </div>

          <div className="flex-1 p-4">
            <h3 className="font-medium text-base text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {description}
            </p>

            {/* <div className="mt-1 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
              {tags &&
                tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-blue-500 dark:text-blue-400 bg-transparent hover:bg-transparent px-0 mr-1"
                  >
                    {tag},
                  </Badge>
                ))}
              {location && <span>{location}</span>}
            </div> */}
          </div>

          <div className="flex justify-center items-center w-20 relative">
            <Image
              src={imageUrl || "/placeholder.jpg"}
              alt={title}
              fill
              className="object-cover h-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
