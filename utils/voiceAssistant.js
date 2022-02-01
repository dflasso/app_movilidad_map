import { clients } from "../middleware";

const clientApp = clients.rest.app

export function playVoiceAssintant({ originLatitude = 0.0, originLongitude = 0.0,
    destinyLatitude = 0.0, destinyLongitude = 0.0 }) {

    clientApp.directions.getOne({
        originLatitude,
        originLongitude,
        destinyLatitude,
        destinyLongitude
    })
        .then(
            data => {
                try {
                    if (data.status === "ZERO_RESULTS") {
                        responsiveVoice.speak("No existen rutas que conecten ambos puntos.", 'Spanish Female')
                    } else {

                        const route = data.routes[0]

                        const steps = route.legs[0].steps

                        let instruction = `${steps[0].html_instructions}`
                        var regex = /(<([^>]+)>)/ig
                        instruction = instruction.replace(regex, "")

                        responsiveVoice.speak(instruction, 'Spanish Female')
                    }

                } catch (error) {
                    responsiveVoice.speak("Ocurrio un error al reproducir direcciones de la ruta.", 'Spanish Female')
                }
            }
        ).catch(
            error => {
                console.log({ error })
                responsiveVoice.speak("Ocurrio un error al obtener las direcciones de la ruta.")
            }
        )
}


export function playVoiceCurrentLocation({ originLatitude = 0.0, originLongitude = 0.0,
    destinyLatitude = 0.0, destinyLongitude = 0.0 }) {

    clientApp.directions.getOne({
        originLatitude,
        originLongitude,
        destinyLatitude,
        destinyLongitude
    })
        .then(
            data => {
                try {
                    if (data.status === "ZERO_RESULTS") {
                        responsiveVoice.speak("Dirección desconocida.", 'Spanish Female')
                    } else {

                        const route = data.routes[0]

                        const address = route.legs[0].end_address

                        responsiveVoice.speak("Ubicación actual,  " + address, 'Spanish Female')
                    }

                } catch (error) {
                    responsiveVoice.speak("Ocurrio un error al reproducir direcciones actual.", 'Spanish Female')
                }
            }
        ).catch(
            error => {
                console.log({ error })
                responsiveVoice.speak("Ocurrio un error al obtener las direcciones actual.")
            }
        )
}