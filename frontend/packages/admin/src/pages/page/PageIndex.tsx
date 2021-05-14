import React from "react";
import styled from "styled-components";
import { MainContent } from "../../components";
import { ErrorAlert, PageTitle } from "@dontloop/admin-ui";
import {
  DEFAULT_PAGE_SIZE,
  PAGE_INDEX_ROUTE,
  POST_INDEX_ROUTE,
} from "../../config";
import { usePostQuery } from "../../data/queries/post.query";
import ListItem from "../../components/ListItem";
import { Pagination } from "antd";
import { usePageQuery } from "../../data/queries/page.query";

const Wrapper = styled.div``;

interface IPageIndexProps {}

export const PageIndex: React.FunctionComponent<IPageIndexProps> = () => {
  const [filterData, setFilterData] = React.useState({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
  });

  const { data, isLoading, isFetching, error } = usePageQuery({
    limit: filterData.limit,
    offset: filterData.page * filterData.limit - filterData.limit,
  });

  function handleDelete() {}

  return (
    <MainContent
      title={`${isLoading ? "LOADING..." : ""} ${
        isFetching ? "FETCHING..." : ""
      }`}
    >
      <Wrapper>
        <PageTitle
          title="Page Management"
          createLink={PAGE_INDEX_ROUTE + "create"}
        />

        {!!error && <ErrorAlert messages={error} />}

        {!!data &&
          data.results.map((item) => (
            <ListItem
              label={item.name}
              key={item.id}
              onDelete={handleDelete}
              editLink={POST_INDEX_ROUTE + item.id}
            />
          ))}

        {!!data && (
          <div className="pagination-wrapper">
            <Pagination
              total={data.count}
              current={filterData.page}
              onChange={(v) => setFilterData((s) => ({ ...s, page: v }))}
            />
          </div>
        )}
      </Wrapper>
    </MainContent>
  );
};

export default PageIndex;
