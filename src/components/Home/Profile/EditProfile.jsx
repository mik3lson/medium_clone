import React, {useEffect, useRef, useState} from 'react';
import Modal from '../../../utils/Modal';
import {LiaTimesSolid} from "react-icons/lia";
import { toast } from 'react-toastify';
import { getDownloadURL } from 'firebase/storage';
import { serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { storage, db } from '../../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';

//editing profile component doesnt work because firebase don't allow me create storage without a billing account


const EditProfile =({editModal, setEditModal,getUserData}) => {
    const imgRef = useRef(null)
    const [imgUrl, setImgUrl] = useState("");
    const [loading, setLoading] = useState (false);
    const [form, setForm] = useState ({
        username : "",
        userImg : "",
        bio : "",
    });

    const openFile =() =>{
        imgRef.current.click();
    };

    //if there is date in our database
    useEffect(() => {
        if (getUserData) {
            setForm (getUserData);
        }else {
          setForm ({ username : "", bio : "", userImg : ""});
        }
    }, [getUserData]);
    //save form
    const saveForm = async() => {
        if (form.username ==="" || form.bio ==="") {
          toast.error ("Please fill all fields");
          return;
        }

        setLoading (true);
         //upload image to firebase storage (doesn't work without billing account)
        const storageRef = ref(storage, `image/${form.userImg.name}`);
         await uploadBytes(storageRef, form.userImg);

         const imageUrl = await getDownloadURL(storageRef);

         try{
          const docRef = doc (db, "users", getUserData?.userId);
          await updateDoc (docRef, {
            bio: form.bio,
            username: form.username,
            userImg: imageUrl ? imageUrl : form.userImg,
            userId: getUserData?.userId,
         });
         setLoading (false);
         setEditModal (false);
         toast.success ("Profile updated successfully");
        } catch (error) {
          toast.error (error.message);
        }
    };
    
    return (
       <Modal modal={editModal} setModal ={setEditModal}>
          <div 
             className ="center  z-20 pointer-events-auto w-[95%] md:w-[45rem] bg-white mx-auto shadows
              my-[1rem] mb-[3rem] p-[2rem]">
                {/* head */}
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-xl">Profile Information</h2>
                    <button className="text-xl"
                      onClick ={() => setEditModal (false)}>
                        <LiaTimesSolid />
                    </button>
                </div>
                {/* body */}
                <section className="mt-6">
                    <p className ='pb-3 text-sm text-gray-500'>Photo</p>
                    <div className =" flex gap-[2rem]">
                        <div className ="w-[5rem]">
                            <img className="min-h-[5rem] min-w-[5rem] object-cover border border-gray-500 rounded-full"
                               src={imgUrl ? imgUrl : "/profile.jpg"}
                               alt="profile image"
                            />
                        <input 
                            onChange={(e) => {
                              setImgUrl(URL.createObjectURL(e.target.files[0]));
                              setForm({ ...form, userImg: e.target.files[0] });
                            }}
                            accept="image/jpg, image/png, image/jpeg "
                            ref={imgRef} 
                            type='file' 
                            hidden
                            />
                        </div>
                        <div>
                         <div className="flex gap-4 text-sm">
                             <button onClick={openFile} className="text-green-600">Update</button>
                             <button className="text-red-600">Remove</button>
                         </div>
                           <p className="w-full sm:w-[20rem] text-gray-500 text-sm pt-2">
                              Recommeded: Square JPG, PNG, or GIF, at least 1,000 pixels per side
                           </p>
                        </div>
                    </div>
                </section>
                {/* Profile edit form */}
                <section className ="pt-[1rem] text-sm">
                    <label className="pb-3 block" htmlFor ="">Name</label>
                    <input 
                      onChange ={(e) => setForm ({...form, username: e.target.value})}
                      value ={form.username}
                      type="text" 
                      placeholder="username.." 
                      className="p-1 border-b border-gray-300 w-full outline-none"
                      maxLength={50} />
                      <p className ="text-sm text-gray-400 pt-2">
                        Appears on your profile page, as your byline, and in your responses. {form.username.length}/50
                      </p>
                <section className="pt-[1rem] text-sm">
                    <label className="pb-3 block" htmlFor ="">Bio</label>
                    <input 
                      onChange ={(e) => setForm ({...form, bio: e.target.value})}
                      value ={form.bio}
                        type="text" placeholder="Bio.." 
                        className="p-1 border-b border-gray-300 w-full outline-none"
                      maxLength={160} />
                      <p className ="text-sm text-gray-400 pt-2">
                        Appears on your profile and next to your stories" "{form.bio.length}/100
                      </p>
                    </section>
                </section>
                {/* foot */}
                <div className="flex items-center justify-end gap-4 pt-[2rem]">
                    <button 
                      onClick={() => setEditModal(false)}
                      className="border border-green-600 py-2 px-5 rounded-full text-green">Cancel</button>
                    <button 
                      onClick={saveForm} 
                      className ="border border-green-600 py-2 px-5 rounded-full text-white bg-green-800">Save</button>

                </div>
              </div>
       </Modal>
    );
};



export default EditProfile;