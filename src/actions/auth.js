export const Api='http://localhost:3000/api/v1'
export const login = async (email, password) => {
    try {
      const response = await fetch(`${Api}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
  
      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
  
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  };

export const getUserProfile = async () => {
  try {
    const response = await fetch(`${Api}/users/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to get user profile");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getAllUsers=async()=>{
    try{
    const response=await fetch(`${Api}/users`,{
        method:'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
    })
    if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to get All users");
      }
    }
    catch (error) {
      throw new Error(error.message);
    }
}


  