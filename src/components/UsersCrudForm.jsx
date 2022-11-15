import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useForm} from "react-hook-form"

const UsersCrudForm = ({getUsersList,selectedUser,deselectUser,showModal}) => {
    const {handleSubmit, register, reset, formState: { errors }} = useForm()
    const [passVisibility, setPassVisibility]=useState(false)

    useEffect(()=>{
        if(selectedUser){
            reset(selectedUser)
        }else{
            reset({
                email: "",
                password: "",
                first_name: "",
                last_name: "",
                birthday: "" 
            })
        }
    },[selectedUser])

    const submit = data =>{
        if(selectedUser){
            axios.put(`https://users-crud1.herokuapp.com/users/${selectedUser.id}/`,data)
            .then(()=>getUsersList(), deselectUser(),showModal("User updated"))
            .catch(error => console.log(error.response?.data))
        }else{
            axios.post("https://users-crud1.herokuapp.com/users/",data)
            .then(()=>getUsersList(),showModal("User created"))
            .catch(error =>console.log(error.response?.data))
            reset({
                email: "",
                password: "",
                first_name: "",
                last_name: "",
                birthday: "" 
             })
        }
        
    }

    return (
        <form className='User-form' onSubmit={handleSubmit(submit)}>
            <h4>New User</h4>
            <div className="Name-inputs">
                <div className='Icon'>
                    <i className="fa-solid fa-user"></i>
                </div>
                <div className='User-data'>
                    <label htmlFor="first-name"></label>
                    <input {...register("first_name", { required: true})} type="text" id='first-name' placeholder='First Name' className='First-name' autoComplete='none'/> 
                    <label htmlFor="last-name"></label>
                    <input {...register("last_name", { required: true})} type="text" id='last-name' placeholder='Last Name' className='Last-name' autoComplete='none'/>
                </div>
                {
                (errors.first_name || errors.last_name) && <span className='Error-msg'>Please complete your name.</span>
                }

            </div>
            
            <div className="Email-input">
                <div className='Icon'>
                    <i className="fa-solid fa-envelope"></i>
                </div>
                <div className='User-data'>
                    <label htmlFor="email"></label>
                    <input {...register("email",{ 
                            required: true,  
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
                        })} type="text" id='email' placeholder='Email' className='Email'/>
                </div>
                {
                errors.email &&<span className='Error-msg'>Please check your email address.</span>
                } 
            </div>
            

            <div className="Password-input">
                <div className='Icon'><i className="fa-solid fa-lock"></i></div>
                <div className='User-data-pass'>
                {/* it should contain one Capital Letter, one Small Letter, and the number of characters should be between 6 to 15 */}
                    <label htmlFor="password"></label>
                    <input {...register("password", { 
                            required: true, 
                            // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                        })} type={passVisibility === true?"text":"password"} id='password' placeholder='Password' className='Password'/>
                    <span className='Pass-btn' onClick={()=>setPassVisibility(!passVisibility)}><i className={passVisibility === true?"fa-solid fa-eye":"fa-solid fa-eye-slash"}></i></span>  
                </div>
                {
                errors.password && <span className='Error-msg'>Please check your password.</span>
                }
            </div>

            <div className="Birthday-input">
                <div className='Icon'><i className="fa-solid fa-cake-candles"></i></div>
                <div className='User-data'>
                    <label htmlFor="birthday"></label>
                    <input {...register("birthday", { required: true })} type="date" id='birthday' placeholder='Birthday' className='Birthday'/>
                </div>
                {
                errors.birthday && <span className='Error-msg'>Please enter your birthday.</span>
                }
            </div>

            <button className='Upload-btn'>Upload</button>
            {
                selectedUser?<div className='Cancel-btn'onClick={()=>deselectUser()}> Cancel</div>:""
            }
            
        </form>
    );
};

export default UsersCrudForm;