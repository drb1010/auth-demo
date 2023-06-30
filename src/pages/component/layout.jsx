import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Layout,
  Menu,
  theme,
  Dropdown,
  message,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession, signOut } from "next-auth/react";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const profileItems = [
  {
    label: "Logout",
    key: "3",
  },
];

const items = [
  getItem("Dashboard", "/", <DashboardOutlined />),
  getItem("Blog", "/demo", <DashboardOutlined />)
];

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("1");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick = (e) => {
    console.log("click ", e);
    router.push(e.key);
  };

 /*  useEffect(() => {
    (async () => {
      const session = await getSession();
      console.log(session);
      if (session) {
        router.push("/");
      }
    })();
  }, []); */

  const onClickDropdown = async ({ key }) => {
    if (key == 3) {
      await signOut();
    //  router.push("/login");
    }
  };
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          style={{
            overflow: "auto",
            // height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
          breakpoint="lg"
          collapsedWidth="50px"
          onBreakpoint={(broken) => {
           
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            onClick={onClick}
            defaultOpenKeys={["sub1"]}
            selectedKeys={[current]}
            mode="inline"
            items={items}
          />
        </Sider>

        <Layout className={!collapsed ? "ml-[200px]" : "ml-[50px]"}>
          <Header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
            className="flex items-center justify-end"
          >
            <div className="flex mx-4 text-white space-x-5">
              <div>
                <Dropdown
                  menu={{
                    items: profileItems,
                    onClick: onClickDropdown,
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Avatar
                      style={{
                        backgroundColor: "#87d068",
                      }}
                      icon={<UserOutlined />}
                    />
                  </a>
                </Dropdown>
              </div>
              <div>
                <Badge count={1}>
                  <Avatar shape="square">N</Avatar>
                </Badge>
              </div>
            </div>
          </Header>
          <Content>{children}</Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            xyz
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardLayout;
