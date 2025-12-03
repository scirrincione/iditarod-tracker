import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { NavLink } from "react-router-dom";

const iditarod = [
  { stop: "Anchorage", miles: 0, color: "text-red-800" },
  { stop: "Campbell Airstrip", miles: 11, color: "text-red-800" },
  { stop: "Willow", miles: 42, color: "text-orange-800"  },
  { stop: "Yetna Station", miles: 53, color: "text-orange-800"  },
  { stop: "Skwentna", miles: 83, color: "text-amber-800"  },
  { stop: "Finger Lake", miles: 123, color: "text-amber-800"  },
  { stop: "Rainy Pass", miles: 153, color: "text-yellow-800"  },
  { stop: "Rohn", miles: 188, color: "text-yellow-800"  },
  { stop: "Nikolai", miles: 263, color: "text-lime-800"  },
  { stop: "McGrath", miles: 311, color: "text-lime-800"  },
  { stop: "Takotna", miles: 329, color: "text-green-800"  },
  { stop: "Ophir", miles: 352, color: "text-green-800"  },
  { stop: "Cripple", miles: 425, color: "text-emerald-800"  },
  { stop: "Ruby", miles: 495, color: "text-emerald-800"  },
  { stop: "Galena", miles: 545, color: "text-teal-800"  },
  { stop: "Nulato", miles: 582, color: "text-teal-800"  },
  { stop: "Kaltag", miles: 629, color: "text-cyan-800"  },
  { stop: "Unalakleet", miles: 714, color: "text-cyan-800"  },
  { stop: "Shaktoolik", miles: 754, color: "text-sky-800"  },
  { stop: "Koyuk", miles: 804, color: "text-sky-800"  },
  { stop: "Elim", miles: 852, color: "text-blue-800"  },
  { stop: "Golovin", miles: 880, color: "text-blue-800"  },
  { stop: "White Mountain", miles: 898, color: "text-indigo-800"  },
  { stop: "Safety", miles: 953, color: "text-indigo-800"  },
  { stop: "Nome", miles: 975, color: "text-green-600"  },
]

function getLocation(progress) {
  return iditarod.filter(checkpoint => checkpoint.miles <= progress);
}

function Equivalent(user, record) {
  return user!=null && record.record.name === user?.name;
}

const Record = (props) => (
  <li className="border p-3 rounded" >
    <h2 className="flex flex-row text-2xl justify-between p-2">{props.record.name}
      {Equivalent(props.user, props) &&
        <NavLink
          className="mr-2 mb-1 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium border border-input bg-background hover:bg-slate-100 h-7 rounded-md px-2"
          to="/editprogress">
          Edit Progress
          </NavLink>}
    </h2>
    <div className="flex flex-row justify-between text-xl">
      <div className="pr-2">{props.record.progress}</div>
      <progress value={props.record.progress / 975} />
      <div className="pl-2">975</div>
      </div>
    {
      (() => {
        const locations = getLocation(props.record.progress);
        const last = locations[locations.length - 1];
        console.log(locations[locations.length-1]);
        return (
          <div className="flex flex-row justify-between text-xl md:text-2xl mt-2">
            <span className="mr-5">
              Last Checkpoint Reached: <div className={`inline-flex items-center justify-center whitespace-nowrap text-base font-medium border border-2 bg-background h-9 rounded-md px-1 ${last.color}`}>{last ? last.stop : "Not started"}</div>
            </span>
            <span>
              Next Checkpoint: <div className={`inline-flex items-center justify-center whitespace-nowrap text-base font-medium border border-2 bg-background h-9 rounded-md px-1 ${iditarod[locations.length] ? iditarod[locations.length].color : "text-green-600"}`}>{iditarod[locations.length] ? iditarod[locations.length].stop : "Finished"}</div>
            </span>
          </div>
        );
      })()
    }
  </li>
  // <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
  //   <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
  //     {props.record.name}
  //   </td>
  //   <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
  //     {props.record.position}
  //   </td>
  //   <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
  //     {props.record.level}
  //   </td>
  //   <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
  //     <div className="flex gap-2">
  //       <Link
  //         className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
  //         to={`/edit/${props.record._id}`}
  //       >
  //         Edit
  //       </Link>
  //       <button
  //         className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
  //         color="red"
  //         type="button"
  //         onClick={() => {
  //           props.deleteRecord(props.record._id);
  //         }}
  //       >
  //         Delete
  //       </button>
  //     </div>
  //   </td>
  // </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const { user, login, logout } = useContext(UserContext);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}record/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      const sortedRecords = records.sort((a, b) => b.progress - a.progress);
      setRecords(sortedRecords);
    }
    getRecords();
    
    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`${import.meta.env.VITE_SERVER_URL}record/${id}`, {
      method: "DELETE",
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          user={user}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <div className="font-bold text-3xl p-4">Mushers</div>
          {recordList()}
        </div>
      </div>
    </>
  );
}