import React from "react";
import { Col, Row, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import format from "date-fns/format"
import { observer } from "mobx-react-lite";
import Link from "next/link";

import { PublicUser } from "repositories/UserRepository";

import { Paginated } from "types";


const { Title } = Typography;


interface Props {
  isLoading: boolean;
  dataPage: Paginated<PublicUser>;
  onPageChange: (page: number) => void;
}

const columns: ColumnsType<PublicUser> = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    render: (text, { id }) => <Link href={`/users/${id}`}>{text}</Link>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Date Joined",
    dataIndex: "date_joined",
    key: "date_joined",
    render: (date) => format(date, "yyyy-MM-dd"),
  },
];


export const UserListView = observer(({ isLoading, dataPage, onPageChange }: Props) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={4}>Users</Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            dataSource={dataPage.items} 
            columns={columns} 
            pagination={{ 
              onChange: onPageChange,
              pageSize: dataPage.size,
              current: dataPage.page,
              total: dataPage.count,
            }}
            loading={isLoading}
          />
        </Col>
      </Row>
    </>
  );
});
