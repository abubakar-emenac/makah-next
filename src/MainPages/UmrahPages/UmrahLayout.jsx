import { useParams } from "@navigation";
import UmrahDetail from "./UmrahDetail";

export default function UmrahLayout() {
  const { slug } = useParams();
  return <UmrahDetail slug={slug} />;
}