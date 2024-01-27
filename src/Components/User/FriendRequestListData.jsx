import { useState,useEffect } from "react"
import { useDispatch ,useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
import {getFriendRequestList} from "../../../rtk/features/FrinedRequest/getFriendRequestListSlice"
import {sendFriendRequest} from "../../../rtk/features/FrinedRequest/sendFriendRequestSlice"
import {declineFriendRequest} from "../../../rtk/features/FrinedRequest/declineFriendRequestSlice"


const FriendRequestListData = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const customId = "custom-id-yes";
    const [isLoading,setIsLoading] = useState(false)
    const [data,setFetchData] = useState([])
const [loading,setLoading] = useState(false)

  useEffect(() => {
   dispatch(getFriendRequestList())
  }, [])

  const getFriendRequestList2 = useSelector(
    (state) => state?.getFriendRequestList?.users?.data?.[0]?.friendRequestList
  );
  console.log("getFriendRequestList2", getFriendRequestList2);

  useEffect(() => {
    setFetchData(getFriendRequestList2 || [])
  }, [])
  


  const handleSubmit = async()=>{

try {
    
const userId = localStorage.getItem("userId")
console.log("userId");
const userIdData = {
    userId:userId
}
setIsLoading(true);
    const actionResult = await dispatch(sendFriendRequest(userIdData));
    if (actionResult?.payload?.success === true) {
        toast.success(actionResult?.payload?.message,{toastId:customId});
        dispatch(getFriendRequestList())
        setIsLoading(false);
        
      }
} catch (error) {
    console.log(error);
}

  }


  const RejectRequest = async(id)=>{
    try {
        setLoading(true);
        const actionResult = await dispatch(declineFriendRequest(id));
        if (actionResult?.payload?.success === true) {
            toast.success(actionResult?.payload?.message,{toastId:customId});
            dispatch(getFriendRequestList())
            setLoading(false);
            
          }

    } catch (error) {
        console.log(error);
        setLoading(false);
    }
  }


  return (
    <div>
        <div>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={isLoading}> {isLoading ? "Sending..." : "Send Friend Request"}</button>
        </div>
        <div>
        <h3>Friend Request List</h3>

        </div>
        <div className="container">
            <div className="row">
{
    
getFriendRequestList2?.map((item,index)=>{
    return(
        <>
        <div className="col-md-4">
                <div className="card" style={{width:"25rem"}} >
  <div className="card-body">
    <h5 className="card-title">Username : <strog>{item?.email}</strog> </h5>
    <h5 className="card-title">Email : <strong>{item?.username}</strong> </h5>
    <a href="#" className="btn btn-primary mt-4 m-2">Accept Request</a>
    <a href="#" className="btn btn-primary mt-4 m-2" onClick={()=>RejectRequest(item?._id)} disabled={loading}>{loading ? "Reject Request" : "Rejecting"}</a>

  </div>
</div>
                </div>
        </>
    )
})
}

                
            </div>
        </div>
    </div>
  )
}

export default FriendRequestListData