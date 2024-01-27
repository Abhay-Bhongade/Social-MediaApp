import { useState,useEffect } from "react"
import { useDispatch ,useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
import {getUserProfilesData} from "../../../rtk/features/User/getUserProfilesDataSlice"
import {updateUserProfileData} from "../../../rtk/features/User/updateUserProfileDataSlice"

const DisplayUserProfiles = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const customId = "custom-id-yes";
useEffect(() => {
 dispatch(getUserProfilesData())
}, [])

const [isLoading,setIsLoading] = useState(false)

const userProfileData = useSelector(
    (state) => state?.getUserProfilesData?.users?.data
  );
  console.log("userProfileData", userProfileData);

const [userProData,setUserProData] = useState([])

useEffect(() => {
    setUserProData(userProfileData || [])
    setUserSignIn({
        username: userProfileData?.username || ""  
    })
}, [userProfileData])

console.log("userProData",userProData);


const [userSignIn,setUserSignIn] = useState({
    
    username: userProfileData?.username || ""
})

const handleChange = (e) =>{
    const {name,value}= e.target;
    setUserSignIn({
        ...userSignIn,
        [name]:value
    })
    
}

const requiredfields = ["username"]

const handleSubmit = async(e) =>{
    e.preventDefault();

    try {
      const hasEmptyFields = requiredfields.some((fields)=> !userSignIn[fields])

      if (hasEmptyFields) {
          toast.error("Please fill all the Required Fields",{toastId:customId});
          return;
      }
      setIsLoading(true)
      const actionResult = await dispatch(updateUserProfileData(userSignIn));
      console.log("actionResult",actionResult);
      if (actionResult?.payload?.success === true) {
        toast.success(actionResult?.payload?.message,{toastId:customId});
        dispatch(getUserProfilesData())
        setIsLoading(false);
        //
      }
    } catch (error) {
      console.log(error);
    }
 


}

const ViewFriendRequest = ()=>{
    Navigate("/friend-requests")
}

console.log("userSignIn",userSignIn);

  return (
    <div>
       <button className="frbtn btn btn-primary" onClick={ViewFriendRequest}> View Friend Request List</button> 
        <div className="container">
            <div className="row">
                <div className="col-md-12">

                
        <h3>DisplayUserProfiles</h3>

        <div>
        <div className='card' >
                    

                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                       name="email" value={userProfileData?.email}
                      readOnly  />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">UserName</label>
                      <input type="text" className="form-control" id="exampleInputPassword1"  name="username" value={userSignIn.username}
                      onChange={handleChange}  />
                    </div>
                    <div className="mb-3 form-check">
                    <button type="submit" className="btn btn-primary" disabled={isLoading} onClick={handleSubmit}>{isLoading ? "Saving..." : "Save"}</button>
                    </div>
                  
                    
                  
                  </div >
        </div>
    </div>
    
    </div>
            </div>
        </div>
  )
}

export default DisplayUserProfiles