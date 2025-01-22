import { expect, Page } from "@playwright/test";
import { ConfirmPage } from "../pages/ConfirmPage";
import { UserDTO } from "../utils/models/UserDTO";
import { TextExpectFromHomePageDTO } from "../utils/models/TextExpectFromHomePageDTO";

export class ConfirmActions{
    readonly confirmPage : ConfirmPage
    readonly page : Page

    constructor(page: Page){
        this.confirmPage = new ConfirmPage(page)
    }

    async checkInforOfFlightToBuyDetials(object: TextExpectFromHomePageDTO){
            await this.confirmPage.textAcronymOutFlight.waitFor({timeout:60000})
            await expect(this.confirmPage.textInfoOfDateOutFlight).toContainText(object.getFormatDateOutToBuyDetails())
            await expect(this.confirmPage.textAcronymOutFlight).toContainText(object.getAcronymOut())
            await expect(this.confirmPage.textInfoOfDateReturnFlight).toContainText(object.getFormatDateReturnToBuyDetails())
            await expect(this.confirmPage.textAcronymReturnFlight).toContainText(object.getFormatDateOutToBuyDetails())
    }
    
    async checkInfoOfUser(object : UserDTO){
        await expect(this.confirmPage.textTitlePage).toContainText(object.getName())
        await expect(this.confirmPage.textPassagerName).toContainText(object.getName())
        await expect(this.confirmPage.textEmailPassager).toContainText(object.getEmail())
        await expect(this.confirmPage.textPhoneNumberPassager).toContainText(object.getPhoneNumber())
    }

}