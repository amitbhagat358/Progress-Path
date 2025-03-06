import Purpose from "@/app/purpose-of-study/Purpose";
import { getPurposes } from "@/app/actions/purposeActions";

export default async function PurposeProvider() {
  const purpose = await getPurposes();
  return <Purpose data={purpose} />;
}
