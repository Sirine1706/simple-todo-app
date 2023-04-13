/** @format */
import * as Yup from "yup";
import {Form, Field, Formik} from "formik";
import {useAuthContext} from "../../context/useAuthContext";

const SignSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters at minimum")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .max(20, "Password must be 20 characters as maximum")
    .required(),
  passwordConfirm: Yup.string()
    .label("confirm password")
    .required()
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const Sign = () => {
  const {register} = useAuthContext();
  return (
    <div className='login-form'>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        validationSchema={SignSchema}
        onSubmit={(values) => {
          console.log(values);
          register(values.name, values.email,values.password, values.passwordConfirm)
        }}>
        {({errors, touched}) => (
          <Form style={{height: "45vh"}}>
            <label htmlFor='name'>FullName: </label>
            <br />
            <Field type='text' name='name' id='name' placeholder='your name' />
            {errors.name && touched.name ? <div className='error'>{errors.name}</div> : null}
            <br />
            <label htmlFor='email'>Email: </label>
            <br />
            <Field type='email' name='email' id='email' placeholder='your email@gmail.com' />
            {errors.email && touched.email ? <div className='error'>{errors.email}</div> : null}
            <br />
            <label htmlFor='password'>Password:</label>
            <br />
            <Field
              type='password'
              name='password'
              id='password'
              placeholder='enter your password'
              autoComplete='new-password'
            />
            {errors.password && touched.password ? (
              <div className='error'>{errors.password}</div>
            ) : null}
            <br />
            <label htmlFor='passwordConfirm'>Password Confirm:</label>
            <br />
            <Field
              type='password'
              name='passwordConfirm'
              id='passwordConfirm'
              placeholder='confirm your password'
              autoComplete='new-password'
            />
            {errors.passwordConfirm && touched.passwordConfirm ? (
              <div className='error'>{errors.passwordConfirm}</div>
            ) : null}
            <br />
            <button type='submit'>Sign in</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Sign;
