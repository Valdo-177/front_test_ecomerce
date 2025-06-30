import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export const ProductCard = ({ product }: { product: Product }) => {
  const ImageUrl = `http://localhost:5000${product.imageUrl}`;

  return (
    <div className="border rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={ImageUrl}
          alt={product.name}
          fill
          className="object-contain rounded-md"
        />
      </div>
      <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
      <p className="text-xs text-gray-500 line-clamp-2 mb-2">
        {product.description}
      </p>
      <span className="text-primary font-bold text-sm">
        ${product.price.toLocaleString()}
      </span>
    </div>
  );
};
