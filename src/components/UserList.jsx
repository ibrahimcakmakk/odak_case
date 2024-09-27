import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import DataGrid, { Column, Selection } from "devextreme-react/data-grid";
import axios from "axios";
import { FaEdit } from "react-icons/fa"; 
import ProductList from "./ProductList";


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((response) => setUsers(response.data.users))
      .catch((error) => console.error("User api error:", error));
  }, []);

  
  const handleEditClick = (user) => {
    if (!user || !user.id) {
      console.error("Invalid user data:", user); 
      return;
    }
    navigate(`/user-details/${user.id}`); 
  };

  
  const onUserSelectionChanged = (e) => {
    if (e.selectedRowsData.length > 0) {
      const selectedUser = e.selectedRowsData[0]; 
      setSelectedUser(selectedUser); 
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">User List</h2>
      <div className="bg-white border-2 border-gray-200 shadow-lg rounded-lg p-6">
        <DataGrid
          className="mb-10"
          dataSource={users}
          keyExpr="id"
          showBorders={true}
          rowAlternationEnabled={true}
          onSelectionChanged={onUserSelectionChanged} 
        >
          <Selection mode="single" />
          <Column alignment="left" dataField="firstName" caption="Name" />
          <Column alignment="center" dataField="lastName" caption="Surname" />
          <Column fixedPosition="right" dataField="email" caption="Email" />

          
          <Column
            width={100}
            alignment="center"
            cellRender={(cellData) => (
              <button
                onClick={() => handleEditClick(cellData.data)} 
                className={`text-indigo-600 hover:text-indigo-800 ${
                  !selectedUser ? "cursor-not-allowed" : ""
                }`}
                disabled={!selectedUser} 
              >
                <FaEdit size={20} />
              </button>
            )}
          />
        </DataGrid>

       
      </div>
      <ProductList reviewerName={selectedUser ? `${selectedUser.firstName} ${selectedUser.lastName}` : ''} />
    </div>
  );
};

export default UserList;
