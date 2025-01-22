export class TextExpectFromHomePageDTO{
    private formatDateOut: string
    private formatDateReturn: string
    private formatDateOutToBuyDetails : string
    private formatDateReturnToBuyDetails : string
    private cityOrigin : string
    private cityDestination : string
    private acronymOut : string
    private acronymReturn: string

    constructor(formatDateOut:string, formatDateReturn:string, formatDateOutToBuyDetails:string, formatDateReturnToBuyDetails:string, 
        cityOrigin : string, cityDestination : string, acronymOut: string, acronymReturn: string){
        this.formatDateOut = formatDateOut
        this.formatDateReturn = formatDateReturn
        this.formatDateOutToBuyDetails = formatDateOutToBuyDetails
        this.formatDateReturnToBuyDetails = formatDateReturnToBuyDetails
        this.acronymOut = acronymOut
        this.acronymReturn = acronymReturn
        this.cityOrigin = cityOrigin
        this.cityDestination = cityDestination
    }

    public setFormatDateOut(formatDateOut: string){
        this.formatDateOut = formatDateOut
    }

    public getFormatDateOut(){
        return this.formatDateOut 
    }

    public setFormatDateReturn(formatDateReturn: string){
        this.formatDateReturn = formatDateReturn
    }

    public getFormatDateReturn(){
        return this.formatDateReturn 
    }

    public setFormatDateOutToBuyDetails(formatDateOutToBuyDetails: string){
        this.formatDateOutToBuyDetails = formatDateOutToBuyDetails
    }

    public getFormatDateOutToBuyDetails(){
        return this.formatDateOutToBuyDetails 
    }

    public setFormatDateReturnToBuyDetails(formatDateReturnToBuyDetails: string){
        this.formatDateReturnToBuyDetails = formatDateReturnToBuyDetails
    }

    public getFormatDateReturnToBuyDetails(){
        return this.formatDateReturnToBuyDetails 
    }

    public setAcronymOut(acronymOut: string){
        this.acronymOut = acronymOut
    }

    public getAcronymOut(){
        return this.acronymOut 
    }

    public setAcronymReturn(acronymReturn: string){
        this.acronymReturn = acronymReturn
    }

    public getAcronymReturn(){
        return this.acronymReturn 
    }

    public setCityOrigin(cityOrigin: string){
        this.cityOrigin = cityOrigin
    }

    public getCityOrigin(){
        return this.cityOrigin 
    }

    public setCityDestination(cityDestination: string){
        this.cityDestination = cityDestination
    }

    public getCityDestination(){
        return this.cityDestination 
    }

}