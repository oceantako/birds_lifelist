import { title } from "@/components/primitives";
import { Birds_table } from "./components/birds_table"

export default function Birds() {
  return (
    <div className="flex justify-center">
      <div className="w-full sm:w-full md:w-11/12 lg:w-2/3">

        <section className="h-12">

        </section>

        <section className="">
          <Birds_table></Birds_table>
        </section>


      </div>
    </div>
  );
}
