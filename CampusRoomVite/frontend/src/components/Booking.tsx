import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react'
import  { type Room }  from '../types/RoomType'
import { type Booking } from '../types/BookingType'






/**
 * Booking component 
 * @returns 
 */

function BookingComponent() {

  const [newBooking, setNewBooking] = useState<Booking>({user_id:0, room_id:0, start_time:new Date() , end_time:new Date()})

  const [formData, setFormData] = useState()
  const [showRooms, setShowRooms] = useState<boolean>(false)

  function FetchAvailableRooms() {
    const [rooms, setRooms] = useState<Room[]>([]);
    
    
      useEffect(() => {
        fetch("/api/rooms")
          .then((res) => res.json())
          .then((data: Room[]) => setRooms(data))
          .catch((err: unknown) => console.error(err));
      }, []);

      return <ul>
        {rooms.map((room) => (
          <li key={room.room_id}>
            {room.room_number} (Capacity: {room.capacity})
          </li>
        ))}
      </ul>
  }

  const HandleSubmitEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()


    const CreateNewBooking: Booking = {
        user_id: newBooking.user_id,
        room_id: newBooking.room_id,
        start_time: newBooking.start_time,
        end_time: newBooking.end_time
     }


     console.log("CREATED NEW BOOKING: ", CreateNewBooking)


  }

  const HandleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target 

    setNewBooking((prev) => ({...prev,
      [name]: value
    }));

  }

  return (
  <>
    <div className="Booking">
      <form onSubmit={HandleSubmitEvent}>
          <fieldset>
              <legend>Your info</legend>
                <label htmlFor="fname">First name:</label><br />
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  onChange={HandleChangeEvent}
                /><br />

                <label htmlFor="lname">Last name:</label><br />
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  onChange={HandleChangeEvent}
                /><br />

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
                
                <button type="button" onClick={() => setShowRooms(true)}>Press to see available rooms</button>

                {showRooms ? (
                  <FetchAvailableRooms/>
                ): <p>button not pressed</p> 
                  
                }

                <button type="submit">Submit</button>

          </fieldset>
      </form>

      <br />
      <section className="SelectRoom">
          

      </section>

    </div>
  </>
);
};

export default BookingComponent;
