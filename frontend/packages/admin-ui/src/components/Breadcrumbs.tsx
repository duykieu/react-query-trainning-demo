import React from "react";
import { Breadcrumb } from "antd";
import { ChevronRight } from "react-feather";
import styled from "styled-components";

interface IBreadcrumbItem {
    label: string;
    path?: string;
}

interface IBreadcrumbsProps {
    items: IBreadcrumbItem[];
}

const Breadcrumbs: React.FunctionComponent<IBreadcrumbsProps> = ({ items }) => {
    return (
        <Breadcrumb
            separator={<ChevronRight size={14} style={{ marginBottom: "-3px" }} />}
        >
            <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
            {items.map((item, index) => (
                <Breadcrumb.Item key={index} href={item.path}>
                    {item.label}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
