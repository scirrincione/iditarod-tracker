import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Login({ children }) {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    progress: 0,
  });
  const { user, login, logout } = useContext(UserContext);
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const [loginFail, setLoginFail] = useState(false);

  //   useEffect(() => {
  //     async function fetchData() {
  //       const id = params.id?.toString() || undefined;
  //       if(!id) return;
  //       setIsNew(false);
  //       const response = await fetch(
  //         `${import.meta.env.VITE_SERVER_URL}record/${params.id.toString()}`
  //       );
  //       if (!response.ok) {
  //         const message = `An error has occurred: ${response.statusText}`;
  //         console.error(message);
  //         return;
  //       }
  //       const record = await response.json();
  //       if (!record) {
  //         console.warn(`Record with id ${id} not found`);
  //         navigate("/");
  //         return;
  //       }
  //       setForm(record);
  //     }
  //     fetchData();
  //     return;
  //   }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };

    try {
      const result = await login(person);
      console.log('Login result: ', result);
      if (!result) {
        setLoginFail(true);
      }
      else { navigate("/"); }
      //   let response;
      //   if (isNew) {
      //     // if we are adding a new record we will POST to /record.
      //     response = await fetch("${import.meta.env.VITE_SERVER_URL}record", {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(person),
      //     });
      //   } else {
      //     // if we are updating a record we will PATCH to /record/:id.
      //     response = await fetch(`${import.meta.env.VITE_SERVER_URL}record/${params.id}`, {
      //       method: "PATCH",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(person),
      //     });
      //   }

      //   if (!response.ok) {
      //     throw new Error(`HTTP error! status: ${response.status}`);
      //   }
    } catch (error) {
      console.error('A problem occurred while logging in ', error);
    } finally {
      setForm({ username: "", password: "" });
      //navigate("/");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Log in</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="username123"
                    value={form.username}
                    onChange={(e) => updateForm({ username: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Password
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="password123"
                    value={form.password}
                    onChange={(e) => updateForm({ password: e.target.value })}
                  />
                </div>
              </div>
            </div>
            {loginFail && <div className="text-red-600 ">Login failed: Invalid username or password.</div>}
          </div>
          
        </div>
        <input
          type="submit"
          value="Finish Login"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}