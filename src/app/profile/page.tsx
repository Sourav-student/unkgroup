"use client";

import axios from "axios";
import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "motion/react";
import toast from "react-hot-toast";

type UserInfoType = {
   email: string,
   username: string,
   _id: string,
   profile_pic: string
}

export default function Profile() {
   const router = useRouter();
   const [userInfo, setUserInfo] = useState<UserInfoType>();
   const [profilePic, setProfilePic] = useState<File | null>(null);
   const [isUsernameChange, setIsUsernameChange] = useState<boolean>(false);
   const [changeProfilePic, setChangeProfilePic] = useState<boolean>(false);

   //GET USER INFOMATION
   const getUserInfo = async () => {
      const res = await axios.get("/api/auth/user/me");
      setUserInfo(res.data.user);
      // console.log(res.data.user);
   }

   useEffect(() => {
      getUserInfo();
   }, [])

   //FILE UPLOAD FROM LOCAL SYSTEM
   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      setProfilePic(file);
   }

   //UPLOAD PROFILE PICTURE
   const handleUpdateProfile = async () => {
      if (!profilePic) {
         toast.error("Please select a file first");
         return;
      }

      try {
         const formData = new FormData();
         formData.append("profilePic", profilePic);
         const res = await axios.patch("/api/auth/user/upload-profile-pic", formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });
         toast.success(res.data.message);
         // console.log(res);
         getUserInfo();
      } catch (error: any) {
         console.log(error);
      }
   }

   //LOGOUT FUNCTION
   const logout = async () => {
      try {
         const res = await axios.get("/api/auth/user/logout");
          toast.success(res.data.message);
         // console.log(res);
         router.push("/login");
      } catch (error: any) {
         console.log(error);
      }
   }

   //UPDATE USERNAME FUNCTION
   const handleChangeUsername = async () => {
      try {
         const res = await axios.patch("/api/auth/user/edit-user-info", { username: userInfo?.username });
         // console.log(res.data);
         toast.success(res.data.message);
         getUserInfo();
      } catch (error: any) {
         console.log(error);
      }
   }

   return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
         <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-sm  bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-6 flex flex-col items-center gap-5"
         >
            {/* Profile Image */}
            <div className="relative group">
               <Image
                  src={userInfo?.profile_pic || "/file.svg"}
                  alt="Profile image"
                  width={160}
                  height={160}
                  className="rounded-full border border-neutral-700 object-cover"
               />

               <button
                  onClick={() => setChangeProfilePic((prev) => !prev)}
                  className="absolute top-1 right-1 text-xs px-2 py-1 rounded-md bg-amber-400 text-black opacity-90 hover:opacity-100 transition"
               >
                  {changeProfilePic ? "Close" : "Edit"}
               </button>
            </div>

            {/* Change Profile Picture */}
            {changeProfilePic && (
               <div className="w-full flex flex-col gap-3">
                  <input
                     type="file"
                     onChange={handleFileChange}
                     className="text-sm
                     file:mr-3 file:px-3 file:py-1 file:rounded-md file:border-0 file:bg-neutral-80 file:text-white text-neutral-400"
                  />
                  <button
                     onClick={handleUpdateProfile}
                     className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-400 transition font-medium"
                  >
                     Update Profile Image
                  </button>
               </div>
            )}

            {/* User Info */}
            <div className="w-full bg-neutral-950 rounded-xl p-4 text-center">
               <p className="text-lg font-medium">
                  {userInfo?.username}
               </p>

               <button
                  onClick={() => setIsUsernameChange((prev) => !prev)}
                  className="mt-2 text-xs px-3 py-1 rounded-md bg-amber-400 text-black hover:bg-amber-300 transition"
               >
                  {isUsernameChange ? "Close" : "Edit Username"}
               </button>

               {isUsernameChange && (
                  <div className="mt-3 flex items-center justify-center gap-2">
                     <input
                        type="text"
                        value={userInfo?.username}
                        onChange={(e) =>
                           userInfo &&
                           setUserInfo({ ...userInfo, username: e.target.value })
                        }
                        className="px-2 py-1 rounded-md text-sm bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
                     />
                     <button
                        onClick={handleChangeUsername}
                        className="text-xs px-3 py-1 rounded-md bg-amber-400 text-black
                       hover:bg-amber-300 transition"
                     >
                        Save
                     </button>
                  </div>
               )}
            </div>

            {/* Logout */}
            <button
               onClick={logout}
               className="w-full py-2 rounded-lg bg-red-500 hover:bg-red-400 transition font-medium"
            >
               Logout
            </button>
         </motion.div>
      </div>
   );
}