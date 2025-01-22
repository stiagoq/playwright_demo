import { Page } from "@playwright/test";
import { ChairsPage } from "../pages/ChairsPage";


export class ChairsActions{
    readonly chairsPage : ChairsPage
    readonly page :  Page

    constructor(page: Page){
        this.chairsPage = new ChairsPage(page)
        this.page = page
    }

    async selectChair(){
        await this.chairsPage.textChairsFlightOutButton.waitFor()
        let listChangeChairButtons = await this.page.locator("//article[not(@hidden)]//button[contains(@class,'btn-change-seat')]").all()
        let chairsAvailable = await this.chairsPage.sectionBodyAirplane.locator("xpath=//child::div//a[not(contains(@class,'ND')) and not(contains(@class,'pasillo'))]").all()
        let chairsAvailableWithInfants = await this.chairsPage.sectionBodyAirplane
        .locator("xpath=child::div[not(contains(@class,'airplane-body-extra'))]//a[not(contains(@class,'ND')) and not(contains(@class,'pasillo'))]").all()
        let iconImageInfant =  this.page.locator("//article[not(@hidden)]//img[contains(@class,'child')]")

        for(let changeChairButton of listChangeChairButtons){
            await changeChairButton.click({delay:1000})
            await chairsAvailableWithInfants[Math.floor(Math.random()*chairsAvailableWithInfants.length)].click()
        }
        // if (await iconImageInfant.isVisible()){
        //     for(let changeChairButton of listChangeChairButtons){
        //         await changeChairButton.click()
        //         await chairsAvailableWithInfants[Math.floor(Math.random()*chairsAvailableWithInfants.length)].click()
        //     }
        // }else{
        //     for(let changeChairButton of listChangeChairButtons){
        //         await changeChairButton.click()
        //         await chairsAvailable[Math.floor(Math.random()*chairsAvailable.length)].click()
        //     }
        // }
    }

    async clickOnChairsFlightReturn(){
        await this.chairsPage.chairsFlightReturnButton.click()
    }

    async clickOnContinueButton(){
        await this.chairsPage.continueButton.click()
    }
}