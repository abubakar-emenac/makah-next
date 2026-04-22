import RouteClientRenderer from "../../../app-shell/RouteClientRenderer";
import { getPackageMetadata } from "../../../Helpers/metadata";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const metadata = await getPackageMetadata("umrah", slug);
  if (!metadata) {
    notFound();
  }
  return metadata;
}

export default async function Page({ params }) {
  const { slug } = await params;
  const metadata = await getPackageMetadata("umrah", slug);
  if (!metadata) {
    notFound();
  }
  return <RouteClientRenderer route="umrahDetail" />;
}
