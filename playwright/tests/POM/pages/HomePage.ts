import { Locator, Page } from '@playwright/test';

export class HomePage{
    readonly flyButton: Locator
    readonly fromDestinationList: Locator
    readonly fromDestinationButton: Locator
    readonly fromDestinationInput: Locator
    readonly selectfromDestinationButton: Locator
    readonly toDestinationList: Locator
    readonly toDestinationButton: Locator
    readonly toDestinationInput: Locator
    readonly selectToDestinationButton: Locator
    readonly selectPassengerButton: Locator
    readonly calendarFromElement: Locator
    readonly calendarToElement: Locator
    readonly dateReturnButton: Locator
    readonly nextCalendarReturnButton: Locator
    readonly searchFlightButton: Locator
    readonly textDateOut: Locator
    readonly textDateReturn: Locator
    readonly textSelectedOrigin: Locator
    readonly textSelectedDestination: Locator
    readonly selectCoinButton : Locator
    readonly coinCopButton : Locator
    readonly page: Page
    readonly listDaysValidAndVisibleButton: any
    

    constructor(page : Page){
        this.flyButton = page.locator("//a[@id='linkIbe']")
        this.fromDestinationList = page.locator("//span[contains(text(),'Desde')]/following-sibling::div[@class='select']")
        this.fromDestinationButton = this.fromDestinationList.locator("div")
        this.fromDestinationInput = this.fromDestinationList.locator("input")
        this.selectfromDestinationButton= this.fromDestinationList.locator("ul > li")
        this.toDestinationList = page.locator("//span[contains(text(),'Hacia')]/following-sibling::div[@class='select']")
        this.toDestinationButton = this.toDestinationList.locator("div")
        this.toDestinationInput = this.toDestinationList.locator("input")
        this.selectToDestinationButton= this.toDestinationList.locator("ul > li")
        this.selectPassengerButton = page.locator("//div[@id='selectPasj']/div/div")
        this.calendarFromElement = page.locator("//div[contains(@id,'btBalendarFrom')]/following-sibling::div")
        this.calendarToElement = page.locator("//div[contains(@id,'btBalendarTo')]/following-sibling::div")
        this.dateReturnButton = page.locator("//div[contains(@class,'select-drop-regreso')]/div")
        this.nextCalendarReturnButton = page.locator("//div[contains(@class,'return-selected') and contains(@class,'cont-calendar')]//span[@class='next']")
        this.listDaysValidAndVisibleButton = new Array()
        this.searchFlightButton = page.locator("//div[contains(@class,'btn-search') and not(contains(@class,'disabled'))]")
        this.textDateOut = page.locator("//div[contains(@class,'info-airport-ida')]/div/span[contains(@class,'start')]")
        this.textDateReturn = page.locator("//div[contains(@class,'info-airport-regreso')]/div/span[contains(@class,'end')]")
        this.textSelectedOrigin = page.locator("//div[contains(@class,'SelectOrigen')]")
        this.textSelectedDestination = page.locator("//div[contains(@class,'SelectDestino')]")
        this.selectCoinButton = page.locator("//div[contains(@class,'styledSelectMoneda')]")
        this.coinCopButton = page.locator("//ul[contains(@class,'optionsMoneda')]/li[contains(text(),'COP')]")
        this.page =page
    }

}