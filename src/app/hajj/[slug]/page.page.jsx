import RouteClientRenderer from "../../../app-shell/RouteClientRenderer";
import { getPackageMetadata } from "../../../Helpers/metadata";

export async function generateMetadata({ params }) {
  const { slug } = params;
  return getPackageMetadata("hajj", slug);
}

export default function Page() {
  return <RouteClientRenderer route="hajjDetail" />;
}
