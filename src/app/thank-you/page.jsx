import RouteClientRenderer from "../../app-shell/RouteClientRenderer";
import { getPageMetadataBySlug } from "../../Helpers/metadata";

export async function generateMetadata() {
  return getPageMetadataBySlug("thank-you", "/thank-you");
}

export default function Page() {
  return <RouteClientRenderer route="thankYou" />;
}
