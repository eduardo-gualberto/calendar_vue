import CalendarTile from "./CalendarTile";

export default interface CalendarUnit {
  day: string;
  tiles: Array<CalendarTile>;
  id: number;
}
