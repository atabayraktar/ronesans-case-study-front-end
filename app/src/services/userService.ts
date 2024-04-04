import axios from "./api/index";
import { User } from "../entities/User";

export default class userService {
  async Login(params: User): Promise<any> {
    const res = await axios.post(`http://localhost:3000/user/login`, params);
    return res.data;
  }
  async Register(params: User): Promise<any> {
    const res = await axios.post(`http://localhost:3000/user/register`, params);
    return res.data;
  }
}
