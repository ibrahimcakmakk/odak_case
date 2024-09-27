import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DataGrid, { Column, Editing,Scrolling } from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.material.blue.light.css";
import ProductList from "../components/ProductList";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/users/${userId}`)
      .then((response) => {
        setUser(response.data);
        setDataSource([response.data]);
      })
      .catch((error) => {
        console.error("Invalid user details:", error);
        setError("Invalid user details");
      });
  }, [userId]);

  const handleDelete = (id) => {
    setDataSource(dataSource.filter((user) => user.id !== id));
  };

  const handleUpdate = (e) => {
    const updatedData = dataSource.map((item) =>
      item.id === e.key ? { ...item, ...e.data } : item
    );
    setDataSource(updatedData);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Users Details
      </h2>

      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        columnAutoWidth={true}
        rowAlternationEnabled={true}
        hoverStateEnabled={true}
        className="custom-data-grid"
        onRowRemoving={(e) => handleDelete(e.data.id)}
        width="100%"
        columnHidingEnabled={true} 
        allowColumnResizing={true} 
        columnMinWidth={150} 
        columnMaxWidth={300} 
      >
        <Column dataField="firstName" caption="Name" width={150} />
        <Column dataField="lastName" caption="Surname" width={150} />
        <Column dataField="email" caption="Email" width={250} />
        <Column dataField="phone" caption="Phone" width={150} />
        <Column dataField="age" caption="Age" width={100} />
        <Column dataField="address.city" caption="City" width={150} />
        <Column dataField="company.name" caption="Company" width={200} />
        <Column
          dataField="company.department"
          caption="Department"
          width={200}
        />
        <Column dataField="company.title" caption="Title" width={200} />
        <Scrolling mode="virtual" /> 

        <Editing
          mode="popup"
          allowUpdating={true}
          allowDeleting={true}
          useIcons={true}
          onRowUpdating={handleUpdate}
          allowAdding={true}
          onRowInserting={(e) => {
            const newData = { ...e.data, id: dataSource.length + 1 };
            setDataSource([...dataSource, newData]);
            e.cancel = true;
          }}
        />
      </DataGrid>

      <ProductList reviewerName={`${user.firstName} ${user.lastName}`} />
    </div>
  );
};

export default UserDetails;
