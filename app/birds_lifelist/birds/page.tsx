import { title } from "@/components/primitives";
import { Birds_table } from "./components/birds_table";
import { BirdList } from "@/types/bird";

export default async function Birds() {

  //野鳥一覧取得
  const res = await fetch('http://localhost:3000/api/get_birdslist', {
    cache: 'no-store',
  });
  const data: BirdList = await res.json();

  return (
    <div className="flex justify-center">
      <div className="w-full sm:w-full md:w-11/12 lg:w-2/3">

        <section className="h-12">

        </section>

        <section className="">
          <Birds_table birds={data.birds}></Birds_table>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </section>


      </div>
    </div>
  );
}
