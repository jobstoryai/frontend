import React from "react";
import { Button, Form, Input } from "antd";
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
  ({ isUpdating, user, onSubmit }: Props) => {
    return (
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{
          first_name: user.first_name,
          last_name: user.last_name,
          about: user.about,
        }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item name="first_name" label="First Name">
          <Input />
        </Form.Item>
        <Form.Item name="last_name" label="Last Name">
          <Input />
        </Form.Item>
        <Form.Item name="about" label="About">
          <AboutInput />
        </Form.Item>

        <Form.Item label={null}>
          <Button loading={isUpdating} type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  },
);
