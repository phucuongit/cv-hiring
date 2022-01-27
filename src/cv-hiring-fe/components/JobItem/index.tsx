import { Tag } from "antd";
import Link from "next/link";
import React from "react";
import style from "./style.module.scss";
import { Heart } from "@styled-icons/bootstrap/Heart";
import { formatDistance, format, parse } from "date-fns";

interface Props {
  logoUrl: string;
  title: string;
  companyName: string;
  deadlineDate: string;
  salary: string;
  provinceName: string;
  slug: string;
  updatedAt: string;
  companySlug: string;
}

function JobItem({
  logoUrl,
  title,
  companyName,
  deadlineDate,
  salary,
  provinceName,
  updatedAt,
  companySlug,
  slug,
}: Props) {
  return (
    <div className={style.jobItem}>
      <div className={style.avatar}>
        <img src={logoUrl} />
      </div>
      <div className={style.jobInfo}>
        <div className={style.info}>
          <p className={style.title}>
            <Link href={`/viec-lam/${slug}`}>
              <a>{title}</a>
            </Link>
          </p>
          <p className={style.company}>
            <Link href={`/cong-ty/${companySlug}`}>
              <a>{companyName}</a>
            </Link>
          </p>
          <Tag color="success">{salary}</Tag>
          <Tag color="orange">{provinceName}</Tag>
          <Tag color="magenta">
            {formatDistance(
              parse(updatedAt, "yyyy-MM-dd", new Date()),
              new Date(),
              {
                addSuffix: true,
              }
            )}
          </Tag>
        </div>
        <div className={style.action}>
          <p className={style.alignRight}>
            Hạn nộp:{" "}
            {format(
              parse(deadlineDate, "yyyy-MM-dd HH:m:s", new Date()),
              "dd-MM-yyyy"
            )}
          </p>
          <button>
            <Heart width={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobItem;
