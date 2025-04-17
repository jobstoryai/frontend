import React from "react";
import { TagFilled } from "@ant-design/icons";
import { Card, Collapse, Space, Tag, Typography } from "antd";
import { observer } from "mobx-react-lite";

import { CvVersion } from "repositories/cv_version_repsitory";
import { PublicUser } from "repositories/user_repository";

interface Props {
  isLoading: boolean;
  data: CvVersion;
  user: PublicUser | null;
}

const formatDuration = (durationMillis: number) => {
  const seconds = Math.floor((durationMillis / 1000) % 60);
  const minutes = Math.floor((durationMillis / (1000 * 60)) % 60);

  return `${minutes}m ${seconds}s`;
};

export const CvVersionPreviewView = observer(({ data, user }: Props) => {
  const match = data.raw_response?.response?.match(/<think>(.*)<\/think>/is);
  const think = match ? match[1] : null;

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          maxWidth: 800,
          width: "100%",
        }}
      >
        <Card>
          <Typography.Title level={3}>
            {user?.first_name} {user?.last_name}
          </Typography.Title>
          {data.raw_response?.model ? (
            <Collapse
              style={{ marginBottom: 8 }}
              items={[
                {
                  key: "debug",
                  label: "Debug Info",
                  children: (
                    <pre
                      style={{
                        width: "100%",
                        padding: 0,
                      }}
                    >{`MODEL: ${data.raw_response.model}
EVAL_DURATION: ${formatDuration(data.raw_response.eval_duration * 1000)}`}</pre>
                  ),
                },
                think
                  ? {
                      key: "think",
                      label: "Think",
                      children: (
                        <Typography.Paragraph>{think}</Typography.Paragraph>
                      ),
                    }
                  : null,
              ].filter((i) => i !== null)}
            />
          ) : null}
          <Typography.Paragraph>{data?.json.about}</Typography.Paragraph>
          <Typography.Paragraph>
            <Space style={{ marginBottom: 8 }} wrap>
              {data?.json.skills.map((skill: string) => (
                <Tag key={skill} color="pink">
                  <TagFilled /> {skill}
                </Tag>
              ))}
            </Space>
          </Typography.Paragraph>
          <div>
            {data?.json.jobs.map((exp: any) => (
              <div key={`${exp.company}-${exp.position}`}>
                <Typography.Title level={4} style={{ marginBottom: 0 }}>
                  <strong>{exp.position}</strong> at {exp.company}
                </Typography.Title>
                <Typography.Paragraph style={{ color: "#666" }}>
                  {exp.started}{" "}
                  {exp.finished ? ` - ${exp.finished}` : " - present"}
                </Typography.Paragraph>
                <Space direction="vertical" wrap size={1}>
                  {exp.description
                    ?.split("\n")
                    .map((paragraph: string, i: number) => (
                      <Typography.Paragraph key={i} style={{ margin: 0 }}>
                        {paragraph}
                      </Typography.Paragraph>
                    ))}
                </Space>
                <Typography.Paragraph>
                  {exp.achievements.length ? (
                    <>
                      <strong>Achievements</strong>:<br />
                      <ul>
                        {exp.achievements.map((achievement: string) => (
                          <li key={achievement}>{achievement}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </Typography.Paragraph>
                <Space style={{ marginBottom: 8 }} wrap>
                  {exp.skills?.map((skill: string) => (
                    <Tag key={skill} color="pink">
                      <TagFilled /> {skill}
                    </Tag>
                  ))}
                </Space>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
});
