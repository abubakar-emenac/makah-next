import { useParams } from "react-router-dom";
import UmrahDetail from "./UmrahDetail";

export default function UmrahLayout() {
  const { slug } = useParams();
  return <UmrahDetail slug={slug} />;
}