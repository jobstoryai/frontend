import React, { useState } from "react";
import { Button, Card, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { observer } from "mobx-react-lite";

import { PublicUser } from "repositories/user_repository";
import { UserSettings } from "repositories/user_settings";

import { MayBeAsync } from "types";

import { AboutInput } from "./components/about_input";

interface Props {
  isUpdating: boolean;
  user: PublicUser;
  onSubmit: (payload: FormValues) => MayBeAsync<void>;
}

interface FormValues {
  about: string;
  first_name: string;
  last_name: string;
}

export const ProfileSettingsView = observer(
  ({ user, onSubmit, isUpdating }: Props) => {
    const [disabledSave, setDisabledSave] = useState(true);
    const [form] = useForm();

    const handleFormChange = () => {
      const hasErrors = form
        .getFieldsError()
        .some(({ errors }) => errors.length);
      setDisabledSave(hasErrors);
    };

    return (
      <Card
        title="Profile Settings"
        extra={[
          <Button
            key={"submit-button"}
            loading={isUpdating}
            disabled={disabledSave}
            type="primary"
            htmlType="submit"
            onClick={() => {
              form.submit();
              setDisabledSave(true);
            }}
          >
            Save
          </Button>,
        ]}
      >
        <Form
          onFieldsChange={handleFormChange}
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            about: user.about || "",
          }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item name="first_name" label="First Name">
            <Input placeholder="John" style={{ maxWidth: 250 }} />
          </Form.Item>
          <Form.Item name="last_name" label="Last Name">
            <Input placeholder="Doe" style={{ maxWidth: 250 }} />
          </Form.Item>
          <Form.Item name="about" label="About">
            <AboutInput />
          </Form.Item>
        </Form>
      </Card>
    );
  },
);
