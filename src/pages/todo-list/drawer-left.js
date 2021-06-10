import React from "react";
import { Drawer, Button, Input, Form, message } from "antd";
import { connect } from "react-redux";
import { addToDoList, editToDoList } from "../../redux/actions/todo-list";
import { addDataService, editDataService } from "../../redux/service/todo-list";

function DrawerLeft({
  visible,
  onClose,
  isNew,
  addData,
  fields,
  onChange,
  editData,
  id
}) {
  const [form] = Form.useForm();

  function onHandleClose() {
    form.resetFields();
    onClose();
  }

  const onFinish = async values => {
    if (isNew) {
      await addData(values);
    } else {
      values.id = id;
      values.key = id;
      await editData(values);
    }
    onHandleClose();
  };

  return (
    <Drawer
      title={isNew ? "Add Data" : "Edit Data"}
      onClose={onHandleClose}
      visible={visible}
    >
      <Form
        layout="vertical"
        form={form}
        hideRequiredMark
        name="basic"
        fields={fields}
        onFinish={onFinish}
      >
        <Form.Item name="name" label="Tên">
          <Input placeholder="Vui lòng nhập Tên" />
        </Form.Item>
        <Form.Item name="age" label="Age">
          <Input placeholder="Vui lòng nhập tuổi" type="number" />
        </Form.Item>
        <Form.Item name="title" label="Tiêu đề">
          <Input placeholder="Vui lòng nhập tiêu đề" />
        </Form.Item>
        <Form.Item name="author" label="author">
          <Input placeholder="Vui lòng Nhập author" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isNew ? "Add" : "Edit"}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addData: async values => {
      try {
        const { status, data } = await addDataService(values);
        if (status !== 201) throw new Error("Add data failer");
        dispatch(addToDoList({ ...data, key: data.id }));
        message.success("Add data thành công");
      } catch (error) {
        console.log(error);
        message.error("Add data không thành công");
      }
    },
    editData: async values => {
      const { id } = values;
      try {
        const { status, data } = await editDataService(id, values);
        if (status !== 200) throw new Error("Edit data failer");
        dispatch(editToDoList(data));
        message.success("Edit data thành công");
      } catch (error) {
        console.log(error);
        message.error("Edit data không thành công");
      }
    }
  };
}

const withDrawerLeft = connect(
  null,
  mapDispatchToProps
)(DrawerLeft);

export default withDrawerLeft;
