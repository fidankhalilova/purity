import Image from "next/image";

export default function ImgBanner() {
  return (
    <div>
      <div className="w-full  md:h-150 rounded-2xl overflow-hidden relative">
        <img
          src="https://purity.nextsky.co/cdn/shop/articles/blog-1_4f251b38-25e3-48eb-bf5d-e01d7cf8f600.jpg?v=1746791974&width=1920"
          alt=""
          className="w-full h-full object-cover object-[center_30%]"
        />
      </div>
    </div>
  );
}
