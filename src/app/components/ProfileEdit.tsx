import { Edit, Settings } from "@mui/icons-material";
import Button from "@mui/material/Button";
import React, { useState } from "react";

const ProfileEdit = () => {
  const [isEditProf, setIsEditProf] = useState(false);

  return (
    <div className="flex-col items-center justify-center hidden group-hover:block z-10 bg-purple-100 w-80 h-72 absolute top-5 right-5 duration-700 rounded-md shadow-lg border-2 border-purple-600">
      {isEditProf === false ? (
        <>
          <div className="group ml-auto hover flex-col" onClick={() => setIsEditProf(true)}>
            <Edit></Edit>
            {/* hiddenをつける☟ */}
            <p className="group-hover:block py-1 px-2 bg-grey-200">edit to profile</p>
          </div>
          <img
            src={photoURL}
            alt=""
            className="inline-block w-16 h-16 rounded-full mt-10"
          />r
          <p className="mt-3">{displayName}</p>
          <p className="my-6">現在のタスク数：{todos.length}</p>
          <p onClick={handleSignOut}>
            <Button>ログアウト</Button>
          </p>
        </>
      ) : (
        <>
          <input
            type="fail" 
            value={DisplayName}
          />
          <input
            type="text"
            value={D}
        </>
      )}
    </div>
  );
};

export default ProfileEdit;
