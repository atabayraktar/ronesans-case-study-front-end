import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Router from "next/router";
import Button from "@/components/Button";
import userService from "@/services/userService";

export default function LoginRegister({
  type,
  setLoginOrRegister,
}: {
  type: string;
  setLoginOrRegister: any;
}) {
  const UserService = new userService();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const params = {
      username: event.target[0].value,
      password: event.target[1].value,
    };
    await UserService.Login(params).then((res) => {
      localStorage.setItem("user", JSON.stringify(res?.foundUser?._id));
    });
    if (localStorage.getItem("user") !== "") {
      Router.push("/homePage");
    }
  };
  const handleRegister = async (event: any) => {
    event.preventDefault();
    const params = {
      username: event.target[0].value,
      password: event.target[1].value,
    };
    await UserService.Register(params).then(() => {
      setLoginOrRegister("login");
    });
  };

  return (
    <>
      <div className="login-register-container">
        {type === "login" && (
          <>
            <div className="title">Login</div>
            <form onSubmit={handleLogin}>
              <div className="info">Username</div>
              <input type="text" placeholder="Username" />
              <div className="info">Password</div>
              <input type="text" placeholder="Password" />
              <Button type="submit" variant="option-box" label="Login" />
              <div className="link">
                <div> You haven't an account?</div>
                <div
                  className="link-title"
                  onClick={() => {
                    setLoginOrRegister("register");
                  }}
                >
                  Register
                </div>
              </div>
            </form>
          </>
        )}
        {type === "register" && (
          <>
            <div className="title">Register</div>
            <form onSubmit={handleRegister}>
              <div className="info">Username</div>
              <input type="text" placeholder="Username" />
              <div className="info">Password</div>
              <input type="text" placeholder="Password" />
              <div className="info">Password Confirmation</div>
              <input type="text" placeholder="Password Confirmation" />
              <Button type="submit" variant="option-box" label="Register" />
              <div className="link">
                <div> You have an account?</div>
                <div
                  className="link-title"
                  onClick={() => {
                    setLoginOrRegister("login");
                  }}
                >
                  Login
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}
