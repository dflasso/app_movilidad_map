import { getDirections } from "./clientRestApp";

export const clients = {
    rest: {
        app: {
            directions: {
                getOne: getDirections
            }
        }
    }
}