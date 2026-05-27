// "use client"
// import { UserDetailContext } from "../context/UserDetailContext";
// import { SelectedChapterIndexContext } from "../context/SelectedChapterIndexContext";


// import { useUser } from '@clerk/nextjs'
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// function Provider({children}) {
//  const {user}=useUser();
// const [userDetail,setUserDetail]=useState();
// const [selectedChapterIndex, setSelectedChapterIndex]=useState(0);
//    useEffect(()=>{
//    user&&CreateNewUser();
//    },[user])


//     const CreateNewUser=async()=>{
//        const result= await axios.post(`${window.location.origin}/api/user`,{
//             name:user?.fullName,
//             email:user?.primaryEmailAddress?.emailAddress
//         });
        
//         console.log(result.data);
//         setUserDetail(result.data);
//     }
//   return (
//     // <UserDetailContext.Provider value={{ userDetail,setUserDetail}}>
//     // <div>{children}</div>
//     // </UserDetailContext.Provider>
//     <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
//       <SelectedChapterIndexContext.Provider value={{selectedChapterIndex, setSelectedChapterIndex}}>
//      <div>{children}</div>
//       </SelectedChapterIndexContext.Provider>
     
// </UserDetailContext.Provider>
//   )
// }

// export default Provider

"use client";

import { UserDetailContext } from "../context/UserDetailContext";
import { SelectedChapterIndexContext } from "../context/SelectedChapterIndexContext";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Provider({ children }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState();
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

  useEffect(() => {
    // ✅ Only call API when user data is fully loaded
    if (user?.fullName && user?.primaryEmailAddress?.emailAddress) {
      CreateNewUser();
    }
  }, [user]);

  const CreateNewUser = async () => {
    try {
      // ✅ Use relative URL instead of window.location.origin
      const result = await axios.post("/api/user", {
        name: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
      });

      console.log("✅ User created/fetched:", result.data);
      setUserDetail(result.data);
    } catch (error) {
      console.error("❌ Axios Error in CreateNewUser:", error);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <SelectedChapterIndexContext.Provider
        value={{ selectedChapterIndex, setSelectedChapterIndex }}
      >
        <div>{children}</div>
      </SelectedChapterIndexContext.Provider>
    </UserDetailContext.Provider>
  );
}

export default Provider;
