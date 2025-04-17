import React from "react";
import { Breadcrumb, BreadcrumbProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  style: BreadcrumbProps["style"];
}

export const Breadcrumbs = ({ style }: Props) => {
  const router = useRouter();

  const breadcrumbItems: BreadcrumbProps["items"] = [
    {
      title: <Link href="/">Home</Link>,
    },
  ];

  return <Breadcrumb style={style} items={breadcrumbItems} />;
};
