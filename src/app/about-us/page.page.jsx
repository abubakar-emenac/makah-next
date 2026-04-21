import RouteClientRenderer from "../../app-shell/RouteClientRenderer";
import { getPageMetadataBySlug } from "../../Helpers/metadata";

export async function generateMetadata() {
  return getPageMetadataBySlug("about-us", "/about-us");
}

export default function Page() {
  return <RouteClientRenderer route="about" />;
}
