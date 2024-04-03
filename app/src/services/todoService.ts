import axios from "./api/index";
import { Todo } from "../entities/Todo";
import { User } from "../entities/User";

export default class TodoService {
  async Create(params: Todo): Promise<any> {
    const res = await axios.post(`http://localhost:3000/todo/create`, params);
    return res.data;
  }
  async Update(params: Todo): Promise<any> {
    const res = await axios.put(`http://localhost:3000/todo/update`, params);
    return res.data;
  }
  async Delete(params: Todo): Promise<any> {
    const res = await axios.delete(
      `http://localhost:3000/todo/delete/${params.id}`
    );
    return res.data;
  }
  async Check(params: Todo): Promise<any> {
    const res = await axios.put(
      `http://localhost:3000/todo/check/${params.id}`,
      params.isChecked
    );
    return res.data;
  }
  async GetAll(params: any): Promise<any> {
    const res = await axios.post(`http://localhost:3000/todo/getAll`, params);
    return res.data;
  }

  async GetOne(params: Todo): Promise<any> {
    const res = await axios.get(
      `http://localhost:3000/todo/getOne/${params.id}`
    );
    return res.data;
  }
  async Filter(params: any): Promise<any> {
    const res = await axios.get(
      `http://localhost:3000/todo/filter?${params.startDate}&${params.endDate}`,
      params.user_id
    );
    return res.data;
  }
}
