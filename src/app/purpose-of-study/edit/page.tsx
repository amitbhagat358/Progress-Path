import { getPurposes } from '@/app/actions/purposeActions';
import EditPurpose from './Edit';

export default async function EditProvider() {
  const data = await getPurposes();
  return <EditPurpose data={data} />;
}
