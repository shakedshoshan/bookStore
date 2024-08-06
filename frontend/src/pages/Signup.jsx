import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function Signup() {
    const history=useNavigate();

    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')

    // async function submit(e){
    //     e.preventDefault();

    //     try{

    //         await axios.post("http://localhost:5555/users",{
    //             userName,password
    //         })
    //         .then(res=>{
    //             if(res.data=="exist"){
    //                 alert("User already exists")
    //             }
    //             else if(res.data=="notexist"){
    //                 history("/home",{state:{id:userName}})
    //             }
    //         })
    //         .catch(e=>{
    //             alert("wrong details")
    //             console.log(e);
    //         })

    //     }
    //     catch(e){
    //         console.log(e);

    //     }

    // }


    return (
        <div className="Signup">

            <h1>Signup</h1>

            <form action="POST">
                <input type="email" onChange={(e) => { setUserName(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <input type="submit" onClick={submit} />

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/">Login Page</Link>

        </div>
    )
}

export default Signup