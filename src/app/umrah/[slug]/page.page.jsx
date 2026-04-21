import RouteClientRenderer from "../../../app-shell/RouteClientRenderer";
import { getPackageMetadata } from "../../../Helpers/metadata";

export async function generateMetadata({ params }) {
  const { slug } = params;
  return getPackageMetadata("umrah", slug);
}

export default function Page() {
  return <RouteClientRenderer route="umrahDetail" />;
}
