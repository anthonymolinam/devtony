export const TIME_ZONE = "America/Bogota";
export const UTC_OFFSET_LABEL = "UTC−5";

export type DayStatus = "working" | "off-hours" | "sleeping";

export const STATUS_LABELS: Record<DayStatus, string> = {
  working: "Working",
  "off-hours": "Off hours",
  sleeping: "Sleeping",
};

type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday

interface Range {
  status: Exclude<DayStatus, "off-hours">;
  days: readonly Weekday[];
  /** Bogotá local time, "HH:MM", 24 h. `from` is inclusive, `to` exclusive. A range may cross midnight. */
  from: string;
  to: string;
}

const WEEKDAYS = [1, 2, 3, 4, 5] as const;
const EVERY_DAY = [0, 1, 2, 3, 4, 5, 6] as const;

// TODO(content): confirm your real hours. First match wins; anything not covered is "off hours".
export const SCHEDULE: readonly Range[] = [
  { status: "sleeping", days: EVERY_DAY, from: "23:00", to: "07:00" },
  { status: "working", days: WEEKDAYS, from: "09:00", to: "18:00" },
];

const toMinutes = (time: string): number => {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export function statusAt(day: number, minutes: number): DayStatus {
  for (const range of SCHEDULE) {
    if (!(range.days as readonly number[]).includes(day)) continue;
    const from = toMinutes(range.from);
    const to = toMinutes(range.to);
    const inside = from <= to ? minutes >= from && minutes < to : minutes >= from || minutes < to;
    if (inside) return range.status;
  }
  return "off-hours";
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Human summary of the working range, for the no-JS state, e.g. "Mon–Fri, 09:00–18:00". */
export function workingHoursSummary(): string {
  const working = SCHEDULE.find((range) => range.status === "working");
  if (!working) return "";
  const first = DAY_NAMES[working.days[0] ?? 0];
  const last = DAY_NAMES[working.days.at(-1) ?? 0];
  const days = first === last ? first : `${first}–${last}`;
  return `${days}, ${working.from}–${working.to}`;
}
