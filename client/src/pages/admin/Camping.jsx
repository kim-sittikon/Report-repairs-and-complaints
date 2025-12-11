import FormInputs from "@/components/form/FormInputs";
import TextAreaInput from "@/components/form/TextAreaInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CampingSchema = z.object({
  title: z.string().min(2, "Title must be more than 2 charactor"),
  price: z.coerce.number(),
  description: z.string().max(50,"Description mush be less than 50 Charactor")


});

const Camping = () => {
  const { register, handleSubmit,formState} = useForm({
    resolver: zodResolver(CampingSchema),
  });
const {errors} = formState
console.log(errors)

  const jukkruSubmit = (data) => {
    console.log(data);
  };

  return (
    <section>
      <br />
      <h1 className="capitalize text-3xl font-semibold p-3">
        สร้างข่าวสาร / ประกาศ
      </h1>
      <div className="border p-8 rounded-md">
        <div className="text-center mb-8">
          <h2 className="capitalize text-2xl font-semibold">
            รายละเอียดการประกาศ
          </h2>
          <p className="text-gray-500 mt-2">ใส่ข้อมูลให้ครบถ้วนก่อนเผยแพร่</p>
        </div>

        <form onSubmit={handleSubmit(jukkruSubmit)}>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInputs
              register={register}
              name="title"
              type="text"
              placeholder="Title..."
              errors={errors}
            />
            <FormInputs
              register={register}
              name="price"
              type="number"
              placeholder="Input your Price..."
              errors={errors}
            />
            <TextAreaInput
              register={register}
              name="description"
              type="text"
              placeholder="Input your Description"
              errors={errors}
            />

            <button>Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default Camping;
