import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export function ProductForm() {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (router.query.id) {
        await axios.put("/api/products/" + router.query.id, product);
        toast.success("Product updated successfully");
      } else {
        await axios.post("/api/products", product);
        toast.success("Product created successfully");
      }
      router.push("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleChange = ({ target: { name, value } }) =>
    setProduct({ ...product, [name]: value });

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get("/api/products/" + router.query.id);
      setProduct(data);
    };
    if (router.query?.id) {
      getProduct();
    }
  }, []);

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name:
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tigh focus:outline-none focus:shadow-outline"
            value={product.name}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Price:
          </label>
          <input
            type="text"
            name="price"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tigh focus:outline-none focus:shadow-outline"
            value={product.price}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            name="description"
            rows="2"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tigh focus:outline-none focus:shadow-outline"
            value={product.description}
          ></textarea>
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 py-2 px-2 rounded focus:outline-none focus:shadow-outline font-bold text-white">
          {router.query.id ? "Update Product" : "Save Product"}
        </button>
      </form>
    </div>
  );
}
