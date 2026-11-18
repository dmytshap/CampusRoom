import { useState, useEffect } from 'react';

interface Room {
    room_id: number;
    room_number: string;
    capacity: number;
}

function MainSection() {
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        fetch('/api/rooms')
            .then(res => res.json())
            .then((data: Room[]) => setRooms(data))
            .catch((err: unknown) => console.error(err));
    }, []);

    return (
        <div className='mainSection'>
            <h2>Create Booking</h2>
            <p>press the button to make room booking</p>
            <div className='buttonGroup'>
                <button>Book</button>
                <button>Available rooms</button>
            </div>

            <ul>
                {rooms.map((room) => (
                    <li key={room.room_id}>
                        {room.room_number} (Capacity: {room.capacity})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MainSection;