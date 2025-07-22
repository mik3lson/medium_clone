import React, {useState} from 'react';
import Modal from "../../../utils/Modal";
import {LiaTimesSolid} from 'react-icons/lia'
import {FcGoogle} from 'react-icons/fc'
import {MdFacebook} from 'react-icons/md'
import {AiOutlineMail} from 'react-icons/ai'
const Auth=()=> {
   const [createUser, setCreateUser] = useState(false);
    return(
        <Modal>
            <section 
                className ="z-50 fixed top-0 bottom-0 left-0 md:left-[10rem]
                overflow-auto right-0 md:right-[10rem] bg-white shadow
            ">
                <button className='absolute top-8 right-8 text-2xl hover:opacity-50'>
                    <LiaTimesSolid/>
                </button>
                <div className='flex flex-col justify-center items-center gap-[3rem]'>
                    <>
                    <h2 className='text-2xl pt-[5rem]'> {createUser ? "Join Medium" : "Welcome Back"}</h2>
 
                    <div className='flex flex-col gap-2 w-fit mx-auto'>
                        <Button icon= {<FcGoogle className='text-xl'/>} text={` ${createUser ? "Sign Up" :"Sign In"} with Google`} />
                         <Button icon= {<MdFacebook className='text-xl text-blue-600 '/>}  text={` ${createUser ? "Sign Up" :"Sign In"} with Facebook` } />
                          <Button icon= {<AiOutlineMail className='text-xl'/>}  text={` ${createUser ? "Sign Up": "Sign In"} with Email`} />
                        
                    </div>
                    <p> {createUser ? "Already have an acccount":"No account"}
                        <button 
                            onClick ={() => setCreateUser(!createUser)}
                            className ="text-green-600 hover:text-green-700 font-bold ml-1">
                            {createUser ? "Sign In": "Create one"}
                        </button>
                    </p>
                    </>
                    <p className ="md:w-[30rem] mx-auto text-center text-sm mb-[3rem]">
                        Click 'Sign In' to agree to Medium's Terms of Service and acknowledge that Medium's privacy policy applies to you."
                    </p>
                </div>
            </section>
        </Modal>
    );
};
export default Auth;


const Button =({icon, text,click}) =>{
    return(
      <button className='flex items-center gap-10 sm:w-[20rem] border border-black px-3 py-2 rounded-full'>
         {icon} {text}
      </button>
    );
};