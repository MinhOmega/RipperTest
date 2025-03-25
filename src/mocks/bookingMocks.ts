import {format} from 'date-fns';
import AcrobaticsSVG from '../assets/svg/Acrobatics';
import DanceSVG from '../assets/svg/Dance';
import ArcherySVG from '../assets/svg/Archery';
import YogaSVG from '../assets/svg/Yoga';

export type Sport = 'Acrobatics' | 'Dance' | 'Archery' | 'Yoga';

export interface Booking {
  id: string;
  sport: Sport;
  startDateTime: Date;
  endDateTime: Date;
}

export const SPORTS: Sport[] = ['Acrobatics', 'Dance', 'Archery', 'Yoga'];

export const SPORT_ICONS = {
  Acrobatics: AcrobaticsSVG,
  Dance: DanceSVG,
  Archery: ArcherySVG,
  Yoga: YogaSVG,
};

const generateRandomTime = (
  baseDate: Date,
  minHour = 0,
  maxHour = 23,
): Date => {
  const hour = Math.floor(Math.random() * (maxHour - minHour + 1)) + minHour;
  const minute = Math.floor(Math.random() * 12) * 5; // 5-minute intervals
  return new Date(baseDate.setHours(hour, minute, 0, 0));
};

export const generateBookings = (page: number): Booking[] => {
  const bookings: Booking[] = [];
  const startDate = new Date('2024-12-16');
  let currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate() + Math.floor((page * 25) / 3));

  for (let i = 0; i < 25; i++) {
    const bookingsForDate = bookings.filter(
      b =>
        format(b.startDateTime, 'yyyy-MM-dd') ===
        format(currentDate, 'yyyy-MM-dd'),
    ).length;

    if (bookingsForDate >= 3) {
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const startDateTime = generateRandomTime(new Date(currentDate));
    const maxEndHour = startDateTime.getHours() < 23 ? 23 : 24;
    const endDateTime = generateRandomTime(
      new Date(currentDate),
      startDateTime.getHours(),
      maxEndHour,
    );

    bookings.push({
      id: `${page}-${i}`,
      sport: SPORTS[Math.floor(Math.random() * SPORTS.length)],
      startDateTime,
      endDateTime,
    });
  }

  return bookings;
};
