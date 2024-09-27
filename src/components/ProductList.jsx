import React, { useEffect, useState } from "react";
import axios from "axios";
import DataGrid, { Column, Editing } from 'devextreme-react/data-grid';

const ProductList = ({ reviewerName }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
   
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => console.error("Product Api error:", error));
  }, []);

  useEffect(() => {
    if (reviewerName) {
      console.log("Selected User Name:", reviewerName); 

      const filtered = products.filter(product =>
        product.reviews.some(review =>
          review.reviewerName.toLowerCase() === reviewerName.toLowerCase()
        )
      );

       
      setFilteredProducts(filtered);
    }
  }, [reviewerName, products]);

  const handleDelete = (key) => {
    setProducts(products.filter(product => product.id !== key));
  };

  const handleUpdate = (e) => {
    const updatedData = products.map(item =>
      item.id === e.key ? { ...item, ...e.data } : item
    );
    setProducts(updatedData);
  };
  const handleAdd = (e) => {
    const newProduct = { ...e.data, id: products.length + 1 }; 
    setProducts([...products, newProduct]);
    e.cancel = true; 
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">{reviewerName}</h2>
      {filteredProducts.length > 0 ? (
        <DataGrid
          dataSource={filteredProducts}
          showBorders={true}
          columnAutoWidth={true}
          rowAlternationEnabled={true}
          hoverStateEnabled={true} 
          onRowRemoving={(e) => handleDelete(e.data.id)}
          onRowUpdating={handleUpdate} 
        >
          
          <Column
            dataField="title"
            caption="Product"
            alignment="center"
          />

          
          <Column
            dataField="price"
            caption="Price ($)"
            alignment="center"
            dataType="number"
            format="currency"
          />

          
          <Column
            dataField="category"
            caption="Category"
            alignment="center"
          />
           <Editing
          mode="popup"
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true} 
          useIcons={true} 
          onRowInserting={handleAdd} 
        />
        </DataGrid>
      ) : (
        <p className="font-semibold text-red-500 text-center text-2xl">No reviews found for this user.</p>
      )}
    </div>
  );
};

export default ProductList;
