import React from "react";
import { Link } from "remix";

export default function Login() {
  return (
    <Link to="/login">
      <p>
        <strong>Login</strong>
      </p>
    </Link>
  );
}
