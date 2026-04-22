import { fetchPageBySlug, getPageMetadataBySlug } from "../../Helpers/metadata";
import SlugClientPage from "../../app-shell/SlugClientPage";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pageResponse = await fetchPageBySlug(slug);
  if (!pageResponse?.result) {
    notFound();
  }
  return getPageMetadataBySlug(slug, `/${slug}`);
}

export default async function Page({ params }) {
  const { slug } = await params;
  const pageResponse = await fetchPageBySlug(slug);
  if (!pageResponse?.result) {
    notFound();
  }
  return <SlugClientPage />;
}
