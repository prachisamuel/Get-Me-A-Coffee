

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center flex-col text-white h-[44vh]">
        <div className="font-bold flex gap-2 text-5xl justify-center items-center">Buy me a Coffee <span><img src="/coffee.gif" alt="coffee" width={88} /></span></div>
        <p>A crowdfunding platform for creators. Get funded by your fans and followers.</p>
        <div>
          <button className="text-white bg-gradient-to-br from-[#786C3B] to-[#452B1F] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-[#452B1F] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
          <button className="text-white bg-gradient-to-br from-[#786C3B] to-[#452B1F] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-[#452B1F] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white container mx-auto pb-32 pt-14">
        <h2 className="text-3xl font-bold text-center mb-14">Your fans can buy me a coffee</h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img src="/man.gif" alt="man" className="bg-yellow-800 rounded-full p-2 text-black" width={88}/>
            <p className="font-bold">Fans want to help</p>
            <p className="text-center">Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img src="/coin.gif" alt="man" className="bg-yellow-800 rounded-full p-2 text-black" width={88}/>
            <p className="font-bold">Fans want to help</p>
            <p className="text-center">Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img src="/group.gif" alt="man" className="bg-yellow-800 rounded-full p-2 text-black" width={88}/>
            <p className="font-bold">Fans want to help</p>
            <p className="text-center">Your fans are available for you to help you</p>
          </div>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-center mb-14">Learn more about us</h2>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/QtaorVNAwbI?si=BX_X15JTEK7wTij0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
    </>
  );
}
