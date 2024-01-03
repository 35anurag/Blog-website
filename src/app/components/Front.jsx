import FrontImg from "../../images/front.jpg";
import Image from "next/image";

const Front = () => {
  return (
    <div className="opacity-0 lg:opacity-100">
    <div className="absolute m-[17rem]">
    </div>
      <div>
        <Image src={FrontImg} alt="front images" className="w-full h-screen" />
        <div className=" bg-black opacity-20 fixed top-0 w-full h-screen"></div>
      </div>
    </div>
  );
};

export default Front;
