import React from "react";

import { Form, useActionData, useSearchParams, useTransition } from "remix";

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const actionData = useActionData();
  const transition = useTransition();

  const userNameErrorExists =
    actionData && actionData.errors && actionData.errors.username;
  const passwordErrorExists =
    actionData && actionData.errors && actionData.errors.password;
  const valuesExist = actionData && actionData.values;

  return (
    <div className="h-screen flex">
      <Form
        className="m-auto bg-white rounded-2xl shadow-md shadow-sky-700/50"
        method="post"
      >
        <div className="flex flex-col mx-20 my-10 gap-2">
          <input
            type="hidden"
            name="redirectTo"
            value={searchParams.get("redirectTo") ?? undefined}
          />
          <label
            className="after:content-['*'] after:ml-0.5 after:text-red-500"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className={`border border-solid border-black rounded-lg px-2 ${
              userNameErrorExists && "border-red-500"
            }`}
            disabled={transition.state === "submitting"}
            name="username"
            id="username"
            type="text"
            defaultValue={valuesExist ? actionData.values.username : undefined}
          />
          {userNameErrorExists ? (
            <p style={{ color: "red" }}>{actionData.errors.username}</p>
          ) : null}

          <label
            className="after:content-['*'] after:ml-0.5 after:text-red-500"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`border border-solid border-black focus:border-green-500 rounded-lg px-2 ${
              passwordErrorExists && "border-red-500"
            }`}
            disabled={transition.state === "submitting"}
            name="password"
            id="password"
            type="text"
            defaultValue={valuesExist ? actionData.values.password : undefined}
          />
          {passwordErrorExists ? (
            <p style={{ color: "red" }}>{actionData.errors.password}</p>
          ) : null}

          <button
            className="bg-[#ECFDFF] shadow-thought rounded-full mt-6"
            disabled={transition.state === "submitting"}
            type="submit"
          >
            {transition.state === "submitting" ? "Logging In..." : "Login"}
          </button>
        </div>
      </Form>
    </div>
  );
}
