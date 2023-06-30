import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef } from "react";
import { signIn, getSession, getProviders } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const Login = () => {
  const router = useRouter();

 /*  useEffect(() => {
    (async () => {
      const session = await getSession();
      console.log(session);
      if (session) {
        router.push("/");
      }
    })();
  }, []);
 */
  const onFinish = async (values) => {
    //  console.log(values)
   await signIn("credentials", {
      redirect: true,
      email: values.username,
      password: values.password,
      
    });
  };

  return (
    <div className="flex justify-center items-center flex-col space-y-20 p-5">
      <div className="border border-2 p-5 shadow-2xl w-full lg:w-[30%]">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item className="flex">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="text-secondary login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="bg-secondary login-form-button mr-5"
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

/* export async function getServerSideProps(context) {
  const { query, req, res } = context;
  var error = "";
  if (Boolean(query.error)) {
    error = query.error;
  }

  try {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req, secret });

    return { props: { providers: await getProviders(), loginError: error } };
  } catch (e) {
    return { props: { providers: await getProviders(), loginError: error } };
  }
}
 */