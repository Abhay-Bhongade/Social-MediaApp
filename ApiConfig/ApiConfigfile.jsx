const Api = "https://socialmediaapi.ibrcloud.com/user/";
const token = localStorage.getItem("fcmtoken");


const getFcmTokenFromLocalStorage = () => {
    const token = localStorage.getItem("fcmtoken");
    console.log("Retrieved fcmtoken from localStorage:", token);
    return (
      token || ""
    );
  };

export   {Api,token}