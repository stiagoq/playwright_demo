import { Locator, Page } from '@playwright/test';

export class CustomizePage{
    readonly inputEmail : Locator
    readonly inputEmailConfirm : Locator
    readonly inputPhoneNumber : Locator
    readonly continueButton : Locator
    readonly popupYoungAdult : Locator
    readonly continueBuyCheckbox : Locator
    readonly continuePopupButton : Locator
    readonly page: Page

    constructor(page : Page){
        this.inputEmail = page.locator("//input[@formcontrolname='email']")
        this.inputEmailConfirm = page.locator("//input[@formcontrolname='confirm']")
        this.inputPhoneNumber = page.locator("//input[contains(@class, 'fieldphone')]")
        this.continueButton = page.locator("//div[@class='row']//button[contains(@class,'btn-continuar') and not(contains(@class,'disabled'))]")
        this.popupYoungAdult = page.locator("//div[contains(@class,'paddingForPopUpYoungAdult')]")
        this.continueBuyCheckbox = this.popupYoungAdult.locator("xpath=//child::div/div/label")
        this.continuePopupButton = page.locator("//div[contains(@class,'blockBtnPopUp')]/button[contains(text(),'Continuar') and contains(@class,'wingo-button')]")
        this.page = page
    }

}