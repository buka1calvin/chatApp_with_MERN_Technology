import { Api } from "./auth";
export const addMessage = async (sender, receiver, message) => {
    try {
      const response = await fetch(`${Api}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender, receiver, message }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add message');
      }
  
      const data = await response.json();
      console.log("======++++++",data); // Handle the response data here
      return data
    } catch (error) {
      console.error(error.message);
    }
  };

  export const getMessages = async (sender, receiver) => {
    try {
      const response = await fetch(`${Api}/messages/AllMessages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender, receiver }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to get messages');
      }
  
      const data = await response.json();
      console.log("++++++", data.messages); // Handle the response data here
      return data;
    } catch (error) {
      console.error(error.message);
    }
  };
  