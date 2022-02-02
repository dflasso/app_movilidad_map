import { useEffect, useState } from "react"

let longitude = 0.0
let latitude = 0.0

export default function CurrentLocationCard() {

    useEffect(() => {
        let idInterval = null
        if ("geolocation" in navigator) {

            navigator.geolocation.getCurrentPosition(function (position) {
                longitude = position.coords.longitude
                latitude = position.coords.latitude
                alert(`${longitude} ${longitude}`)
            })

            setInterval(() => {
                navigator.geolocation.getCurrentPosition(function (position) {

                    longitude = position.coords.longitude
                    latitude = position.coords.latitude
                    alert(`${longitude} ${longitude}`)
                })
            }, 5000)
        }

        return () => { clearInterval(idInterval) }
    }, [])

    return (
        <section>
        </section>
    )
}