import RouteClientRenderer from "../../app-shell/RouteClientRenderer";
import { getPageMetadataBySlug } from "../../Helpers/metadata";

export async function generateMetadata() {
  return getPageMetadataBySlug("customise-your-package", "/customise-your-package");
}

export default function Page() {
  return <RouteClientRenderer route="customizePackage" />;
}
