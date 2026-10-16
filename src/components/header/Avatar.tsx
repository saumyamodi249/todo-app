import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar as AntAvatar } from "antd";

const Avatar: React.FC = () => {
  return (
    <AntAvatar
      size={36}
      icon={<UserOutlined className="text-white" />}
      className="!bg-black cursor-pointer hover:opacity-80 transition-opacity"
    />
  );
};

export default Avatar;