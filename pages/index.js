import { Layout } from "../components/Layout";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function HomePage({ products }) {

  const renderProducts = () => {
    if (products.length === 0) 
      return <h1 className="text-center text-2xl font-bold">No products yet</h1>;

    return products.map((product) => (
      <ProductCard product={product} key={product.id} />
    ));
  };

  return (
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {renderProducts()}
      </div>
    </Layout>
  );
}

// server side code
export const getServerSideProps = async (context) => {
  const { data: products } = await axios.get(
    "http://localhost:3000/api/products"
  );

  return {
    props: {
      products,
    },
  };
};
