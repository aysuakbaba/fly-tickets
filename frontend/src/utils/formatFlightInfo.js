export default function formatFlightInfo(departureTime, arrivalTime) {
  const departure = new Date(departureTime);
  const arrival = new Date(arrivalTime);

  const formatDate = (date) => {
    const yyyy = date.getUTCFullYear();
    const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(date.getUTCDate()).padStart(2, "0");
    const hh = String(date.getUTCHours()).padStart(2, "0");
    const min = String(date.getUTCMinutes()).padStart(2, "0");

    return {
      date: `${dd}-${mm}-${yyyy}`,
      time: `${hh}:${min}`,
    };
  };

  const departureFormatted = formatDate(departure);
  const arrivalFormatted = formatDate(arrival);

  const durationMs = arrival - departure;
  const totalMinutes = Math.floor(durationMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const durationFormatted = `${hours}hr ${minutes}min`;

  return {
    departureDate: departureFormatted.date,
    departureTime: departureFormatted.time,
    arrivalDate: arrivalFormatted.date,
    arrivalTime: arrivalFormatted.time,
    flightDuration: durationFormatted,
  };
}

export function formatDateToYYYYMMDD(dateInput) {
  const date = new Date(dateInput);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}
