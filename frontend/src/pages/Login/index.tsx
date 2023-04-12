/** @format */

import {useFormik} from "formik";

import {FormikErrors} from "formik";
interface MyFormValues {
  email: string;
  password: string;
}
const validate = (values: MyFormValues) => {
  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const errors: FormikErrors<{[field: string]: any}> = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i.test(values.password)) {
    errors.password = "Must be 20 characters or less";
  }

  return errors;
};
const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values: MyFormValues) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className='login-form'>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor='email'>Email: </label>
        <br />
        <input
          type='email'
          name='email'
          id='email'
          placeholder='your email@gmail.com'
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <br />
        <label htmlFor='password'>Password: </label>
        <br />
        <input
          type='password'
          name='password'
          id='password'
          placeholder='enter your password'
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <br />
        <button type='submit'>Login</button>
        <p>
          If you have not an account? <a href='maka'> Sign in</a>
        </p>
      </form>
    </div>
  );
};
export default Login;
