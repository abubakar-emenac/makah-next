import RouteClientRenderer from "../../../app-shell/RouteClientRenderer";
import { getBlogDetailMetadata } from "../../../Helpers/metadata";

export async function generateMetadata({ params }) {
  const { page_url } = await params;
  return getBlogDetailMetadata(page_url);
}

export default function Page() {
  return <RouteClientRenderer route="blogDetail" />;
}
