import React, { use } from 'react';
import { LiaTimesSolid } from 'react-icons/lia';
import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import  TagsInput  from 'react-tagsinput';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { db } from '../../../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { storage } from '../../../firebase/firebase';
import { Blog } from '../../../context/Context';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';


const Preview = ({ setPublish, title, description}) => {
    const imageref = useRef(null);
    const [imageUrl, setImageUrl] = useState ("");
    const [tags, setTags] = useState([]);
    const [desc, setDesc] = useState ("");
    const {currentUser} = Blog();
    const navigate = useNavigate();
    const [loading, setLoading] = useState (false);

    const [preview, setPreview] = useState ({
        title : "",
        photo : "",
    });
    
    useEffect(() => {
        if(title || description){
            setPreview ({...preview, title: title,});
            setDesc (description);
         }else{
            setPreview ({...preview, title: "",});
            setDesc ("");
         }
    },[title, description]);


    const handleclick = () => {
        imageref.current.click();
    };
    const handleSubmit = async () => {
        setLoading(true);
        try{
            if(preview.title === "" || desc === "" || tags.length ===0){
                toast.error("All fields are required");
                return;
        }
        const collection = collection (db, "posts"); //collection is imported from firebase firestore
        const storageRef = ref (storage, `image/${preview.photo.name}`); //upload image to firebase storage
        await uploadBytes (storageRef, preview.photo);

        const imageUrl = await getDownloadURL (storageRef);

        await addDoc (collection, {
            userId : currentUser?.uid,
            title : preview.title,
            desc,
            tags,
            postImg : imageUrl,
            created : Date.now(),
            pageViews : 0,
       });
        toast.success ("Post published successfully");
        navigate ("/");
        setPublish(false);
        setPreview ({
            title : "",
            photo : "",
        });
        }catch (error){
        toast.error (error.message);
    }finally {
        setLoading (false);
    }
    };
  return (
  <section className="absolute inset-0 bg-white z-30">
    <div className ="size my-[2rem]">
        <span 
            onClick ={() => setPublish (false)}
           className= "absolute right-[1rem] md:right-[5rem] top-[3rem] text-2xl cursor-pointer">
            <LiaTimesSolid />
        </span>
        {/* preview the text */}
        <div className ="mt-[8rem] flex flex-col md:flex-row gap-10">
            <div className="flex-[1]">
                <h3 className="font-poppins text-5xl">Story Preview</h3>
                <div
                   style ={{backgroundImage : `url(${imageUrl})`}}
                   onClick={handleclick}
                   className ="w-full h-[200px] object-cover bg-gray-100 mt-9 grid place-items-center
                cursor-pointer bg-cover bg-no-repeat">
                    {!imageUrl && "Add Image"}
                </div>
                <input 
                    onChange={(e) => {
                        setImageUrl(URL.createObjectURL(e.target.files[0]));
                        setPreview ({
                            ...preview,
                            photo : e.target.files[0],
                        });
                    
                    }}
                        ref={imageref} type="file" hidden
                 />
                 <input 
                    type="text" 
                    placeholder='Title' 
                    className ="outline-none w-full font-title border-b border-gray-300 py-2" 
                    value={preview.title}
                    onChange={(e) => setPreview ({
                        ...preview,
                        title : e.target.value,
                    })
                }
                />
                <ReactQuill 
                   theme='bubble' 
                   value={desc} 
                   onChange={setDesc} 
                   placeholder="Tell your story..."
                   className='py-3 font-title border-b border-gray-300'
                   />
                   <p className="text-sm text-gray-500 mt-4">
                      <span className='font-bold'>Note: </span> Changes here will affect how your story appears in public
                      places like Medium's homepage, and in subscribers' inboxes - not
                      the content of the story itself.
                   </p>
            </div>
            
            <div className ="flex-[1] flex flex-col gap-4 mb-5 md:mb-0">
                <h3 className="text-2xl font-poppins">Publishing to: <span className="font-bold capitalize">Michael</span></h3>
                <p> Add tags so readers know what your story is about</p>
                <TagsInput value={tags} onChange={setTags} />
                <button 
                   onClick={handleSubmit}
                   className="btn bg-green-800 !w-fit !text-white !rounded-full ">
                    {loading ? "Publishing..." : "Publish Now"}
                </button>
                </div>
        </div>
    </div>
  </section>
  );

};

export default Preview;