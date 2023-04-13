/** @format */
import * as Yup from "yup";
import {Form, Field, Formik} from "formik";
import {useAuthContext} from "../../context/useAuthContext";


const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .required(),
  email: Yup.string().email("Invalid email").required("Required"),
});

const Login = () => {
  const {login} = useAuthContext();

  return (
    <div className='login-form'>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          login(values.email, values.password);
          
        }}>
        {({errors, touched}) => (
          <Form>
            <label htmlFor='email'>Email: </label>
            <br />
            <Field type='email' name='email' id='email' placeholder='your email@gmail.com' />
            <br />
            {errors.email && touched.email ? <div className='error'>{errors.email}</div> : null}
            <label htmlFor='password'>Password: </label>
            <br />
            <Field
              type='password'
              name='password'
              id='password'
              placeholder='enter your password'
            />
            <br />
            {errors.password && touched.password ? (
              <div className='error'>{errors.password}</div>
            ) : null}
            <button type='submit'>login</button>
            <p>
              Have not an account? <a href='maka'> Sign in</a>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
