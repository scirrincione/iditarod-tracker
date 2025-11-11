import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const iditarod = [
    {stop: "Anchorage", miles: 0},
    {stop: "Campbell Airstrip", miles: 11},
    {stop: "Willow", miles: 42},
    {stop: "Yetna Station", miles: 53},
    {stop: "Skwentna", miles: 83},
    {stop: "Finger Lake", miles: 123},
    {stop: "Rainy Pass", miles: 153},
    {stop: "Rohn", miles: 188},
    {stop: "Nikolai", miles: 263},
    {stop: "McGrath", miles: 311},
    {stop: "Takotna", miles: 329},
    {stop: "Ophir", miles: 352},
    {stop: "Cripple", miles: 425},
    {stop: "Ruby", miles: 495},
    {stop: "Galena", miles: 545},
    {stop: "Nulato", miles: 582},
    {stop: "Kaltag", miles: 629},
    {stop: "Unalakleet", miles: 714},
    {stop: "Shaktoolik", miles: 754},
    {stop: "Koyuk", miles: 804},
    {stop: "Elim", miles: 852},
    {stop: "Golovin", miles: 880},
    {stop: "White Mountain", miles: 898},
    {stop: "Safety", miles: 953},
    {stop: "Nome", miles: 975}
  ]

function getLocation(progress) {
    return iditarod.filter(checkpoint => checkpoint.miles <= progress);
  }


const Record = (props) => (
  <li className = "border p-3 rounded" >
                <h2 className="text-2xl">{props.record.name}</h2> 
                <p className="flex flex-row justify-between text-2xl">{props.record.progress} 
                <progress value={props.record.progress/975}/>
                975</p>
              {
                (() => {
                  const locations = getLocation(props.record.progress);
                  const last = locations[locations.length - 1];
                  return (
                    <div className = "flex flex-row justify-between text-2xl">
                    <span>
                      Last Checkpoint Reached: {last ? last.stop : "Not started"}
                    </span>
                    <span>
                      Next Checkpoint: {iditarod[locations.length] ? iditarod[locations.length].stop : "Finished"}
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

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
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