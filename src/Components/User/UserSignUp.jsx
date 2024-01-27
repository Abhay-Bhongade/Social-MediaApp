import { useState,useEffect } from "react"
import { useDispatch } from "react-redux";
import {Link, useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
import {userSignUpData} from "../../../rtk/features/User/userSignUpSlice"

const UserSignUp = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const customId = "custom-id-yes";
  const [userSignUp,setUserSignUp] = useState({
    username: "",
    email: "",
    password: ""
})

const handleChange = (e) =>{
    const {name,value}= e.target;
    setUserSignUp({
        ...userSignUp,
        [name]:value
    })
    
}

const requiredfields = ["username","email","password"]

const handleSubmit = async(e) =>{
    e.preventDefault();

    try {
      const hasEmptyFields = requiredfields.some((fields)=> !userSignUp[fields])

      if (hasEmptyFields) {
          toast.error("Please fill all the Required Fields",{toastId:customId});
          return;
      }
      const actionResult = await dispatch(userSignUpData(userSignUp));
      console.log("actionResult",actionResult);
      if (actionResult?.payload?.data?.success === true) {
        toast.success(actionResult?.payload?.data?.message,{toastId:customId});
        Navigate("/login")
      }
    } catch (error) {
      console.log(error);
      console.error("An error occurred3:", error?.response?.data);
      const customId = "custom-id-yes";
      toast.error(error?.response?.data?.message, {
        toastId: customId,
      });
    }
   



}

console.log("userSignUp",userSignUp);


  return (
    <div>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                   
                    <form className='card' onSubmit={handleSubmit}>
                    <div className="mb-3">
    <label htmlFor="exampleInputUserName1" className="form-label">Username</label>
    <input type="text" className="form-control" id="exampleInputUserName1"
     name="username" value={userSignUp.username}
    onChange={handleChange}  />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
     name="email" value={userSignUp.email}
     onChange={handleChange}  />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"  name="password" value={userSignUp.password}
    onChange={handleChange}  />
  </div>
  <div className="mb-3 form-check">
  <button type="submit" className="btn btn-primary">Sign Up</button>
  </div>

  <div class="mb-3 form-check">
    <label class="form-check-label" htmlFor="exampleCheck1">Already a user ? <Link to="login">Login</Link></label>
  </div>

</form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserSignUp