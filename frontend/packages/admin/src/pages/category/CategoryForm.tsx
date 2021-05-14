import React from "react";
import styled from "styled-components";
import { FormButtons, PageTitle } from "@dontloop/admin-ui";
import { useHistory, useParams } from "react-router-dom";
import * as Validator from "yup";
import { useFormik } from "formik";
import { FormikInputFormGroup, MainContent } from "../../components";
import { ICategory } from "../../data/models/category";
import FormikEditorFormGroup from "../../components/FormikEditorFormGroup";
import { useCategoryMutation } from "../../data/mutations/category.mutation";
import { CATEGORY_INDEX_ROUTE } from "../../config";
import { useSingleCategoryQuery } from "../../data/queries/category.query";
import { message } from "antd";
import { confirmDelete } from "@dontloop/utils";

const validationSchema = Validator.object().shape({
  name: Validator.string().required(),
});

export const CategoryForm = () => {
  const { id } = useParams<{ id: string }>();

  const history = useHistory();

  const isCreate = id === "create";

  const { data } = useSingleCategoryQuery(id, !isCreate);

  const { create, update, destroy, isLoading } = useCategoryMutation();

  const fm = useFormik<ICategory>({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit(values) {
      if (isCreate)
        return create.mutate(
          { payload: values },
          {
            onSuccess(data) {
              fm.resetForm();
              message.success("Create category success");
              history.push(CATEGORY_INDEX_ROUTE + data.id);
            },
          }
        );
      update.mutate(
        { id, payload: values },
        {
          onSuccess() {
            message.success("Update category success");
          },
        }
      );
    },
  });

  React.useEffect(() => {
    if (data) fm.setValues(data as ICategory);
  }, [data]);

  function handleDelete() {
    confirmDelete(() => {
      destroy.mutate(
        //@ts-ignore
        { id },
        {
          onSuccess() {
            message.success("Delete Success");
            history.push(CATEGORY_INDEX_ROUTE);
          },
        }
      );
    });
  }

  return (
    <MainContent>
      <PageTitle title={isCreate ? "Create Category" : "Edit Category"} />

      <FormikInputFormGroup fm={fm} name="name" label="Name" />

      <FormikEditorFormGroup
        renderKey={id}
        fm={fm}
        name="description"
        label="Description"
        onNewBodyChanged={(v) => fm.setFieldValue("description", v)}
      />

      <FormButtons
        loading={isLoading}
        onDelete={handleDelete}
        onSave={fm.handleSubmit}
        onCancel={() => history.push(CATEGORY_INDEX_ROUTE)}
      />
    </MainContent>
  );
};

export default CategoryForm;
