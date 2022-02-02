import { useEffect, useState } from "react"

export default function CurrentLocationCard() {
    const [coords, setCoords] = useState({
        longitude: 0.0,
        latitude: 0.0
    })

    useEffect(() => {
        let idInterval = null
        if ("geolocation" in navigator) {

            navigator.geolocation.getCurrentPosition(function (position) {
                setCoords({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                })
            })

            setInterval(() => {
                navigator.geolocation.getCurrentPosition(function (position) {
                    setCoords({
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude
                    })
                })
            }, 5000)
        }

        return () => { clearInterval(idInterval) }
    }, [])

    return (
        <section>
            <div>
                <label>Latitud</label>
                <input value={coords.latitude} />
            </div>
            <div>
                <label>Longitud</label>
                <input value={coords.longitude} />
            </div>
        </section>
    )
}