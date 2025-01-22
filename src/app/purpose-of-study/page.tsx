import Purpose from '@/components/Purpose';
import { getPurposes } from '../actions/purposeActions';

export default async function PurposeProvider() {
  const purpose = await getPurposes();
  return <Purpose data={purpose} />;
}
