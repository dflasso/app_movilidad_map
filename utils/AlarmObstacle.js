import { obstaculos } from "../constants/obstaculos";
import { BigNumber } from "bignumber.js";


export function checkObstacles({ originLongitude = 0.0, originLatitude = 0.0 }) {

    let existObstacle = false

    for (let index = 0; index < obstaculos.length; index++) {

        let centerRadiosSquare = new BigNumber(obstaculos[index].Radio_Grados_decimales);
        centerRadiosSquare = centerRadiosSquare.pow(2)

        let numberTenExponentBy10 = new BigNumber('10').exponentiatedBy('10')
        let centerRadiosSquareTenExponentBy10 = centerRadiosSquare.multipliedBy(numberTenExponentBy10)

        // calculo de (x)^2
        let valueX1 = new BigNumber(obstaculos[index].latitud)

        //x2
        let originLatitudAsBigNumber = new BigNumber(originLatitude)
        originLatitudAsBigNumber = originLatitudAsBigNumber.multipliedBy(-1)

        // (x1 - x2)
        valueX1 = valueX1.plus(originLatitudAsBigNumber)
        valueX1 = valueX1.pow(2)

        //----------------------------------
        // calculo de (y)^2
        let valueY1 = new BigNumber(obstaculos[index].longitud)

        //y2
        let originLongitudAsBigNumber = new BigNumber(originLongitude)
        originLongitudAsBigNumber = originLongitudAsBigNumber.multipliedBy(-1)

        // (y1 - y2)^2
        valueY1 = valueY1.plus(originLongitudAsBigNumber)
        valueY1 = valueY1.pow(2)

        //  calculo radio 
        let radio = valueX1.plus(valueY1)
        let radioExponentBy10 = radio.multipliedBy(numberTenExponentBy10)

        /**
         * 1 => mayor
         * 0 => igual
         * -1 => menor
         */
        if (centerRadiosSquare.comparedTo(radio) >= 0 ||
            centerRadiosSquareTenExponentBy10.comparedTo(radioExponentBy10) >= 0) {
            existObstacle = true
            index = obstaculos.length
        }

    }

    return existObstacle
}


export function playAlarmObstacle() {
    const alarmSound = new Audio("/Alarm-Slow-A3.mp3")
    alarmSound.play()

    setTimeout(() => {
        alarmSound.pause()
    }, 3000)
}