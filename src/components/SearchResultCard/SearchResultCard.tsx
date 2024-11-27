import React, { ReactNode } from "react";
import { Card, Typography, Divider } from "antd";
import { useRouter } from "next/router";

import { Tag } from "components/Tag";
import { Job } from "repositories/JobRepository";
// @ts-ignore
import { byAlpha3 as countryCodesAlpha3LookUp } from "iso-country-codes";
import Link from "next/link";

countryCodesAlpha3LookUp["RUS"] = {
  ...countryCodesAlpha3LookUp["RUS"],
  name: "Russia",
};

const { Paragraph } = Typography;

export const SearchResultCard = ({
  id,
  company,
  title,
  required_skills,
  currency,
  salary_from,
  salary_to,
  country,
  city,
  score,
}: Job) => {
  const router = useRouter();
  const isDebugEnabled = router.query.debug;

  return (
    <Link prefetch={false} href={`/admin/jobs/${id}`}>
      <Card title={title}>
        <Paragraph style={{ color: "#AAA" }}>{company}</Paragraph>
        {required_skills.map((skill) => (
          <Tag key={skill.id} item={{ color: "#E9B", name: skill.title }} />
        ))}
        {country ? (
          <Paragraph style={{ color: "#AAA" }}>{`${countryCodesAlpha3LookUp[
            country
          ]?.name}${city ? ", " + city : ""}`}</Paragraph>
        ) : null}

        {currency === "USD" ? (
          <Paragraph>
            ${salary_from} to ${salary_to} /mo.
          </Paragraph>
        ) : null}

        {currency === "RUB" ? (
          <Paragraph>
            {salary_from}₽ to {salary_to}₽ /mo.
          </Paragraph>
        ) : null}

        {isDebugEnabled ? (
          <>
            <Divider />
            <Paragraph>Score: {score}</Paragraph>
          </>
        ) : null}
      </Card>
    </Link>
  );
};
