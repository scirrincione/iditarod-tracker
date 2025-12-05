import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function EditProgress() {
  const { user, updateUser } = useContext(UserContext);
  const [name, setName] = useState(user?.name);

  const [isNew, setIsNew] = useState(true);
  //const params = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    async function fetchData() {
      const id = user?.id?.toString() || undefined;
      if(!id) return;
      setIsNew(false);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}record/${user?.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setName(user?.name);
    }
    fetchData();
    return;
  }, [user?.id, navigate]);

  // These methods will update the state properties.
//   function updateForm(value) {
//     return setForm((prev) => {
//       return { ...prev, ...value };
//     });
//   }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const updatedUser = updateUser({ ...user, name: name });
    if (updatedUser) {
      navigate("/");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3 className="text-lg font-semibold px-4 py-2 bg-sky-200">Edit Profile</h3>
      <form
        onSubmit={onSubmit}
        className="border-t-2 border-b-2 border-sky-800 overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-400 pb-12 md:grid-cols-2">

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4 font-bold">
              <label
                htmlFor="position"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Change Name
              </label>
              <div className="mt-2">
                <div className="flex font-normal rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="progress"
                    id="progress"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Change name"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium border border-sky-800 border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </div>
  );
}