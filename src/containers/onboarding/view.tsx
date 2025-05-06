import { Button, Typography } from "antd";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import { OnboardingModal } from "components/onboarding_modal";
import { StepModal } from "components/step_modal";
import { OnboardingModalName } from "stores/onboarding_store";

interface Props {
  modal: OnboardingModalName | null;
  onOpenJobModal: () => void;
  onOpenRecordModal: () => void;
  onFinishOnboarding: () => void;
  onOpenCvPage: () => void;
  onOpenCvPreview: () => void;
  onFinallyFinishOnboarding: () => void;
}

export const OnboardingView = observer(
  ({
    modal,
    onFinishOnboarding,
    onOpenJobModal,
    onOpenRecordModal,
    onOpenCvPage,
    onOpenCvPreview,
    onFinallyFinishOnboarding
  }: Props) => {
    const renderFooter = (
      next: (() => void) | null,
      prev: (() => void) | null,
    ) => (
      <>
        {prev ? (
          <Button type="default" onClick={() => prev?.()}>
            Back
          </Button>
        ) : null}
        {next ? (
          <Button type="primary" onClick={() => next?.()}>
            Next
          </Button>
        ) : (
          <Button type="primary" onClick={() => onFinishOnboarding()}>
            Add First Job
          </Button>
        )}
      </>
    );
    switch (modal) {
      case "onboarding":
        return (
          <StepModal
            isOpen
            steps={[
              {
                component: () => (
                  <div>
                    <Image
                      src={"/illustrations/greeting.jpg"}
                      width={1536}
                      height={1024}
                      alt="greeting"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                    <Typography.Paragraph>
                      <b>
                        Our service helps you craft resumes that shape your
                        experience to match the job you want.
                      </b>
                    </Typography.Paragraph>
                  </div>
                ),
                footer: renderFooter,
              },
              {
                component: () => (
                  <div>
                    <Image
                      src={"/illustrations/adding-jobs.jpg"}
                      width={1536}
                      height={1024}
                      alt="greeting"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                    <Typography.Paragraph>
                      <b>
                        First, we’ll need your work experience — companies,
                        positions, and dates.
                      </b>{" "}
                      This builds the foundation for your CV.
                    </Typography.Paragraph>
                  </div>
                ),
                footer: renderFooter,
              },
              {
                component: () => (
                  <div>
                    <Image
                      src={"/illustrations/adding-records.jpg"}
                      width={1536}
                      height={1024}
                      alt="greeting"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                    <Typography.Paragraph>
                      <b>
                        Next, you’ll add Records. A Record is anything you
                        achieved — features you built, goals you reached, or
                        contributions you made to projects.
                      </b>
                    </Typography.Paragraph>
                  </div>
                ),
                footer: renderFooter,
              },
              {
                component: () => (
                  <div>
                    <Image
                      src={"/illustrations/application.jpg"}
                      width={1536}
                      height={1024}
                      alt="greeting"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                    <Typography.Paragraph>
                      <b>
                        Once your jobs and Records are ready, you can start
                        crafting your CVs
                      </b>
                      . Just paste a job description, and we’ll help you
                      generate and fine-tune a resume that fits perfectly.
                    </Typography.Paragraph>
                  </div>
                ),
                footer: renderFooter,
              },
              {
                component: () => (
                  <div>
                    <Image
                      src={"/illustrations/update.jpg"}
                      width={1536}
                      height={1024}
                      alt="greeting"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                    <Typography.Paragraph>
                      <b>
                        Remember to add new Records whenever you achieve
                        something important.
                      </b>{" "}
                      This way, you’ll never lose track of your story — and
                      we’ll always have the latest details to build even better
                      CVs for you.
                    </Typography.Paragraph>
                  </div>
                ),
                footer: renderFooter,
              },
              {
                component: () => (
                  <div>
                    <Image
                      src={"/illustrations/letsgo.jpg"}
                      width={1536}
                      height={1024}
                      alt="greeting"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                    <Typography.Paragraph>
                      <b>Let’s start filling in your story.</b>
                    </Typography.Paragraph>
                  </div>
                ),
                footer: renderFooter,
              },
            ]}
          />
        );
      case "add-first-job":
        return (
          <OnboardingModal
            isOpen
            image={{
              src: "/illustrations/adding-jobs.jpg",
              width: 1536,
              height: 1024,
              alt: "greeting",
            }}
            content={
              <Typography.Paragraph style={{ textAlign: "center" }}>
                <b>Let's create your first job!</b> Fill in the company name,
                position, dates, and briefly describe the company and your role
                there.
              </Typography.Paragraph>
            }
            button={{
              text: "Add Job",
              onClick: () => {
                onOpenJobModal();
              },
            }}
          />
        );
      case "add-first-record":
        return (
          <OnboardingModal
            isOpen
            image={{
              src: "/illustrations/adding-records.jpg",
              width: 1536,
              height: 1024,
              alt: "greeting",
            }}
            content={
              <Typography.Paragraph style={{ textAlign: "center" }}>
                <b>
                  You've just added your first job! Now let's add 3 Records to
                  it.
                </b>
                <br />
                <br />A Record is anything you achieved — features you built,
                goals you reached, challenges you solved, or any other
                contributions you made to projects. You can describe them in any
                style, but for better results, it's best to follow the{" "}
                <a
                  href="https://www.linkedin.com/advice/0/how-do-you-use-par-problem-action-result-method"
                  rel="nofollow"
                  target="_blank"
                >
                  PAR method
                </a>
                : Problem → Action → Result.
              </Typography.Paragraph>
            }
            button={{
              text: "Add Record",
              onClick: () => {
                onOpenRecordModal();
              },
            }}
          />
        );
      case "add-second-record":
        return (
          <OnboardingModal
            isOpen
            image={{
              src: "/illustrations/adding-records.jpg",
              width: 1536,
              height: 1024,
              alt: "greeting",
            }}
            content={
              <Typography.Paragraph style={{ textAlign: "center" }}>
                <b>2 more left!</b>
              </Typography.Paragraph>
            }
            button={{
              text: "Add Record",
              onClick: () => {
                onOpenRecordModal();
              },
            }}
          />
        );

      case "add-third-record":
        return (
          <OnboardingModal
            isOpen
            image={{
              src: "/illustrations/adding-records.jpg",
              width: 1536,
              height: 1024,
              alt: "greeting",
            }}
            content={
              <Typography.Paragraph style={{ textAlign: "center" }}>
                <b>1 more left!</b>
              </Typography.Paragraph>
            }
            button={{
              text: "Add Record",
              onClick: () => {
                onOpenRecordModal();
              },
            }}
          />
        );
      case "add-first-cv":
        return (
          <OnboardingModal
            isOpen
            image={{
              src: "/illustrations/application.jpg",
              width: 1536,
              height: 1024,
              alt: "greeting",
            }}
            content={
              <Typography.Paragraph style={{ textAlign: "center" }}>
                <b>Now you have enough Records to create your first resume!</b>
              </Typography.Paragraph>
            }
            button={{
              text: "Create Resume",
              onClick: () => {
                onOpenCvPage();
              },
            }}
          />
        );

      case "add-first-preview":
        return (
          <OnboardingModal
            isOpen
            image={{
              src: "/illustrations/application.jpg",
              width: 1536,
              height: 1024,
              alt: "greeting",
            }}
            content={
              <Typography.Paragraph style={{ textAlign: "center" }}>
                <b>
                  Now you have created CV configuration! Finally, it's time to
                  generate resume!
                </b>
              </Typography.Paragraph>
            }
            button={{
              text: "Generate Resume",
              onClick: () => {
                onOpenCvPreview();
              },
            }}
          />
        );

      case "onboarding-finished":
        return (
          <OnboardingModal
            isOpen
            image={{
              src: "/illustrations/application.jpg",
              width: 1536,
              height: 1024,
              alt: "greeting",
            }}
            content={
              <Typography.Paragraph style={{ textAlign: "center" }}>
                <b>
                  Done! You've generated your first resume!
                </b>
                <br/>
                Now you can fill all your data and get back here to regenerate this resume or create a new one.
              </Typography.Paragraph>
            }
            button={{
              text: "Finish Onboarding",
              onClick: () => {
                onFinallyFinishOnboarding();
              },
            }}
          />
        );
      default:
        return null;
    }
  },
);
