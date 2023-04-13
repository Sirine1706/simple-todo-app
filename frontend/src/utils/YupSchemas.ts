import * as Yup from "yup";
export const AddTaskSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().max(100),
});