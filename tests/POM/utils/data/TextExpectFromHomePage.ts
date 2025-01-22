import { TextExpectFromHomePageDTO } from "../models/TextExpectFromHomePageDTO"

export class TextExpectFromHomePage{

    static getTextExpect(listTextExpect : any ){
        let formatDateOut = listTextExpect[0]
        let formatDateReturn = listTextExpect[1]
        let formatDateOutToBuyDetails = listTextExpect[2]
        let formatDateReturnToBuyDetails = listTextExpect[3]
        let cityOrigin= listTextExpect[4] 
        let cityDestination = listTextExpect[5]
        let acronymOut = listTextExpect[6]
        let acronymReturn = listTextExpect[7]
        
        return new TextExpectFromHomePageDTO(formatDateOut,formatDateReturn,formatDateOutToBuyDetails,formatDateReturnToBuyDetails,
            cityOrigin, cityDestination, acronymOut, acronymReturn)
    }
}