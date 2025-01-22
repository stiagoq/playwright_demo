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
    
}