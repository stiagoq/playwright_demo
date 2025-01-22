export class TextExpectFromAirfarePageDTO{
    private textBundleOut : string
    private textBundleReturn : string

    constructor(textBundleOut: string, textBundleReturn: string){
        this.textBundleOut = textBundleOut
        this.textBundleReturn = textBundleReturn
    }

    public setTextBundleOut(textBundleOut: string){
        this.textBundleOut = textBundleOut
    }

    public getTextBundleOut(){
        return this.textBundleOut 
    }

    public setTextBundleReturnn(textBundleReturn: string){
        this.textBundleReturn = textBundleReturn
    }

    public getTextBundleReturn(){
        return this.textBundleReturn 
    }
}