import { useState,useEffect } from "react"
import { useDispatch } from "react-redux";
import {Link, useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
import {userSignInData} from "../../../rtk/features/User/userSingInSlice"

const UserLogin = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const customId = "custom-id-yes";
const [userSignIn,setUserSignIn] = useState({
    email: "",
    password: ""
})

const handleChange = (e) =>{
    const {name,value}= e.target;
    setUserSignIn({
        ...userSignIn,
        [name]:value
    })
    
}

const requiredfields = ["email","password"]

const handleSubmit = async(e) =>{
    e.preventDefault();

    try {
      const hasEmptyFields = requiredfields.some((fields)=> !userSignIn[fields])

      if (hasEmptyFields) {
          toast.error("Please fill all the Required Fields",{toastId:customId});
          return;
      }
      const actionResult = await dispatch(userSignInData(userSignIn));
      console.log("actionResult",actionResult);
      if (actionResult?.payload?.data?.success === true) {
        toast.success(actionResult?.payload?.data?.message,{toastId:customId});
        Navigate("/user-profile")
      }
    } catch (error) {
      console.log(error);
    }
 


}




console.log("userSignIn",userSignIn);


  return (
    <div>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                   
                    <form className='card' onSubmit={handleSubmit}>
                    

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
     name="email" value={userSignIn.email}
     onChange={handleChange}  />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"  name="password" value={userSignIn.password}
    onChange={handleChange}  />
  </div>
  <div className="mb-3 form-check">
  <button type="submit" className="btn btn-primary">Sign In</button>
  </div>

  <div class="mb-3 form-check">
    <label class="form-check-label" htmlFor="exampleCheck1">Not a User ? <Link to="/">Sign Up</Link></label>
  </div>

</form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserLogin