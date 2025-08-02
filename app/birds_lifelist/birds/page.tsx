import { title } from "@/components/primitives";
import { Birds_page } from "./components/birds_page";
import { BirdList } from "@/types/bird";

export default async function Birds() {

  //野鳥一覧取得
  const res = await fetch('http://localhost:3000/api/get_birdslist', {
    cache: 'no-store',
  });
  const data: BirdList = await res.json();

  return (
    <Birds_page birds={data.birds}></Birds_page>
  );
}
