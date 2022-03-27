import { useMutation } from "@apollo/client";
import { Comment, List, Form, Button, Input, Rate, message } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useState } from "react";
import { PaginatorInfo, Review } from "../../data";
import { ADD_REVIEW_COMPANY } from "../../GraphQL/Mutation/AddReview";
import * as Yup from "yup";

const { TextArea } = Input;
interface Props {
  comments: {
    data: Review[];
    paginatorInfo: PaginatorInfo;
  };
  userId: number;
  companyId: number;
  refetchComment: any;
  loadingData: boolean;
}

export const validationSchema = Yup.object().shape({
  companyId: Yup.number().required(),
  userId: Yup.number().required(),
  review: Yup.string()
    .min(8, "Bình luận ít nhất 8 kí tự")
    .required("Vui lòng nhập bình luận")
    .typeError("Vui lòng nhập bình luận"),
  rating: Yup.number().required(),
});

const CommentList = ({
  comments,
  userId,
  companyId,
  refetchComment,
  loadingData,
}: Props) => {
  const [addReviewCompany, { loading }] = useMutation(ADD_REVIEW_COMPANY);

  const form = useFormik({
    initialValues: {
      companyId: companyId,
      userId: userId,
      review: "",
      rating: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { data } = await addReviewCompany({
        variables: values,
      });
      console.log(data);
      if (data.addReviewCompany?.status === "OK") {
        refetchComment();
        form.resetForm();
        message.success(data.addReviewCompany.message);
      } else {
        message.success(data.addReviewCompany.message);
      }
    },
  });
  return (
    <>
      <List
        dataSource={comments.data}
        loading={loadingData}
        pagination={{
          ...comments.paginatorInfo,
          onChange: (page) => {
            refetchComment({
              page,
            });
          },
        }}
        header={`${comments.data.length} ${"bình luận"}`}
        itemLayout="horizontal"
        renderItem={(props) => (
          <Comment
            content={
              <div>
                <p>{props.review}</p>
                <Rate value={props.rating} disabled />
              </div>
            }
            datetime={props.created_at}
            author={props.author.email}
            avatar={props.author.avatar}
          />
        )}
      />
      <div>
        <h4>Bình luận về công ty</h4>
        <form onSubmit={form.handleSubmit}>
          <Form.Item label="Nội dung bình luận">
            <TextArea
              rows={4}
              value={form.values.review}
              onChange={(e) => form.setFieldValue("review", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Mức độ hài lòng">
            <Rate
              value={form.values.rating}
              onChange={(value) => form.setFieldValue("rating", value)}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={loading} type="primary">
              Thêm bình luận
            </Button>
          </Form.Item>
        </form>
      </div>
    </>
  );
};

export default CommentList;
