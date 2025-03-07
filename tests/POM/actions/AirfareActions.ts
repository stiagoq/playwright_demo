import { Page, expect } from "@playwright/test";
import { AirfarePage } from "../pages/AirfarePage";
import { TextExpectFromHomePageDTO } from "../utils/models/TextExpectFromHomePageDTO";

export class AirfareActions{
    readonly airfarePage : AirfarePage
    readonly page : Page
    public randomNumber : number

    constructor(page : Page){
        this.airfarePage = new AirfarePage(page)
        this.page = page
    }

     async clickOnacceptConditionsToInfantsButton(){
            await this.page.waitForTimeout(4000)
            if(await this.airfarePage.acceptConditionsToInfantsButton.isVisible()){
                await this.airfarePage.acceptConditionsToInfantsButton.click()
            }
        }
    
        async selectTypeFlights(){
            await this.page.waitForSelector("//app-container-bundles/div[contains(@class,'card-list-bundle ')]", {state: 'visible'})
            let selectDepartureBundelButton= await this.airfarePage.elementWithDepartureBundleCards.locator("xpath=//child::div[contains(@class,'bundle-container')]//button").all()
            let selectReturnBundelButton = await this.airfarePage.elementWithReturnBundleCards.locator("xpath=//child::div[contains(@class,'bundle-container')]//button").all()
            this.randomNumber = Math.floor(Math.random()* selectDepartureBundelButton.length)
            await selectReturnBundelButton[this.randomNumber].click()
            await selectDepartureBundelButton[this.randomNumber].click()
        }
    
        async returnNameOfBundles(){
            let textTitleBundles = new Array()
            let textTitleDepartureBundle= await this.airfarePage.elementWithDepartureBundleCards
            .locator("xpath=//child::div//div[contains(@class,'header-titlesBundles')]/div/p[@class='title-bundle']").all()
            let textTitleReturnBundle = await this.airfarePage.elementWithReturnBundleCards
            .locator("xpath=//child::div//div[contains(@class,'header-titlesBundles')]/div/p[@class='title-bundle']").all()
            textTitleBundles.push((await textTitleDepartureBundle[this.randomNumber].innerText()), (await textTitleReturnBundle[this.randomNumber].innerText()))
            return textTitleBundles
        }
        
    
        async checkDatesFlight(object: TextExpectFromHomePageDTO){
            await expect.soft(this.airfarePage.textInfoOutFlight).toHaveText(`${object.getCityOrigin()} a ${object.getCityDestination()} - ${object.getFormatDateOut()}`)
            await expect.soft(this.airfarePage.textInfoRetutnFlight).toHaveText(`${object.getCityDestination()} a ${object.getCityOrigin()} - ${object.getFormatDateReturn()}`)
        }
    
        async clickContinueButton(){
            await this.airfarePage.continueButton.click()
        }
}