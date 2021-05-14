import React from "react";
import styled from "styled-components";
import { MainContent } from "../../components";
import { useCategoryQuery } from "../../data/queries/category.query";
import { ErrorAlert, PageTitle } from "@dontloop/admin-ui";
import ListItem from "../../components/ListItem";
import { CATEGORY_INDEX_ROUTE, CATEGORY_QUERY_KEY } from "../../config";
import { confirmDelete } from "@dontloop/utils";
import { message } from "antd";
import { useHistory } from "react-router-dom";
import { useCategoryMutation } from "../../data/mutations/category.mutation";
import { useQueryClient } from "react-query";

interface ICategoryIndexProps {}

export const CategoryIndex: React.FunctionComponent<ICategoryIndexProps> = () => {
  const { entries, isLoading, isFetching, error, refetch } = useCategoryQuery();

  const history = useHistory();

  const { destroy } = useCategoryMutation();

  const queryClient = useQueryClient();

  function handleDelete(id) {
    return function () {
      confirmDelete(() => {
        destroy.mutate(
          //@ts-ignore
          { id },
          {
            onSuccess() {
              message.success("Delete Success");
              queryClient.setQueryData(CATEGORY_QUERY_KEY, (data) =>
                //@ts-ignore
                data.filter((item) => item.id !== id)
              );
            },
          }
        );
      });
    };
  }

  return (
    <MainContent
      title={`${isLoading ? "LOADING..." : ""} ${
        isFetching ? "FETCHING..." : ""
      }`}
    >
      <PageTitle
        title="Category Index"
        createLink={CATEGORY_INDEX_ROUTE + "create"}
      />

      {!!error && <ErrorAlert messages={error} />}

      {entries.map((item) => (
        <ListItem
          label={item.name}
          key={item.id}
          onDelete={handleDelete(item.id)}
          editLink={CATEGORY_INDEX_ROUTE + item.id}
        />
      ))}
    </MainContent>
  );
};

export default CategoryIndex;
