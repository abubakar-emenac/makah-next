import { getPageMetadataBySlug } from "../Helpers/metadata";
import HomeClientPage from "../app-shell/HomeClientPage";

export async function generateMetadata() {
  return getPageMetadataBySlug("home", "/");
}

export default function Page() {
  return <HomeClientPage />;
}
