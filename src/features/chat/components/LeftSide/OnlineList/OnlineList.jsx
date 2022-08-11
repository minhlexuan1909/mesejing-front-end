import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React from "react";
import LeftNavItem from "../../../../../components/LeftNavItem/LeftNavItem";
import MainWrapper from "../MainWrapper/MainWrapper";

const OnlineList = () => {
  const number = 123;
  const friend = [1, 2, 3];
  return (
    <div>
      <MainWrapper>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          <SubMenu key="sub1" title={`Online (${number})`}>
            {friend.map((friend, index) => (
              <LeftNavItem
                key={index}
                title="Anna"
                img="avatar.jpg"
                type="friend"
              />
            ))}
          </SubMenu>
        </Menu>
      </MainWrapper>
    </div>
  );
};

export default OnlineList;
