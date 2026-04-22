import RouteClientRenderer from "../../app-shell/RouteClientRenderer";
import { getPageMetadataBySlug } from "../../Helpers/metadata";

export async function generateMetadata() {
  return getPageMetadataBySlug("terms-and-conditions", "/terms-and-conditions");
}

export default function Page() {
  return <RouteClientRenderer route="terms" />;
}
