import { useFormik } from "formik";
import Link from "next/link";
import React, { useEffect } from "react";
import style from "./style.module.scss";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "./QueryData";
import { Button, message } from "antd";
import Router from "next/router";
import Head from "next/head";
import { useAuth } from "../../components/AuthProvider";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Email là bắt buộc"),
  password: Yup.string()
    .min(8, "Vui lòng nhập ít nhất 8 kí tự")
    .required("Password là bắt buộc"),
});

const Login = () => {
  const [login, { loading, error }] = useMutation(LOGIN_USER);
  const auth = useAuth();

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      const { data } = await login({ variables: { email, password } });

      if (data && data.login?.token) {
        localStorage.setItem("token", data.login?.token);
        auth.setIsLogged(true);
        message.success("Đăng nhập thành công!");
        Router.push("/");
        return;
      }
      message.error("Đăng nhập thất bại!");
    },
  });

  if (error) {
    return null;
  }
  return (
    <div className="limiter">
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt="">
            <img src="./login.png" alt="IMG" />
          </div>
          <form
            className="login100-form validate-form"
            onSubmit={form.handleSubmit}
          >
            <span className={style.titleLogin}>Đăng nhập</span>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                name="email"
                placeholder="Email"
                onChange={form.handleChange}
                value={form.values.email}
              />
              {form.errors.email && form.touched.email ? (
                <div className={style.errorMessage}>{form.errors.email}</div>
              ) : null}
            </div>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="Mật khẩu"
                onChange={form.handleChange}
                value={form.values.password}
              />
              {form.errors.password && form.touched.password ? (
                <div className={style.errorMessage}>{form.errors.password}</div>
              ) : null}
            </div>
            <div className="container-login100-form-btn">
              <Button
                type="primary"
                className="login100-form-btn"
                loading={loading}
                htmlType="submit"
              >
                Đăng nhập
              </Button>
            </div>

            <div className="text-center p-t-136">
              <Link href={"/register"}>Tạo tài khoản mới</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
