import { Button, Space } from "antd";
import img1 from "../images/image2.jpg";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <>
      <div className="m-auto flex  justify-between ">
        <div className="self-center text-start px-[9%]">
          <h1 className="text-[36px]">Share the World with your friends!</h1>
          <h3>Chat App let's you connect with the world</h3>
          <Space wrap>
            <Button type="primary" className="bg-[#28832d]  mt-4">
                <Link to='/chats'>
                Start Chat!!
                </Link>
            </Button>
          </Space>
        </div>
        <img src={img1} alt="" className="w-[50%] h-[90vh] " />
      </div>
    </>
  );
};
