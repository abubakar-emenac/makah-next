import RouteClientRenderer from "../../app-shell/RouteClientRenderer";
import { getPageMetadataBySlug } from "../../Helpers/metadata";

export async function generateMetadata() {
  return getPageMetadataBySlug("hajj-and-umrah-visa", "/hajj-and-umrah-visa");
}

export default function Page() {
  return <RouteClientRenderer route="visa" />;
}
