import { useEffect, useRef, useState } from "react";
import type { Product } from "../model/types";
import fetchGraphQL from "../service/app.service";

const GET_PRODUCTS = `
    query GetProducts($category: String) {
        products(category: $category) {
            id,
            name,
            category,
            price
        }
    }
`;

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  // Stores the last fetched list so sorting always works from the original order
  const baseProducts = useRef<Product[]>([]);
  const [sortBy, setSortBy] = useState<keyof Product | "">("");
  const [filterBy, setFilterBy] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchGraphQL(GET_PRODUCTS, {}).then((data) => {
      baseProducts.current = data.products;
      setProducts(data.products);
      setCategories(data.products.map((product: Product) => product.category));
    });
  }, []);

  function sortProducts(value: keyof Product | "") {
    setSortBy(value);
    if (value) {
      // Sort from baseProducts so repeated sorts don't compound on each other
      const sorted = [...baseProducts.current].sort((a: Product, b: Product) => {
        if (typeof a[value] === "number") {
          return (a[value] as number) - (b[value] as number);
        }
        if (a[value] < b[value]) return -1;
        if (a[value] > b[value]) return 1;
        return 0;
      });
      setProducts(sorted);
    } else {
      setProducts([...baseProducts.current]);
    }
  }

  function filterByCategory(category: string) {
    setFilterBy(category);
    fetchGraphQL(GET_PRODUCTS, { category: category === "all" ? "" : category }).then((data) => {
      baseProducts.current = data.products;
      setProducts(data.products);
      if (sortBy) {
        sortProducts(sortBy);
      }
    });
  }

  return (
    <>
      <h1>Products</h1>

      <div className="selectBox">
        <label htmlFor="sortBy">Sort By</label>
        <select
          name="sortBy"
          onChange={(e) => sortProducts(e.target.value.toLowerCase() as keyof Product)}
        >
          <option value={""}>-----Please Select----------</option>
          <option value="Name">Name</option>
          <option value="Category">Category</option>
          <option value="Price">Price</option>
        </select>
      </div>

      <div className="selectBox">
        <label htmlFor="sortBy">Filter by category</label>
        <select name="category" onChange={(e) => filterByCategory(e.target.value)}>
          <option value="all">-----All----------</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <table className="productList">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>$ {product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
