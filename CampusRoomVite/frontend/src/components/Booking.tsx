import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { type Room } from "../types/RoomType";
import { type Booking } from "../types/BookingType";

/**
 * Booking component
 * @returns
 */

function BookingComponent() {
  //const [newBooking, setNewBooking] = useState<Booking>({user_id:0, room_id:0, start_time:new Date() , end_time:new Date()})

  const [formData, setFormData] = useState({
    user_id: 0,
    room_id: 0,
    date: "",
    startTime: "",
    endTime: "",
  });
  const [showRooms, setShowRooms] = useState<boolean>(false);

  const [selectedRoomId, setSelectedRoomId] = useState<number>(0);

  /**
   * Function  
   * @returns
   */
  function FetchAvailableRooms() {
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
      fetch("/api/rooms")
        .then((res) => res.json())
        .then((data: Room[]) => setRooms(data))
        .catch((err: unknown) => console.error(err));
    }, []);

    return rooms.map((room) => {
      return (
        <tr key={room.room_id}>
          <td>{room.room_number}</td>
          <td>{room.capacity}</td>
          <td>{room.room_type}</td>
          <td>
            <input
              type="checkbox"
              name="room_id"
              onChange={HandleChangeEvent}
              checked={selectedRoomId === room.room_id}
              value={room.room_id}
            />
          </td>
        </tr>
      );
    });
  }

  const HandleSubmitEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const start_time = new Date(`${formData.date}T${formData.startTime}`);
    const end_time = new Date(`${formData.date}T${formData.endTime}`);

    const CreateNewBooking: Booking = {
      user_id: formData.user_id,
      room_id: selectedRoomId,
      start_time: start_time,
      end_time: end_time,
    };

    console.log("CREATED NEW BOOKING: ", CreateNewBooking);
  };

  const HandleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;

    if (name === "room_id") {
      const roomIdnum = Number(value);

      setSelectedRoomId(checked ? roomIdnum : 0);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <div className="Booking">
        <form onSubmit={HandleSubmitEvent}>
          <fieldset>
            <legend>Fill the info</legend>
            <label htmlFor="fname">First name:</label>
            <br />
            <input
              type="text"
              id="fname"
              name="fname"
              onChange={HandleChangeEvent}
            />
            <br />

            <label htmlFor="lname">Last name:</label>
            <br />
            <input
              type="text"
              id="lname"
              name="lname"
              onChange={HandleChangeEvent}
            />
            <br />

            <label htmlFor="date">Select Date</label>
            <input
              type="date"
              id="date"
              name="date"
              onChange={HandleChangeEvent}
            />

            <label htmlFor="startTime">Select start time</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              min="08:00"
              max="16:00"
              onChange={HandleChangeEvent}
            />

            <label htmlFor="endTime">Select end time</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              min="09:00"
              max="17:00"
              onChange={HandleChangeEvent}
            />

            <button type="button" onClick={() => setShowRooms(true)}>
              Press to see available rooms
            </button>

            <section className="SelectRoom">
              {showRooms ? (
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Room number</th>
                        <th>Capacity</th>
                        <th>Type</th>
                        <th>Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      <FetchAvailableRooms />
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>button not pressed</p>
              )}
            </section>

            <button type="submit">Submit</button>
          </fieldset>
        </form>

        <br />
      </div>
    </>
  );
}

export default BookingComponent;
