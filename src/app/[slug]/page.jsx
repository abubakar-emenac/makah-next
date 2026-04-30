import { fetchPageBySlug, getPageMetadataBySlug } from "../../Helpers/metadata";
import SlugClientPage from "../../app-shell/SlugClientPage";
import { notFound } from "next/navigation";
import { isRenderableSlugPage } from "../../Helpers/pageDataValidation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const metadata = await getPageMetadataBySlug(slug, `/${slug}`);
  if (!metadata) {
    notFound();
  }
  return metadata;
}

export default async function Page({ params }) {
  const { slug } = await params;
  const pageResponse = await fetchPageBySlug(slug);
  
  if (!pageResponse || !pageResponse.result || pageResponse.success === false) {
    notFound();
  }

  if (!isRenderableSlugPage(pageResponse.result)) {
    notFound();
  }

  return <SlugClientPage />;
}
