/** @format */

import {Form, Field, Formik} from "formik";
import {AddTaskSchema} from "../../utils/YupSchemas";

export const Task = () => {
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
      <Form className='task-container'>
        <Field type='text' name='title' id='title' placeholder='title' disabled />
        <div className='task'>
          <Field type='text' name='added-task' id='added-task' value={"task"} disabled />
          <div className='buttons'>
            <button className='done'>done</button>
            <button className='edit'>edit</button>
            <button className='trash'>trash</button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
