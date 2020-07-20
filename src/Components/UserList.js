import React from "react";


const UserList = ({user}) => {


  return(
      <div className="users">
        <pre>{user.length > 0 ? <code>{JSON.stringify(user, null, 2)}</code> : null}</pre>
      </div>
      
  );
  
}

export default UserList;