import React from "react";
import { observer } from "mobx-react-lite";
import {
  Form,
  Button,
  Space,
  Select,
  InputNumber,
  Typography,
  Radio,
  Row,
  Col,
  List,
} from "antd";
import { SearchResultCard } from "components/SearchResultCard";
import { Paginated } from "types";
import { Job } from "repositories/JobRepository";
import { DebounceSelect } from "components/DebounceSelect";

const { Text } = Typography;

interface Props {
  isLoading: boolean;
  onSearch: (values: SearchFormVieldValues) => Promise<void>;
  onSearchNodes: (query: string) => Promise<{ label: string; value: string }[]>;
  dataPage: Paginated<Job>;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

interface SearchFormVieldValues {
  salary_min?: number;
  salary_max?: number;
  salary_type: "M" | "A";
  skills: number[];
  onSearchNodes: (s: string) => Promise<{ label: string; value: string }[]>;
}

const SALARY_TYPE_OPTIONS = [
  { label: "Monthly", value: "M" },
  { label: "Annual", value: "A" },
];

const SUPPORTED_CURRENCIES = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "RUB", value: "RUB" },
];

export const SearchResultsPageView = observer(
  ({ onSearch, dataPage, isLoading, onSearchNodes, onPageChange, onPageSizeChange }: Props) => {
    const [form] = Form.useForm();

    return (
      <Row gutter={16}>
        <Col span={4}>
          <Form
            form={form}
            name="form_item_path"
            layout="vertical"
            onFinish={(values) => {
              onSearch({
                ...values,
                skills: values.skills.map(Number),
              });
            }}
            initialValues={{
              skills: [],
              currency: SUPPORTED_CURRENCIES[0].value,
              salary_type: "M",
              salary_min: "",
              salary_max: "",
            }}
          >
            <Text strong>Skills & Technologies</Text>
            <Form.Item name={["skills"]}>
              <DebounceSelect
                placeholder="Select Tags"
                color="#E9B"
                mode="multiple"
                showSearch
                initialOptions={[]}
                fetchOptions={onSearchNodes}
              />
            </Form.Item>
            <Space
              style={{
                marginBottom: 8,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Text strong>Salary Type</Text>
              <Form.Item noStyle name={["salary_type"]}>
                <Radio.Group
                  options={SALARY_TYPE_OPTIONS}
                  optionType="button"
                  buttonStyle="solid"
                />
              </Form.Item>
            </Space>

            <Text strong>Salary Min</Text>
            <Form.Item noStyle name={["salary_min"]}>
              <InputNumber style={{ width: "100%" }} placeholder={"1000"} />
            </Form.Item>

            <Text strong>Salary Max</Text>
            <Form.Item name={["salary_max"]}>
              <InputNumber style={{ width: "100%" }} placeholder={"2500"} />
            </Form.Item>

            <Text strong>Currency</Text>
            <Form.Item name={["currency"]}>
              <Select>
                {SUPPORTED_CURRENCIES.map(({ label, value }) => (
                  <Select.Option key={value} value={value}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={20}>
          <List
            loading={isLoading}
            pagination={{
              onChange: (page) => onPageChange(page),
              pageSize: dataPage.size,
              current: dataPage.page,
              total: dataPage.count,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              onShowSizeChange: (_, size) => onPageSizeChange(size),
            }}
            grid={{
              gutter: 24,
              xs: 1,
              sm: 1,
              md: 1,
              lg: 1,
              xl: 3,
              xxl: 4,
            }}
            dataSource={dataPage.items}
            renderItem={(item) => (
              <List.Item>
                <SearchResultCard {...item} />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    );
  },
);
