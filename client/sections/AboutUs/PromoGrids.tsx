export default function PromoGrids() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <div className="h-112.5 rounded-2xl overflow-hidden">
          <video
            src="https://purity.nextsky.co/cdn/shop/videos/c/vp/f491a8af069041bcb3e402b16f3d636f/f491a8af069041bcb3e402b16f3d636f.HD-1080p-2.5Mbps-60766758.mp4?v=0"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-112.5 bg-[#f2efe6] rounded-2xl overflow-hidden flex flex-col justify-center items-center p-6">
          <div className="flex flex-col items-start w-full max-w-md gap-6">
            <h1 className="text-4xl font-medium">
              True Beauty <br /> Guided by Intention
            </h1>
            <p>
              We believe beauty isn't shaped by trends, but by truth—how it
              feels, how it's made, and why it matters. Every formula is led by
              care, crafted with purpose, and grounded in deep respect for your
              skin and the planet.
            </p>
            <a
              href="#_"
              className="relative inline-flex items-center justify-start px-7 py-4 overflow-hidden font-medium transition-all bg-[#1f473e] rounded-xl hover:bg-white group border-2 border-[#1f473e]"
            >
              <span className="absolute inset-0 border-0 group-hover:border-25 ease-linear duration-100 transition-all border-white rounded-xl" />
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-[#1f473e] whitespace-nowrap">
                Explore Products
              </span>
            </a>
          </div>
        </div>
        <div className="h-112.5 bg-[#f2efe6] rounded-2xl overflow-hidden flex flex-col justify-center items-center p-6">
          <div className="flex flex-col items-start w-full max-w-md gap-6">
            <h1 className="text-4xl font-medium">
              Cruelty-free <br /> with Every Drop
            </h1>
            <p>
              We believe beauty should never come at the cost of compassion.
              That's why every formula is 100% cruelty-free—carefully crafted
              without testing, without harm, and without compromise.
            </p>
            <a
              href="#_"
              className="relative inline-flex items-center justify-start px-7 py-4 overflow-hidden font-medium transition-all bg-[#1f473e] rounded-xl hover:bg-white group border-2 border-[#1f473e]"
            >
              <span className="absolute inset-0 border-0 group-hover:border-25 ease-linear duration-100 transition-all border-white rounded-xl" />
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-[#1f473e] whitespace-nowrap">
                Our Promise
              </span>
            </a>
          </div>
        </div>
        <div className="h-112.5 rounded-2xl overflow-hidden">
          <img
            src="https://purity.nextsky.co/cdn/shop/files/banner-about-us-0.jpg?v=1761290722&width=720"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
