import NotFoundClientPage from "./NotFoundClientPage";
import { getNotFoundMetadata } from "../Helpers/metadata";

export async function generateMetadata() {
  return getNotFoundMetadata();
}

export default function NotFoundPage() {
  return <NotFoundClientPage />;
}
