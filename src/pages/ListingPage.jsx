import React from "react";

import UserList from "../components/UserList";

const ListingPage = () => {
  return (
    <div className="flex flex-col gap-4 m-2 p-2">
      <UserList />
    </div>
  );
};

export default ListingPage;
