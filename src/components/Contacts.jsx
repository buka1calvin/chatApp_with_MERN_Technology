import React, { useEffect, useState } from "react";

const Contacts = ({ contacts, currentUser , changeChat}) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.firstname);
    }
  }, [currentUser]);
  console.log("++++", contacts);
  const changeCurrentChat=(index,contact)=>{
    setCurrentSelected(index)
    changeChat(contact)
    
  }
  return (
    <div className="bg-gray-100 p-4 w-[30%]">
      {currentUserName && (
        <div>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold mb-4">Contacts</h2>
          <div className="flex flex-row-reverse gap-3">
          <img className="w-[40px] rounded-[50%]"src={currentUser.profilePic} alt="" />
          <h2>{currentUserName}</h2>
          </div>
        </div>
          {contacts.map((contact, index) => {
            return (
              <div
                className={`${
                  index === currentSelected ? "bg-sky-700" : ""
                } flex justify-between m-3 p-[12px] items-center border-[green] border-[1px] cursor-pointer hover:bg-sky-700`}
                key={index}
                onClick={()=>changeCurrentChat(index,contact)}
              >
                <div className="">
                  <img className="w-[40px] rounded-[50%]" src={contact.profilePic} alt="" />
                </div>
                <div className="text-center">
                  <h2> {contact.firstname}</h2>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Contacts;
