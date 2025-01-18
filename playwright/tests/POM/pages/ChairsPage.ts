import { Locator, Page } from '@playwright/test';

export class ChairsPage{
    readonly textChairsFlightOutButton: Locator
    readonly chairsFlightReturnButton : Locator
    readonly sectionBodyAirplane : Locator
    readonly continueButton : Locator
    readonly page : Page

    constructor(page: Page){
        this.textChairsFlightOutButton = page.locator("//div[contains(@class,'ida')]/h3")
        this.chairsFlightReturnButton = page.locator("//div[@class='regreso']/h3[contains(text(),'Vuelo de Regreso')]")
        this.sectionBodyAirplane = page.locator("//article[not(@hidden)]//div[@class='airplane-body']")
        this.continueButton = page.locator("//div[@class='buttons-section-outbound']/button[contains(@class,'btn-continuar') and contains(text(),'Continuar')]")
        this.page = page
    }
    
    async selectChair(){
        await this.textChairsFlightOutButton.waitFor()
        let listChangeChairButtons = await this.page.locator("//article[not(@hidden)]//button[contains(@class,'btn-change-seat')]").all()
        let chairsAvailable = await this.sectionBodyAirplane.locator("xpath=//child::div//a[not(contains(@class,'ND')) and not(contains(@class,'pasillo'))]").all()
        let chairsAvailableWithInfants = await this.sectionBodyAirplane
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
        await this.chairsFlightReturnButton.click()
    }

    async clickOnContinueButton(){
        await this.continueButton.click()
    }
}