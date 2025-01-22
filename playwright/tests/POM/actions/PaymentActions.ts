import { expect, Page } from "@playwright/test"
import { PaymentPage } from "../pages/PaymentPage"
import { ConstantsData } from "../utils/Constants/ConstansData"
import { RandomData } from "../utils/randomdata/RandomData"
import { TextExpectFromHomePageDTO } from "../utils/models/TextExpectFromHomePageDTO"
import { TextExpectFromAirfarePageDTO } from "../utils/models/TextExpectFromAirfarePageDTO"

export class PaymentActions{
    readonly paymentPage : PaymentPage
    readonly page : Page

    constructor(page: Page){
        this.paymentPage = new PaymentPage(page)
        this.page = page
    }

     async fillPaymentInfo(){
            let listTextPaymentMethod = await this.paymentPage.elementPaymentMethods
            .locator("xpath=//child::div/div/div[contains(@class,'content-title')]/div/label").all()
            const randomNumberToPaymentMethod = RandomData.getRandomNumber(0,listTextPaymentMethod.length)
            await listTextPaymentMethod[randomNumberToPaymentMethod].click({force:true})
            if((await listTextPaymentMethod[randomNumberToPaymentMethod].innerText()).includes("crédito")){
                let numberCard = ConstantsData.arrayNumbersCreditCards[RandomData.getRandomNumber(0, ConstantsData.arrayNumbersCreditCards.length)]
                await this.paymentPage.inputNumberCreditCard.fill(numberCard)
                await this.paymentPage.inputCreditCardAdreess.fill("Adresss")
                await this.paymentPage.inputCreditCardCity.fill("City")
                await this.paymentPage.inputCvvNumber.fill(RandomData.getRandomNumber(500, 800).toString())
                let optionMonths = await this.paymentPage.selectMoth.locator("//child::option").all()
                await this.paymentPage.selectMoth.selectOption(await optionMonths[RandomData.getRandomNumber(1, optionMonths.length)].getAttribute("value"))
                let optionYears = await this.paymentPage.selectYear.locator("//child::option").all()
                await this.paymentPage.selectYear.selectOption(await optionYears[RandomData.getRandomNumber(1, optionYears.length)].getAttribute("value"))
                let optionInstallments = await this.paymentPage.selectInstallments.locator("//child::option").all()
                await this.paymentPage.selectInstallments.selectOption(await optionInstallments[RandomData.getRandomNumber(1, optionInstallments.length)].getAttribute("value"))
                await this.paymentPage.activeContinueButton.click()
                return "credito"
            }
            else if((await listTextPaymentMethod[randomNumberToPaymentMethod].innerText()).includes("PSE")){
                let optionTypePersons = await this.paymentPage.selectPersonType.locator("xpath=//child::option").all()
                await this.paymentPage.selectPersonType.selectOption(await optionTypePersons[RandomData.getRandomNumber(1,optionTypePersons.length)].getAttribute("value"))
                let optionIdTypes = await this.paymentPage.selectIdType.locator("xpath=//child::option").all()
                await this.paymentPage.selectIdType.selectOption(await optionIdTypes[RandomData.getRandomNumber(1,optionIdTypes.length)].getAttribute("value"))
                let optionBanks = await this.paymentPage.selectBank.locator("xpath=//child::option").all()
                await this.paymentPage.selectBank.selectOption(await optionBanks[RandomData.getRandomNumber(1,optionBanks.length)].getAttribute("value"))
                await this.paymentPage.activeContinueButton.click()
                return "PSE"
            }else{
                await this.paymentPage.activeContinueButton.click()
                return "efectivo"
            }
        }
    
        async clickOnAcceptTerms(){
            await this.paymentPage.acceptTermsButton.click()
        }
    
        async clickOnSomeOptionTravelInsurance(){
            await this.paymentPage.textCreditCard.waitFor()
            let listButtons = await this.paymentPage.travelInsuranceElement.locator("button").all()
            await listButtons[1].click()
        }
    
        async checkInforOfFlightToBuyDetials(object: TextExpectFromHomePageDTO){
            let textDateOut = this.paymentPage.elementInfoOutFligt.locator("xpath=//child::div[contains(text(),'.')]")
            await expect(textDateOut).toBeVisible()
            await expect(textDateOut).toContainText(object.getFormatDateOutToBuyDetails())
            let textAcronymOut = this.paymentPage.elementInfoOutFligt.locator("xpath=//child::div[2]/p/span[1]")
            await expect(textAcronymOut).toBeVisible()
            await expect(textAcronymOut).toHaveText(object.getAcronymOut())
    
            let textDateReturn = this.paymentPage.elementInfoReturnFlight.locator("xpath=//child::div[contains(text(),'.')]")
            await expect(textDateReturn).toBeVisible()
            await expect(textDateReturn).toContainText(object.getFormatDateReturnToBuyDetails())
            let textAcronymReturn = this.paymentPage.elementInfoReturnFlight.locator("xpath=//child::div[2]/p/span[1]")
            await expect(textAcronymReturn).toBeVisible()
            await expect(textAcronymReturn).toHaveText(object.getAcronymReturn())
        }

        async checkInfoOfBundlesToBuyDetails(object : TextExpectFromAirfarePageDTO){
            await expect(this.paymentPage.textBundleOutFlight).toHaveText(object.getTextBundleOut())
            await expect(this.paymentPage.textBundleReturnFlight).toHaveText(object.getTextBundleReturn())
        }
    
        async clickOnPayPopup(){
            await this.paymentPage.PayPopupButton.click()
        }
    
        async clickOnPayContinue(){
            await this.paymentPage.payContinueButton.click()
        }
}