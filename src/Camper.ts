export type Cabin =
  | "Apache"
  | "Caddo"
  | "Comanche"
  | "Coyote"
  | "Crescent"
  | "Fort Fisher"
  | "Fort Gates"
  | "Fort Graham"
  | "Lone Star"
  | "Pioneer"
  | "Quail Creek"
  | "Road Runner"
  | "Sundance"
  | "Tonkawa"
  | "Wagon Wheel";
export enum DayOfWeek {
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday"
}

export class Camper {
  name: string;
  cabin: Cabin;
  needsAssistance: Boolean;
  monday: Boolean;
  tuesday: Boolean;
  wednesday: Boolean;
  thursday: Boolean;

  constructor(
    name: string,
    cabin: Cabin,
    needsAssistance: Boolean,
    monday: Boolean,
    tuesday: Boolean,
    wednesday: Boolean,
    thursday: Boolean
  ) {
    this.name = name;
    this.cabin = cabin;
    this.needsAssistance = needsAssistance;
    this.monday = monday;
    this.tuesday = tuesday;
    this.wednesday = wednesday;
    this.thursday = thursday;
  }
}

export const AllCabins = (campers: Camper[]): Cabin[] => {
  return Array.from(new Set<Cabin>(campers.map(c => c.cabin))).sort();
};

export const CampersInCabinForDay = (
  campers: Camper[],
  cabin: Cabin,
  day: DayOfWeek
): Camper[] => {
  const inCabin = CampersInCabin(campers, cabin);
  return CampersForDay(inCabin, day).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
};

export const CampersInCabin = (campers: Camper[], cabin: Cabin): Camper[] => {
  return campers.filter(camper => camper.cabin === cabin);
};

export const CampersForDay = (campers: Camper[], day: DayOfWeek): Camper[] => {
  return campers.filter(camper => {
    switch (+day) {
      case DayOfWeek.Monday:
        return camper.monday;
      case DayOfWeek.Tuesday:
        return camper.tuesday;
      case DayOfWeek.Wednesday:
        return camper.wednesday;
      case DayOfWeek.Thursday:
        return camper.thursday;
      default:
        return false;
    }
  });
};
