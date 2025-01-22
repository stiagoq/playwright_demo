import { Page, Locator } from "@playwright/test";

export class PaymentPage{
    readonly sectionBuyDetails : Locator
    readonly elementInfoOutFligt : Locator
    readonly elementInfoReturnFlight: Locator
    readonly textBundleOutFlight : Locator
    readonly textBundleReturnFlight : Locator
    readonly elementPaymentMethods : Locator
    readonly textCreditCard : Locator
    readonly selectMoth : Locator
    readonly selectYear : Locator
    readonly selectInstallments : Locator
    readonly inputNumberCreditCard: Locator
    readonly activeContinueButton: Locator
    readonly selectPersonType : Locator
    readonly selectIdType : Locator
    readonly selectBank : Locator
    readonly inputCreditCardAdreess : Locator
    readonly inputCreditCardCity : Locator
    readonly inputCvvNumber : Locator
    readonly acceptTermsButton : Locator
    readonly PayPopupButton : Locator
    readonly payContinueButton :Locator
    readonly travelInsuranceElement : Locator
    readonly page : Page

    constructor(page: Page){
        this.elementInfoOutFligt = page.locator("//div[contains(@class,'payment-methods')]//section[contains(@class,'tu-compra-new')]/div[1]/div[2]")
        this.elementInfoReturnFlight = page.locator("//div[contains(@class,'payment-methods')]//section[contains(@class,'tu-compra-new')]/div[1]/div[3]")
        this.sectionBuyDetails = page.locator("//div[contains(@class,'payment-methods')]//section[contains(@class,'tu-compra-new')]")
        this.textBundleOutFlight = page.locator("//div[contains(@class,'payment-methods')]//section[contains(@class,'tu-compra-new')]/div[2]/div[1]/div[2]//p")
        this.elementPaymentMethods = page.locator("//div[contains(@class,'custom-experience')]/div")
        this.textBundleReturnFlight = page.locator("//div[contains(@class,'payment-methods')]//section[contains(@class,'tu-compra-new')]/div[2]/div[1]/div[3]//p")
        this.textCreditCard = page.locator("//label[contains(text(),'Tarjeta de crédito')]")
        this.inputNumberCreditCard = page.locator("//input[@id='TCcardNumber']")
        this.selectMoth = page.locator("//select[@id='month']")
        this.selectYear = page.locator("//select[@id='year']")
        this.activeContinueButton = page.locator("//div[contains(@class,'accordeon-panel') and contains(@class,'active')]//button")
        this.selectPersonType = page.locator("//select[@id='personType']")
        this.selectIdType = page.locator("//select[@id='idType']")
        this.selectBank = page.locator("//select[@id='bank']")
        this.selectInstallments = page.locator("//select[@id='installments']")
        this.inputCreditCardAdreess = page.locator("//input[@id='TCaddress']")
        this.inputCreditCardCity = page.locator("//input[@id='TCcity']")
        this.inputCvvNumber = page.locator("//input[@id='TCsecurityNumber']")
        this.acceptTermsButton = page.locator("//label[@for='acceptTerms']")
        this.PayPopupButton = page.locator("//button[@class='btn-continuar open-popup']")
        this.payContinueButton = page.locator("//div[contains(@class,'w-popup--pagar')]//button[@class='btn-continuar']")
        this.travelInsuranceElement = page.locator("//div[@class='insurance-button']")
        this.page = page
    }

}