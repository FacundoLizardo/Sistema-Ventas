import { redirect } from "next/navigation";

export default function Page({
  params: { companyId },
}: {
  params: {
    companyId: string;
  };
}) {
  return redirect(`/${companyId}/sales`);
}
