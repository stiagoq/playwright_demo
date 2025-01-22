import { Locator, Page } from '@playwright/test';

export class AirfarePage{
    readonly acceptConditionsToInfantsButton: Locator
    readonly textInfoOutFlight: Locator
    readonly textInfoRetutnFlight: Locator
    readonly elementWithReturnBundleCards : Locator
    readonly elementWithDepartureBundleCards : Locator
    readonly continueButton: Locator
    readonly page: Page
    public randomNumber : number

    constructor(page: Page){
        this.acceptConditionsToInfantsButton = page.locator("//button[contains(text(),' Entiendo y acepto las condiciones')]")
        this.textInfoOutFlight = page.locator("//app-leg-conatiner[@id='departure-leg']/div/section/div/div/p[@class='mt-1']")
        this.textInfoRetutnFlight = page.locator("//app-leg-conatiner[@id='return-leg']/div/section/div/div/p[@class='mt-1']")
        this.elementWithReturnBundleCards = page.locator("//app-fligths-selection[@id='return-fligth']")
        this.elementWithDepartureBundleCards = page.locator("//app-fligths-selection[@id='departure-fligth']")
        this.continueButton = page.locator("//div[@class='continue']/button[contains(@class,'btn-continuar') and not(contains(@class,'disabled'))]")
        this.page = page
    }

}