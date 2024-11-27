import React, { useEffect } from "react";
import { Select, Button, Col, Form, Input, Row, Space, Card, AutoComplete, Spin } from "antd";
import { CloseOutlined, LinkOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { Node } from "repositories/NodeRepository";
import TextArea from "antd/lib/input/TextArea";
import { NODE_RELATIONS, NODE_TYPES } from "config";
import { DebounceSelect } from "components/DebounceSelect";
import { mapDictToSelectOptions } from "lib/mapDictToSelectOptions";
import { FormInstance } from "antd/lib";
import Link from "next/link";
import slugify from "slugify";


interface Props {
  item: Node | null;
  onCreate: (data: NodeFormFieldValues, form: FormInstance) => void;
  onUpdate: (id: number, data: NodeFormFieldValues, form: FormInstance) => void;
  onSearch: (s: string) => Promise<{ label: string, value: string }[]>;
  onNodeTagSearch: (s: string) => Promise<{ label: string, value: string }[]>;
  onGetSimilarNodes: (s: string) => Promise<void> | undefined;
  similarNodes: Node[];
  isModifying: boolean;
}

interface NodeFormFieldValues {
  title: string;
  content: string;
  slug: string;
  node_type: any;
  relations: any;
  proficiency_levels: any;
}

export const NodeFormView = observer(
  ({ item, onCreate, onUpdate, isModifying, onSearch, onNodeTagSearch, onGetSimilarNodes, similarNodes}: Props) => {
    const [form] = Form.useForm();
    const title = Form.useWatch('title', form);

    useEffect(() => {
      onGetSimilarNodes(title)
      title
        ? form.setFieldValue('slug', slugify(title, { lower: true }))
        : form.setFieldValue('slug', '')
    }, [title])

    return (
      <Row>
        <Col span={24}>
          <Card
            size="small"
            title="Node"
          >
            <Form
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={(values) => {
                const payload = Object.assign({}, values, {
                  tags: values.tags.map((i: string) => Number(i)),
                  relations: values.relations
                    .filter((rel: any) => rel.relation_type !== undefined)
                    .map((rel: any) => ({
                      relation_type: rel.relation_type,
                      node: rel.node.id
                    }))
                })

                item?.id
                  ? onUpdate(item.id, payload, form)
                  : onCreate(payload, form);
              }}
              initialValues={
                item !== null
                  ? {
                      ...item,
                      tags: item.tags.map((i: any) => i.id),
                    }
                  : {
                      title: "",
                      content: "",
                      relations: [],
                      proficiency_levels: [],

                    }
              }
            >
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input a title",
                  },
                ]}
                extra={similarNodes.length
                  ? <>
                    <span>
                      Similar Nodes: {similarNodes.map((node, i) => [
                        i > 0 && ", ",
                        <Link key={node.id} href={`/admin/nodes/${node.id}`}>{node.title}</Link>
                      ])}
                    </span>
                    <span>.</span>
                    </>
                    : null}
              >
                <Input placeholder="Cobol" />
              </Form.Item>
              <Form.Item
                label="Slug"
                name="slug"
                rules={[
                  {
                    required: true,
                    message: "Please input a slug",
                  },
                ]}
              >
                <Input placeholder="url-friendly-skill-id" />
              </Form.Item>
              <Form.Item
                label="Content"
                name="content"
              >
                <TextArea placeholder="Content..." />
              </Form.Item>

              <Form.Item label="Type" name={['node_type']}>
                <Select
                  placeholder="Select Node Type"
                  style={{ width: 240 }}
                  options={mapDictToSelectOptions(NODE_TYPES)}
                />
              </Form.Item>

              <Form.Item label="Tags" name="tags">
                <DebounceSelect 
                  placeholder="Select Tags"
                  color="#E9B"
                  mode="multiple"
                  showSearch
                  initialOptions={item?.tags?.map((tag) => {
                    return ({
                      label: tag.title,
                      value: tag.id,
                    })})}
                  fetchOptions={onNodeTagSearch}
                />
              </Form.Item>

              <Form.Item label="Relations">
                <Form.List
                  name={['relations']}
                >
                  {(fields, opt) => (
                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                      {fields.map((field) => {
                        return (
                        <Space.Compact key={field.key}>
                          <Form.Item noStyle name={[field.name, 'relation_type']}>
                            <Select
                              placeholder="Select Relation Type"
                              style={{ width: 240 }}
                              options={mapDictToSelectOptions(NODE_RELATIONS)}
                            />
                          </Form.Item>
                          <Form.Item noStyle name={[field.name, 'node', 'id']}>
                            <DebounceSelect 
                              placeholder="Select Nodes"
                              showSearch
                              initialOptions={item?.relations.map((rel) => ({
                                label: rel.node.title,
                                value: rel.node.id,
                              }))}
                              fetchOptions={onSearch}
                            />
                          </Form.Item>
                          {item?.relations[field.key]?.node && (
                              <Link href={`/admin/nodes/${item?.relations[field.key].node}`}>
                                <LinkOutlined style={{ margin: "9px 4px 0px 18px"}}/>
                              </Link>
                            )
                          }
                          <CloseOutlined style={{ margin: "0 4px 0 12px" }}
                            onClick={() => {
                              opt.remove(field.name);
                            }}
                          />
                        </Space.Compact>
                      )}
                      )}
                      <Button type="dashed" onClick={() => opt.add()} block>
                        + Add Relation
                      </Button>
                    </div>
                  )}
                </Form.List>
              </Form.Item>

              <Form.Item label="Levels">
                <Form.List
                  name={['proficiency_levels']}
                >
                  {(fields, opt) => (
                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                      {fields.map((field) => {
                        return (
                        <Space.Compact key={field.key}>
                          <Form.Item noStyle name={[field.name, 'value']}>
                            <Input addonBefore="From" min={1} max={100} placeholder="1 - 100" />
                          </Form.Item>
                          <Form.Item noStyle name={[field.name, 'title']}>
                            <Input placeholder="Senior" />
                          </Form.Item>
                          <CloseOutlined style={{ margin: "0 4px 0 12px" }}
                            onClick={() => {
                              opt.remove(field.name);
                            }}
                          />
                        </Space.Compact>
                      )}
                      )}
                      <Button type="dashed" onClick={() => opt.add()} block>
                        + Add Level
                      </Button>
                    </div>
                  )}
                </Form.List>
              </Form.Item>

              
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space wrap>
                  <Button type="primary" htmlType="submit" loading={isModifying}>
                    {item?.id ? "Save" : "Create"}
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    )
});
