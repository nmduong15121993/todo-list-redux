import React, { useState } from "react";
import { Table, Button, message } from "antd";
import { connect } from "react-redux";
import { getAllData, deleteToDoList } from "../../redux/actions/todo-list";
import {
  getAllDataService,
  deleteDataService
} from "../../redux/service/todo-list";
import DrawerLeft from "./drawer-left";
import { FieldsData } from "./fields-data";
import styles from "./todo-list.module.css";

function ToDoList({ listData, getData, deleteData }) {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [fields, setFields] = useState([]);
  const [id, setID] = useState(null);
  React.useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  const onEditData = async rowData => {
    const data = await FieldsData(rowData);
    setID(rowData.id);
    setFields(data);
    setIsNew(false);
    setVisible(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (value, record) => (
        <a href="#" onClick={() => onEditData(record)}>
          {value || "underFine"}
        </a>
      )
    },
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Age",
      dataIndex: "age"
    },
    {
      title: "Title",
      dataIndex: "title"
    },
    {
      title: "Author",
      dataIndex: "author"
    },
    {
      title: "Action",
      render: record => (
        <Button type="primary" onClick={() => deleteData(record)}>
          Delete
        </Button>
      )
    }
  ];

  function onClose() {
    setVisible(false);
  }

  function onHandleAdd() {
    setIsNew(true);
    setVisible(true);
  }

  return (
    <div>
      <h1>ToDo List App</h1>
      <Button type="primary" className={styles.addTodo} onClick={onHandleAdd}>
        Add Data
      </Button>
      <Table columns={columns} dataSource={listData} loading={loading} />
      <DrawerLeft
        visible={visible}
        onClose={onClose}
        isNew={isNew}
        fields={fields}
        id={id}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    listData: state.toDoListReducer.listData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getData: async () => {
      try {
        const { data } = await getAllDataService();
        const dataNew = data.map(item => {
          item.key = item.id;
          return item;
        });
        dispatch(getAllData(dataNew));
      } catch (error) {
        console.log(error);
      }
    },
    deleteData: async rowData => {
      const { id } = rowData;
      try {
        const { status } = await deleteDataService(id);
        if (status !== 200) throw new Error("Can not Delete");
        message.success("Xóa Data Thành Công");
        dispatch(deleteToDoList(id));
      } catch (error) {
        message.error("Xóa Data Thất Baị");
        console.log(error);
      }
    }
  };
}

const withToDoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoList);

export default withToDoList;
