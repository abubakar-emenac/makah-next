import { getNotFoundMetadata } from "../Helpers/metadata";
import NotFoundClientPage from "../app-shell/NotFoundClientPage";

export async function generateMetadata() {
  return await getNotFoundMetadata();
}

export default function NotFoundPage() {
  return <NotFoundClientPage />;
}
