import {Page, Locator } from "@playwright/test"

export class ConfirmPage{
    readonly textInfoOfDateOutFlight : Locator
    readonly textInfoOfDateReturnFlight : Locator
    readonly textAcronymOutFlight : Locator
    readonly textAcronymReturnFlight : Locator
    readonly textTitlePage : Locator
    readonly textPassagerName : Locator
    readonly textEmailPassager : Locator
    readonly textPhoneNumberPassager : Locator

    constructor(page : Page){
        this.textInfoOfDateOutFlight = page
        .locator("//div[contains(@class,'border-gray-detail-flight')]/child::div[contains(@class,'border-gray-detail-flight')][1]//div[1]/p[contains(text(),'M.')]")
        this.textInfoOfDateReturnFlight = page
        .locator("//div[contains(@class,'border-gray-detail-flight')]/child::div[contains(@class,'border-gray-detail-flight')][2]//div[1]/p[contains(text(),'M.')]")
        this.textAcronymOutFlight = page
        .locator("//div[contains(@class,'border-gray-detail-flight')]/child::div[contains(@class,'border-gray-detail-flight')][1]//div[1]/p/span")
        this.textAcronymReturnFlight = page
        .locator("//div[contains(@class,'border-gray-detail-flight')]/child::div[contains(@class,'border-gray-detail-flight')][2]//div[1]/p/span")
        this.textTitlePage = page.locator("//div[contains(@class,'w-confirm ng-star-inserted')]/div/p")
        this.textPassagerName = page.locator("//div[@id='passengers-section']/div[2]/div/div/div[2]")
        this.textEmailPassager = page.locator("//div[@id='passengers-section']/div[2]/div/div/div[4]")
        this.textPhoneNumberPassager = page.locator("//div[@id='passengers-section']/div[2]/div/div/div[5]")
    }
    
}