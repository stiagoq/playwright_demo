import { expect, Page } from "@playwright/test";
import { ConfirmPage } from "../pages/ConfirmPage";

export class ConfirmActions{
    readonly confirmPage : ConfirmPage
    readonly page : Page

    constructor(page: Page){
        this.confirmPage = new ConfirmPage(page)
    }

    async checkInforOfFlightToBuyDetials(dateOut: string, acronymOut: string, dateReturn: string, acronymReturn: string){
            await this.confirmPage.textAcronymOutFlight.waitFor({timeout:60000})
            await expect(this.confirmPage.textInfoOfDateOutFlight).toContainText(dateOut)
            await expect(this.confirmPage.textAcronymOutFlight).toContainText(acronymOut)
            await expect(this.confirmPage.textInfoOfDateReturnFlight).toContainText(dateReturn)
            await expect(this.confirmPage.textAcronymReturnFlight).toContainText(acronymReturn)

    }
    async checkInfoOfUser(titlePage: string, username: string, email:string, phoneNumber:string){
        await expect(this.confirmPage.textTitlePage).toContainText(titlePage)
        await expect(this.confirmPage.textPassagerName).toContainText(username)
        await expect(this.confirmPage.textEmailPassager).toContainText(email)
        await expect(this.confirmPage.textPhoneNumberPassager).toContainText(phoneNumber)
    }

}