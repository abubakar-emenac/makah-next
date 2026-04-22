import RouteClientRenderer from "../../app-shell/RouteClientRenderer";
import { getPageMetadataBySlug } from "../../Helpers/metadata";

export async function generateMetadata() {
  return getPageMetadataBySlug("blog", "/blog");
}

export default function Page() {
  return <RouteClientRenderer route="blogHome" />;
}
