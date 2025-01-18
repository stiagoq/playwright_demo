import { expect, Locator, Page } from '@playwright/test';

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

    async clickOnacceptConditionsToInfantsButton(){
        await this.page.waitForTimeout(4000)
        if(await this.acceptConditionsToInfantsButton.isVisible()){
            await this.acceptConditionsToInfantsButton.click()
    }
}


    async selectTypeFlights(){
        await this.page.waitForSelector("//app-container-bundles/div[contains(@class,'card-list-bundle ')]", {state: 'visible'})
        let selectDepartureBundelButton= await this.elementWithDepartureBundleCards.locator("xpath=//child::div[contains(@class,'bundle-container')]//button").all()
        let selectReturnBundelButton = await this.elementWithReturnBundleCards.locator("xpath=//child::div[contains(@class,'bundle-container')]//button").all()
        this.randomNumber = Math.floor(Math.random()* selectDepartureBundelButton.length)
        await selectReturnBundelButton[this.randomNumber].click()
        await selectDepartureBundelButton[this.randomNumber].click()
    }

    async returnNameOfBundles(){
        let textTitleBundles = new Array()
        let textTitleDepartureBundle= await this.elementWithDepartureBundleCards
        .locator("xpath=//child::div//div[contains(@class,'header-titlesBundles')]/div/p[@class='title-bundle']").all()
        let textTitleReturnBundle = await this.elementWithReturnBundleCards
        .locator("xpath=//child::div//div[contains(@class,'header-titlesBundles')]/div/p[@class='title-bundle']").all()
        textTitleBundles.push((await textTitleDepartureBundle[this.randomNumber].innerText()), (await textTitleReturnBundle[this.randomNumber].innerText()))
        return textTitleBundles
    }
    

    async checkDatesFlight(infoOut: string, infoReturn: string){
        await expect(this.textInfoOutFlight).toContainText(infoOut)
        await expect(this.textInfoRetutnFlight).toContainText(infoReturn)
    }

    async clickContinueButton(){
        await this.continueButton.click()
    }
}