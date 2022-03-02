import React from "react";

import * as yup from "yup";
import { ActionFunction, LoaderFunction, redirect } from "remix";
import LoginPage from "~/components/LoginPage/LoginPage";

import { createUserSession, getUser, loginUser } from "~/utils/session.server";

const loginSchema = yup.object({
  username: yup.string().required("username required"),
  password: yup.string().required("password required"),
  redirectTo: yup.string().optional(),
});

const getValidationErrors = (err: any) => {
  const validationErrors = {} as any;
  err.inner.forEach((error: any) => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    }
  });
  return validationErrors;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const values = form.values();

  const formObject: { [key: string]: any } = {};
  form.forEach((value, key) => {
    formObject[key] = value;
  });

  try {
    await loginSchema.validate(formObject, { abortEarly: false });
  } catch (e) {
    const errors = getValidationErrors(e);
    return { errors, values };
  }

  const username = form.get("username") as string;
  const password = form.get("password") as string;
  const redirectTo = (form.get("redirectTo") as string) ?? "/";
  const user = await loginUser(username, password);
  if (user && user.errors) {
    const { errors } = user;
    return { errors, values };
  }

  return createUserSession(user.id, redirectTo);
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (user) {
    return redirect("/");
  }
  return null;
};

export default function LoginController() {
  return <LoginPage />;
}
