import RouteClientRenderer from "../../app-shell/RouteClientRenderer";
import { getPageMetadataBySlug } from "../../Helpers/metadata";

export async function generateMetadata() {
  return getPageMetadataBySlug("customization", "/customization");
}

export default function Page() {
  return <RouteClientRenderer route="customization" />;
}
