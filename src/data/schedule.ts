/**
 * 街頭活動・集会などの予定。日付の新しい順でなくてよい(表示時に並べ替える)。
 * 過ぎた予定は自動で表示されなくなる。
 */
export type ScheduleItem = {
  date: string; // '2027-01-15'
  time?: string; // '18:30〜20:00'
  title: string;
  place?: string;
  mapUrl?: string;
  note?: string;
};

export const schedule: ScheduleItem[] = [];
