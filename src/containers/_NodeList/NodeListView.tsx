import React, { useMemo, useRef, useState } from "react";
import { Button, Col, Row, Space, Table, Typography } from "antd";
import Search from "antd/lib/input/Search";
import { PlusCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import format from "date-fns/format";
import { observer } from "mobx-react-lite";
import Link from "next/link";

import { Paginated } from "types";
import { Tag } from "components/Tag";
import { Node } from "repositories/NodeRepository";
import { NodeTag } from "repositories/NodeTagsRepository";


import s from "./index.module.css";

const { Title } = Typography;

interface Props {
  isLoading: boolean;
  dataPage: Paginated<Node>;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSearch: (q: string) => void;
  onSetOrdering: (o: string | null) => void;
  onSetFiltering: (f: Record<string, string>) => void;
  tags: NodeTag[];
}

const NODE_COLOR_CLASSES = {
  SKILL: s.row_skill,
  CONCEPT: s.row_concept,
  COMPETENCE: s.row_competence,
};
export const NodeListView = observer(
  ({
    isLoading,
    dataPage,
    onPageChange,
    onPageSizeChange,
    onSearch,
    onSetOrdering,
    onSetFiltering,
    tags,
  }: Props) => {
    const columns = useMemo<ColumnsType<Node>>(
      () => [
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
            <Link prefetch={false} href={`/admin/nodes/${id}`}>
              {text}
            </Link>
          ),
        },
        {
          title: "Content",
          dataIndex: "content",
          key: "content",
        },

        {
          title: "Tags",
          dataIndex: "tags",
          // TODO: Need to figure out why there is a hardcode to take 1st arg
          filterMultiple: false,
          filters: tags.map((tag) => ({
            text: tag.title,
            value: tag.id,
          })),
          key: "tags",
          width: 200,
          render: (_, { tags }) =>
            tags.map((tag) => (
              <Tag
                key={tag.id}
                item={{
                  color: "#E9B",
                  name: tag.title,
                }}
              />
            )),
        },
        {
          title: "Type",
          dataIndex: "node_type",
          key: "node_type",
          width: 100,
          filterMultiple: false,
          filters: [
            {
              text: "CONCEPT",
              value: "CONCEPT",
            },
            {
              text: "COMPETENCE",
              value: "COMPETENCE",
            },
            {
              text: "SKILL",
              value: "SKILL",
            },
          ],
        },
        {
          title: "Levels",
          dataIndex: "proficiency_levels",
          key: "proficiency_levels",
          width: 100,
          render: (levels: number) => {
            return Array.isArray(levels) ? levels.length : 0;
          },
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
      ],
      [tags],
    );

    const isFiltering = useRef(false);
    const onChange = (
      pagination: any,
      filters: any,
      sorter: any,
      extra: any,
    ) => {
      if ("sort" === extra.action) {
        // NOTE: antd bug
        isFiltering.current = true;
        setTimeout(() => (isFiltering.current = false), 500);

        sorter.order
          ? onSetOrdering(
              `${sorter.order === "descend" ? "-" : ""}${sorter.field}`,
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
          {},
        );

        onSetFiltering(f);
        return;
      }
    };

    return (
      <>
        <Row>
          <Col span={16}>
            <Title level={4}>Nodes</Title>
          </Col>
          <Col span={8}>
            <Row justify="end">
              <Space>
                <Search
                  onSearch={(q) => onSearch(q)}
                  placeholder="Search Jobs"
                  allowClear
                />
                <Link href="/admin/nodes/create">
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
              rowKey="id"
              rowClassName={(record, i) => NODE_COLOR_CLASSES[record.node_type]}
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
  },
);
