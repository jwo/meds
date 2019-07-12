import React, { FunctionComponent, useState } from "react";
import Upload from "./Upload";
import { Camper, AllCabins, DayOfWeek, CampersInCabinForDay } from "./Camper";
import Typography from "@material-ui/core/Typography";
import "./App.css";
import CamperList from "./CamperList";
import Card from "@material-ui/core/Card";

const days = [
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday
];

const App: FunctionComponent = () => {
  const [campers, setCampers] = useState([] as Camper[]);

  const cabins = AllCabins(campers);

  return (
    <div className="App">
      {campers.length === 0 && <Upload receiveAllCampers={setCampers} />}

      {cabins.map(cabin => (
        <div key={`cabin-${cabin}`} className="cabin">
          <div className="cabin-header">
            <Typography variant={"h1"}>{cabin}</Typography>
            <Typography variant={"subtitle2"}>Daily Prophy Schedule</Typography>
          </div>

          <div className={"days"}>
            {days.map(day => {
              return (
                <Card key={`cabinday-${cabin}-${day}`} className="day">
                  <Typography variant={"h3"}>{DayOfWeek[day]}</Typography>

                  <CamperList
                    campers={CampersInCabinForDay(campers, cabin, day)}
                  />
                </Card>
              );
            })}
          </div>
          <Typography variant={"h6"} className="assistance">
            * Needs Assistance
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default App;
