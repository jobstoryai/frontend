import React from "react";
import { RedoOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Empty, Tabs, Tooltip, Typography } from "antd";
import { observer } from "mobx-react-lite";

import { CvPreview } from "components/cv_preview";
import { CvSettingsContainer } from "containers/cv_settings";
import { Cv } from "repositories/cv_repository";
import { CvVersion } from "repositories/cv_version_repsitory";

import { MayBeAsync } from "types";

const { TabPane } = Tabs;

interface Props {
  cvId: number;
  cv: Cv;
  latestVersion: CvVersion | null;
  onUpdate: () => MayBeAsync<void>;
  isUpdating: boolean;
}

export const CvPageView = observer(
  ({ cvId, cv, latestVersion, onUpdate, isUpdating }: Props) => {
    return (
      <>
        <Alert
          message="To improve your resume quality, add or refine your data, then regenerate the resume. The more precise you are, the better the result."
          type="warning"
          style={{ marginBottom: 16 }}
        />

        <Card
          title={`${cv.position} at ${cv.company}`}
          style={{
            marginBottom: 12,
            maxWidth: 800,
            width: "100%",
          }}
          extra={[
            latestVersion?.needs_update || true ? (
              <Button loading={isUpdating} onClick={onUpdate} type="primary">
                Generate
              </Button>
            ) : (
              <Tooltip title="Your resume reflects the latest data. Add or update records, jobs, or settings to enhance it.">
                <Button disabled icon={<RedoOutlined />}>
                  Update
                </Button>
              </Tooltip>
            ),
          ]}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Preview" key="1">
              {latestVersion ? (
                <CvPreview data={latestVersion} />
              ) : (
                <Empty
                  styles={{ image: { height: 60 } }}
                  style={{ margin: "40px 0 60px" }}
                  description={
                    <Typography.Text type="secondary">
                      You don't have any generated resumes for this vacancy yet.
                      Let's generate it!
                    </Typography.Text>
                  }
                >
                  <Button
                    type="primary"
                    onClick={onUpdate}
                    loading={isUpdating}
                  >
                    Generate
                  </Button>
                </Empty>
              )}
            </TabPane>
            <TabPane tab="Settings" key="2">
              <CvSettingsContainer cvId={cvId} />
            </TabPane>
          </Tabs>
        </Card>
      </>
    );
  },
);
