import React, { useRef } from "react";
import { Button, Col, Row, Space, Table, Typography } from "antd";
import Search from "antd/lib/input/Search";
import type { ColumnsType } from "antd/es/table";
import format from "date-fns/format";
import { observer } from "mobx-react-lite";
import { Paginated } from "types";
import { NodeTag } from "repositories/NodeTagsRepository";
import { PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Title } = Typography;

interface Props {
  isLoading: boolean;
  dataPage: Paginated<NodeTag>;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSearch: (q: string) => void;
  onSetOrdering: (o: string | null) => void;
  onSetFiltering: (f: Record<string, string>) => void;
}

const columns: ColumnsType<NodeTag> = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    sorter: true,
    width: 60,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text, { id }) => (
      <Link prefetch={false} href={`/admin/tags/${id}`}>
        {text}
      </Link>
    ),
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    width: 150,
    render: (date) => format(date, "yyyy-MM-dd"),
    sorter: true,
  },
  {
    title: "Updated At",
    dataIndex: "updated_at",
    key: "updated_at",
    width: 150,
    render: (date) => format(date, "yyyy-MM-dd"),
    sorter: true,
  },
  {
    title: "Created By",
    dataIndex: "created_by",
    key: "created_by",
    width: 150,
    render: (created_by) => created_by.username,
  },
]

export const NodeTagsView = observer(
  ({
    isLoading,
    dataPage,
    onPageChange,
    onPageSizeChange,
    onSearch,
    onSetOrdering,
    onSetFiltering,
  }: Props) => {
    const isFiltering = useRef(false);
    const onChange = (
      pagination: any,
      filters: any,
      sorter: any,
      extra: any
    ) => {
      if ("sort" === extra.action) {
        // NOTE: antd bug
        isFiltering.current = true;
        setTimeout(() => (isFiltering.current = false), 500);

        sorter.order
          ? onSetOrdering(
              `${sorter.order === "descend" ? "-" : ""}${sorter.field}`
            )
          : onSetOrdering(null);
        return;
      }

      if ("filter" === extra.action) {
        // NOTE: antd bug
        isFiltering.current = true;
        setTimeout(() => (isFiltering.current = false), 500);

        const f = Object.keys(filters).reduce<Record<string, string>>(
          (acc, key) => {
            acc[key] = filters[key]?.[0];
            return acc;
          },
          {}
        );

        onSetFiltering(f);
        return;
      }
    };

    return (
      <>
        <Row>
          <Col span={16}>
            <Title level={4}>Tags</Title>
          </Col>
          <Col span={8}>
            <Row justify="end">
              <Space>
                <Search
                  onSearch={(q) => onSearch(q)}
                  placeholder="Search Jobs"
                  allowClear
                />
                <Link href="/admin/tags/create">
                  <Button icon={<PlusCircleOutlined />} type="primary">
                    Create
                  </Button>
                </Link>
              </Space>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              onChange={onChange}
              rowKey="title"
              dataSource={dataPage.items}
              columns={columns}
              pagination={{
                onChange: (page) => {
                  // NOTE: antd bug. Pagination onChange called on filtering
                  setTimeout(() => {
                    if (!isFiltering.current) {
                      onPageChange(page);
                    }
                  }, 100);
                },
                pageSize: dataPage.size,
                current: dataPage.page,
                total: dataPage.count,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`,
                onShowSizeChange: (_, size) => onPageSizeChange(size),
              }}
              loading={isLoading}
            />
          </Col>
        </Row>
      </>
    );
  }
);
