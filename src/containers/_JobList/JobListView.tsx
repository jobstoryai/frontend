import React, { useMemo, useRef } from "react";
import type { ColumnsType } from "antd/es/table";
import {
  CloudUploadOutlined,
  LinkOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import format from "date-fns/format";
import { Tag } from "components/Tag";
import { Button, Col, Row, Space, Table, Typography } from "antd";
import { Job } from "repositories/JobRepository";
import { Paginated } from "types";
import { observer } from "mobx-react-lite";
import Search from "antd/lib/input/Search";

const { Title } = Typography;

interface Props {
  isLoading: boolean;
  dataPage: Paginated<Job>;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onDelete: (id: number) => void;
  onSearch: (q: string) => void;
  onSetOrdering: (o: string | null) => void;
  onSetFiltering: (f: Record<string, string>) => void;
}

export const JobListView = observer(
  ({
    isLoading,
    dataPage,
    onPageChange,
    onPageSizeChange,
    onDelete,
    onSearch,
    onSetFiltering,
    onSetOrdering,
  }: Props) => {
    const columns = useMemo<ColumnsType<Job>>(
      () => [
        {
          title: "id",
          dataIndex: "id",
          key: "id",
          render: (id: number) => (
            <Link prefetch={false} href={`/admin/jobs/${id}`}>
              {id}
            </Link>
          ),
          sorter: true,
        },
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
        },
        {
          title: "Company",
          dataIndex: "company",
          key: "company",
          width: 150,
        },
        {
          title: "Content",
          dataIndex: "content",
          key: "content",
          render: (_, { content }) => (
            <Typography.Paragraph ellipsis={{ rows: 5 }}>
              {content}
            </Typography.Paragraph>
          ),
        },
        {
          title: "URL",
          dataIndex: "url",
          key: "url",
          width: 60,
          render: (_, { url }) => (
            <Link href={url}>
              <LinkOutlined />
            </Link>
          ),
        },
        {
          title: "Skills",
          dataIndex: "skills",
          key: "skills",
          width: 150,
          render: (_, { required_skills, good_to_have_skills }) => {
            return [
              ...required_skills.map((node) => (
                <Link href={`/admin/nodes/${node.id}`} key={node.id}>
                  <Tag
                    item={{
                      color: "#E9B",
                      name: node.title,
                    }}
                  />
                </Link>
              )),
              ...good_to_have_skills.map((node) => (
                <Link href={`/admin/nodes/${node.id}`} key={node.id}>
                  <Tag
                    item={{
                      color: "#9BE",
                      name: node.title,
                    }}
                  />
                </Link>
              )),
            ];
          },
        },
        {
          title: "Salary From",
          dataIndex: "salary_from",
          key: "salary_from",
          width: 120,
        },
        {
          title: "Salary To",
          dataIndex: "salary_to",
          key: "salary_to",
          width: 120,
        },
        {
          title: "Currency",
          dataIndex: "currency",
          key: "currency",
        },
        {
          title: "Created At",
          dataIndex: "created_at",
          key: "created_at",
          width: 120,
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
          title: "Action",
          key: "action",
          render: (_, record) => (
            <Space size="middle">
              <Button danger type="text" onClick={() => onDelete(record.id)}>
                Delete
              </Button>
            </Space>
          ),
        },
      ],
      []
    );
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
    };

    return (
      <>
        <Row>
          <Col span={16}>
            <Title level={4}>Jobs</Title>
          </Col>
          <Col span={8}>
            <Row justify="end">
              <Space>
                <Search
                  onSearch={(q) => onSearch(q)}
                  placeholder="Search Jobs"
                  allowClear
                />
                <Link href="/admin/jobs/import">
                  <Button icon={<CloudUploadOutlined />} type="default">
                    Import CSV
                  </Button>
                </Link>
                <Link href="/admin/jobs/create">
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
              rowKey="id"
              dataSource={dataPage.items}
              onChange={onChange}
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
