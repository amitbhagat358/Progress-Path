import { getPurposes } from "@/app/actions/purposeActions";
// import dynamic from "next/dynamic";

import EditPurpose from "./Edit";

// const EditPurpose = dynamic(() => import("./Edit"), {
//   ssr: true,
//   loading: () => (
//     <div className="w-full h-screen text-4xl flex justify-center items-center text-red-500">
//       Loading.................................
//     </div>
//   ),
// });

export default async function EditProvider() {
  const data = await getPurposes();
  return <EditPurpose data={data} />;
}
