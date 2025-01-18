import { UserDTO } from "../models/UserDTO"
import { RandomData } from "./RandomData"

export class User{
    static generateUser(){
        let name = RandomData.getRandomName("User")
        let lastname = RandomData.getRandomName("User")
        let email = RandomData.getRandomEmail("User")
        let documentNumber = RandomData.getRandomNumber(1000000000, 11000000000).toString()
        let phoneNumber = RandomData.getRandomNumber(30000000000, 3110000000).toString()
        return new UserDTO(name,lastname,email,documentNumber, phoneNumber)
    }
}