/** @format */
import {Form, Field, Formik} from "formik";
import { AddTaskSchema } from "../../utils/YupSchemas";

export const AddTask = () => {
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
      }}
      validationSchema={AddTaskSchema}
      onSubmit={(values) => {
        console.log(values);
      }}>
      <Form className='add-task'>
        <div className='todo'>
          <p>Add New Task</p>
          <Field type='text' name='task-title' id='task-title' placeholder='task title' />
          <br />
          <Field
            name='task-description'
            id='task-description'
            component='textarea'
            placeholder='task description'
            rows='4'
            cols={42}></Field>
          <br />
        </div>
        <button type='submit'>add</button>
      </Form>
    </Formik>
  );
};
