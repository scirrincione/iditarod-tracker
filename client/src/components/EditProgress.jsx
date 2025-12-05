import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function EditProgress() {
  const [miles, setMiles] = useState();
  const { user, updateUser } = useContext(UserContext);

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
      setMiles(user?.progress);
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
    const currentProgress = Number(user?.progress);
    const added = Number(miles)
    const newProgress = currentProgress + added;
    const updatedUser = updateUser({ ...user, progress: newProgress });
    if (updatedUser) {
      setMiles(0);
      navigate("/");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4 bg-sky-200">Edit Progress</h3>
      <form
        onSubmit={onSubmit}
        className="border-y-2 overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4 font-bold"> Current miles: {user?.progress}
              <label
                htmlFor="position"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Miles Completed
              </label>
              <div className="mt-2">
                <div className="flex font-normal rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="progress"
                    id="progress"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="8 [or] -2 [to correct a mistake]"
                    value={miles}
                    onChange={(e) => setMiles(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Add miles"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}