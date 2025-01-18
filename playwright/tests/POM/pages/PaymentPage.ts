import { Page, Locator, expect } from "@playwright/test";
import { RandomData } from "../utils/data/RandomData";
import { ConstantsData } from "../utils/Constants/ConstansData";

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

    async fillPaymentInfo(){
        let listTextPaymentMethod = await this.elementPaymentMethods.locator("xpath=//child::div/div/div[contains(@class,'content-title')]/div/label").all()
        const randomNumberToPaymentMethod = RandomData.getRandomNumber(0,listTextPaymentMethod.length)
        await listTextPaymentMethod[0].click({force:true})
        if((await listTextPaymentMethod[0].innerText()).includes("crédito")){
            let numberCard = ConstantsData.arrayNumbersCreditCards[RandomData.getRandomNumber(0, ConstantsData.arrayNumbersCreditCards.length)]
            await this.inputNumberCreditCard.fill(numberCard)
            await this.inputCreditCardAdreess.fill("Adresss")
            await this.inputCreditCardCity.fill("City")
            await this.inputCvvNumber.fill(RandomData.getRandomNumber(500, 800).toString())
            let optionMonths = await this.selectMoth.locator("//child::option").all()
            await this.selectMoth.selectOption(await optionMonths[RandomData.getRandomNumber(1, optionMonths.length)].getAttribute("value"))
            let optionYears = await this.selectYear.locator("//child::option").all()
            await this.selectYear.selectOption(await optionYears[RandomData.getRandomNumber(1, optionYears.length)].getAttribute("value"))
            let optionInstallments = await this.selectInstallments.locator("//child::option").all()
            await this.selectInstallments.selectOption(await optionInstallments[RandomData.getRandomNumber(1, optionInstallments.length)].getAttribute("value"))
            await this.activeContinueButton.click()
            return "credito"
        }
        else if((await listTextPaymentMethod[randomNumberToPaymentMethod].innerText()).includes("PSE")){
            let optionTypePersons = await this.selectPersonType.locator("xpath=//child::option").all()
            await this.selectPersonType.selectOption(await optionTypePersons[RandomData.getRandomNumber(1,optionTypePersons.length)].getAttribute("value"))
            let optionIdTypes = await this.selectIdType.locator("xpath=//child::option").all()
            await this.selectIdType.selectOption(await optionIdTypes[RandomData.getRandomNumber(1,optionIdTypes.length)].getAttribute("value"))
            let optionBanks = await this.selectBank.locator("xpath=//child::option").all()
            await this.selectBank.selectOption(await optionBanks[RandomData.getRandomNumber(1,optionBanks.length)].getAttribute("value"))
            await this.activeContinueButton.click()
            return "PSE"
        }else{
            await this.activeContinueButton.click()
            return "efectivo"
        }
    }

    async clickOnAcceptTerms(){
        await this.acceptTermsButton.click()
    }

    async clickOnSomeOptionTravelInsurance(){
        await this.textCreditCard.waitFor()
        let listButtons = await this.travelInsuranceElement.locator("button").all()
        await listButtons[RandomData.getRandomNumber(0,2)].click()
    }

    async checkInforOfFlightToBuyDetials(dateOut: string, acronymOut: string, dateReturn: string, acronymReturn: string, bundleOut : string, bundleReturn: string){
        let textDateOut = this.elementInfoOutFligt.locator("xpath=//child::div[contains(text(),'.')]")
        await expect(textDateOut).toContainText(dateOut)
        let textAcronymOut = this.elementInfoOutFligt.locator("xpath=//child::div[2]/p/span[1]")
        await expect(textAcronymOut).toContainText(acronymOut)

        let textDateReturn = this.elementInfoReturnFlight.locator("xpath=//child::div[contains(text(),'.')]")
        await expect(textDateReturn).toContainText(dateReturn)
        let textAcronymReturn = this.elementInfoReturnFlight.locator("xpath=//child::div[2]/p/span[1]")
        await expect(textAcronymReturn).toContainText(acronymReturn)

        await expect(this.textBundleOutFlight).toContainText(bundleOut)
        await expect(this.textBundleReturnFlight).toContainText(bundleReturn)
    }

    async clickOnPayPopup(){
        await this.PayPopupButton.click()
    }

    async clickOnPayContinue(){
        await this.payContinueButton.click()
    }
    

}