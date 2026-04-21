import { getPageMetadataBySlug } from "../../Helpers/metadata";
import SlugClientPage from "./SlugClientPage";

export async function generateMetadata({ params }) {
  const { slug } = params;
  return getPageMetadataBySlug(slug, `/${slug}`);
}

export default function Page() {
  return <SlugClientPage />;
}
