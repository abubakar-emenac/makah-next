import RouteClientRenderer from "../../../app-shell/RouteClientRenderer";
import { getBlogDetailMetadata } from "../../../Helpers/metadata";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { page_url } = await params;
  const metadata = await getBlogDetailMetadata(page_url);
  if (!metadata) {
    notFound();
  }
  return metadata;
}

export default async function Page({ params }) {
  const { page_url } = await params;
  const metadata = await getBlogDetailMetadata(page_url);
  if (!metadata) {
    notFound();
  }
  return <RouteClientRenderer route="blogDetail" />;
}
