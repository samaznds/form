import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
export const SubmitForm = () => {
  const schema = yup.object().shape({
    name: yup.string().required("this field is mandatory"),
    email: yup.string().email("this field is invalid").required("this field is required"),
    age: yup.number().positive().min(18).max(69).required("this field is required" ),
    password: yup
      .string()
      .min(2)
      .max(5)
      .matches(/[a-z]+/)
      .matches(/[A-Z]+/)
      .matches(/\d*/),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")])
      .required(),
  });
  const OnFormSubmit = (data) => {
    console.log("there is submit");
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  return (
    <React.Fragment>
      <header>
        <h className="nav">submit Form</h>
      </header>
<section className="container">
      <form className="my-form" onSubmit={handleSubmit(OnFormSubmit)}>
        <input type="text" placeholder="name" {...register("name")} />
        {errors.name && <p>{errors.name?.message}</p>}
        <input type="text" placeholder="email" {...register("email")} />
        {errors.email && <p>{errors.email?.message}</p>}
        <input type="number" placeholder="age" {...register("age")} />
        {errors.age && <p>{errors.age?.message}</p>}
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        {errors.password && <p>{errors.password?.message}</p>}
        <input
          type="password"
          placeholder="confirm password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword?.message}</p>}
        <input type="submit" />
      </form>
      </section>
    </React.Fragment>
  );
};
