

export default function BackgroundImg({img , details}) {
  return (
    <div className="overflow-hidden">
      <div className="w-screen h-[60vh] bg-cover bg-center bg-no-repeat " style={{ backgroundImage: `url(${img})` }}> 
        <div className="h-full w-[80%] md:w-[90%] mx-auto z-10 text-4xl text-center flex justify-center items-center font-bold text-(--color-text-gold) drop-shadow-black drop-shadow-xl">
          {details && details}
        </div>
      </div>
    </div>
  );
}
