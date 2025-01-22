import { TextExpectFromAirfarePageDTO } from "../models/TextExpectFromAirfarePageDTO"

export class TextExpectFromAirfarePage{

    static getTextExpect(listTextExpect : any){
        let textBundleOut = listTextExpect[0]
        let textBundleReturn = listTextExpect[1]
        return new TextExpectFromAirfarePageDTO(textBundleOut, textBundleReturn)
    }
}