import { axios } from "../../helper/axios";

const getAllDataService = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/todolist`)
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};

const addDataService = data => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/todolist`, data)
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};

const editDataService = (id, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/todolist/${id}`, data)
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};

const deleteDataService = id => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/todolist/${id}`)
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};

export {
  getAllDataService,
  deleteDataService,
  addDataService,
  editDataService
};
