import { Page } from "@playwright/test";
import { CustomizePage } from "../pages/CustomizePage";
import { RandomData } from "../utils/data/RandomData";

export class CustomizeActions{
    readonly customizePage : CustomizePage
    readonly page : Page

    constructor(page: Page){
        this.customizePage = new CustomizePage(page)
        this.page = page
    }

    async fillPassangerNamesAndLastnames(name:string, lastname:string, email:string, documentNumber:string, phoneNumber:string){
            await this.page.waitForSelector("//label[@for='name-1-1']", { state: 'visible' });
            let listNameInputs = await this.page.$$("//input[contains(@name,'name-') and @formcontrolname='firstName']")
            let listLastNameInputs = await this.page.$$("//input[contains(@name,'lastname-') and @formcontrolname='lastName']")
            let listNumberDocument = await this.page.$$("//input[@formcontrolname='identification']")
            await this.customizePage.inputEmail.fill(email)
            await this.customizePage.inputEmailConfirm.fill(email)
            await this.customizePage.inputPhoneNumber.fill(phoneNumber)
            for (let i = 0; i < listNameInputs.length; i++){
                if(i==0){
                    await listNameInputs[i].fill(name)
                    await listLastNameInputs[i].fill(lastname)
                }else{
                    await listNameInputs[i].fill(RandomData.getRandomName("User"))
                    await listLastNameInputs[i].fill(RandomData.getRandomName("User"))
                }
            }
    
            for(let i = 0; i<listNumberDocument.length; i++){
                if(i == 0 ){
                    await listNumberDocument[i].fill(documentNumber)
                }else{
                    await listNumberDocument[i].fill(RandomData.getRandomNumber(3000000000, 311000000).toString())
                }
            }
        }
    
        async clickCheckboxes(){
            let listCheckBoxes = await this.page.locator("//div[@class='row sm-gutter']/div[contains(@class,'wingo-checbox-asistencia')]/label").all()
            for(let checbox of listCheckBoxes){
                await checbox.click()
            }
        }
    
        async selectPassagerGenre(){
            let listSexSelect = await this.page.$$("//select[contains(@id,'sex-input-')]")
            for (let i of listSexSelect){
                await i.selectOption("M")
            }
        }
    
        async selectDateBirthDatePassagers(){
            let listCardPassagers = await this.page.locator("//div[contains(@class,'card card-passenger')]").all()
            for(let card of listCardPassagers){
                let cardTitleText = await card.locator("xpath=//child::app-adult/app-header/div/div[contains(@class,'card-passenger-header-title')]").innerText()
                let selectYear = card.locator("xpath=//child::app-adult//form/select[@name='year']")
                let selectMonth = card.locator("xpath=//child::app-adult//form/select[@name='month']")
                let selectDay = card.locator("xpath=//child::app-adult//form/select[@name='day']")
                if(cardTitleText.includes("Adulto")){
                    await selectYear.selectOption(RandomData.getRandomNumber(2012, 1990).toString())
                }else if(cardTitleText.includes("Niño")){
                    await selectYear.selectOption(RandomData.getRandomNumber(2022, 2013).toString()) 
                }else{
                    await selectYear.selectOption(RandomData.getRandomNumber(2024, 2025).toString())
                }
                await selectMonth.selectOption(RandomData.getRandomNumber(2, 12).toString())
                await selectDay.selectOption(RandomData.getRandomNumber(2, 30).toString())
            }
        }
    
        async selectTravelWith(){
            let listCardPassagers = await this.page.locator("//div[contains(@class,'card card-passenger')]").all()
            for(let card of listCardPassagers){
                let cardTitleText = await card.locator("xpath=//child::app-adult/app-header/div/div[contains(@class,'card-passenger-header-title')]").innerText()
                if(cardTitleText.includes("Infante") || cardTitleText.includes("Niño")){
                    let travelWithButton = card.locator("xpath=//child::app-adult//div[contains(text(),'Viaja')]")
                    await travelWithButton.click()
                    let listOptionTravelWith = await card.locator("xpath=//child::app-adult//ul/li").all()
                    await listOptionTravelWith[Math.floor(Math.random() * listOptionTravelWith.length)].click()
                }
            }
        }
    
        async clickOnContinueButton(){
            await this.customizePage.continueButton.waitFor({state:'visible'})
            await this.customizePage.continueButton.click({delay: 1000})
            
            if(await this.customizePage.popupYoungAdult.isVisible()){
                await this.customizePage.continueBuyCheckbox.click()
                await this.customizePage.continuePopupButton.click()
            }
        }
}