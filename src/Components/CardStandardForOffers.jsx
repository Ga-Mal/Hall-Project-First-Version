import { Card } from "flowbite-react";
// import { Link } from "react-router";

export default function CardStandardForOffers({ btnMassege, details }) {
  let descriptionLength = details.description.length > 100 ? details.description.slice(0, 100) : details.description;

  return (
    <div className="w-full flex justify-center">
      <Card className="max-w-sm text-(--color-text-black) bg-transparent! hover:shadow-[#641888e3] shadow-2xl duration-200">
        <div className=" h-full">
          <img src={details.headerImg} alt="img" className="rounded-2xl h-full" />
          {/* <BlurImage src={} alt={"Header Img"} className="w-full h-1/5" /> */}
        </div>
        <h5 className="text-xl font-semibold">{details.title}</h5>

        <p> {descriptionLength} </p>
        <div className="">
          <div className="text-3xl text-center pb-5 font-bold">
            <del className="italic text-red-900">{details.oldPrice}</del>
            <p className="text-(--color-hover)">{details.newPrice}</p> جنية
          </div>
          <div className="text-center text-2xl pt-4">
            {/* <Link
              to={`${details.id}`}
              className="bg-(--color-text-gold) px-5 py-1.5 rounded-2xl hover:bg-(--color-hover) hover:text-(--color-text-light) duration-500 ">
              {btnMassege}
            </Link> */}
          </div>
        </div>
      </Card>
    </div>
  );
}
