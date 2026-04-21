import RouteClientRenderer from "../../app-shell/RouteClientRenderer";
import { getPageMetadataBySlug } from "../../Helpers/metadata";

export async function generateMetadata() {
  return getPageMetadataBySlug("privacy-policy", "/privacy-policy");
}

export default function Page() {
  return <RouteClientRenderer route="privacy" />;
}
