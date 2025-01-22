import { Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

export class HomeActions{
    readonly page : Page
    readonly homePage : HomePage
    constructor(page : Page){
        this.homePage = new HomePage(page)
        this.page = page
    }

    async clickOnFlyButton(){
        await this.homePage.flyButton.click()
    }

    async selectFromDestination(){
        await this.homePage.fromDestinationButton.click()
        await this.homePage.fromDestinationInput.fill("Mede")
        await this.homePage.selectfromDestinationButton.waitFor()
        await this.homePage.selectfromDestinationButton.click()
    }

    async selectToDestination(){
        await this.homePage.toDestinationButton.click()
        await this.homePage.toDestinationInput.fill("Santa ")
        await this.homePage.selectToDestinationButton.waitFor()
        await this.homePage.selectToDestinationButton.click()
    }

    async selectNumberOfPassanger(){
        await this.homePage.selectPassengerButton.click()
        let listAddPassengerButton = await this.page.$$("//div[contains(@class,'bts-add')]/div[contains(@class, 'plus')]")
        for(let i = 0 ; i<2; i++){
            await listAddPassengerButton[Math.floor(Math.random() * listAddPassengerButton.length)].click()
        }
    }

    async selectDayOutAndReturnDay(){
        await this.homePage.calendarFromElement.waitFor()
        let listOfDaysValidDayOut = await this.page
        .$$("//div[not(contains(@class,'return-selected')) and contains(@class,'cont-calendar')]//div[@class='month-wrapper']/table//td/div[contains(@class, ' valid')]")
         for(let i in listOfDaysValidDayOut){
            if(await listOfDaysValidDayOut[i].isVisible()){
                this.homePage.listDaysValidAndVisibleButton.push(listOfDaysValidDayOut[i])
            }
        }
        await this.homePage.listDaysValidAndVisibleButton[Math.floor(Math.random() * this.homePage.listDaysValidAndVisibleButton.length)].click()
        this.homePage.listDaysValidAndVisibleButton.length = 0

        await this.homePage.calendarToElement.waitFor()
        let listOfDaysValidReturnDay =  await this.page
        .$$("//div[contains(@class,'return-selected')]//div[@class='month-wrapper']/table//td/div[contains(@class, ' valid')]")

        for(let i in listOfDaysValidReturnDay){
            if(await listOfDaysValidReturnDay[i].isVisible()){
                this.homePage.listDaysValidAndVisibleButton.push(listOfDaysValidReturnDay[i])
            }
        }
        await this.homePage.listDaysValidAndVisibleButton[Math.floor(Math.random() * this.homePage.listDaysValidAndVisibleButton.length)].click()
        let validRepeatDay = (await this.homePage.textDateOut.innerText()) == (await this.homePage.textDateReturn.innerText())
        while (validRepeatDay){
            await this.homePage.dateReturnButton.click()
            await this.homePage.nextCalendarReturnButton.click()
            await this.homePage.listDaysValidAndVisibleButton[Math.floor(Math.random() * this.homePage.listDaysValidAndVisibleButton.length)].click()
            validRepeatDay = (await this.homePage.textDateOut.innerText()) == (await this.homePage.textDateReturn.innerText())
        }
    }

    async clickOnFlightButton(){
        await this.homePage.searchFlightButton.click()
    }

    async returnDateofFlight(){
        let listOfDates = new Array()
        let dateOut = await this.homePage.textDateOut.innerText()
        const [dayDateOut,monthDateOut,yearDateOut] = dateOut.split("/").map(Number)
        const stringValidDateOut = monthDateOut + "/" + dayDateOut + "/" + yearDateOut 
        const dateOutDate : Date = new Date(stringValidDateOut)

        let dateReturn =await this.homePage.textDateReturn.innerText()
        const [dayReturnDate,monthReturnDate,yearReturnDate] = dateReturn.split("/").map(Number)
        const stringValidDateReturn = monthReturnDate + "/" + dayReturnDate + "/" + yearReturnDate
        const dateReturnDate : Date = new Date(stringValidDateReturn)
        
        const weekdayOut = dateOutDate.toLocaleString("es-ES", { weekday: "short" });
        const dayOut = String(dateOutDate.getDate()).padStart(2, "0");
        const monthOut = dateOutDate.toLocaleString("es-ES", { month: "short" });
        const yearOut = dateOutDate.getFullYear();
        const formattedOutDate = `${weekdayOut[0].toUpperCase()}${weekdayOut.slice(1)}, ${dayOut} ${monthOut[0].toUpperCase()}${monthOut.slice(1)}, ${yearOut}`;
        const formattedOutDateToBuyDetials = `${weekdayOut[0].toUpperCase()}${weekdayOut.slice(1)}. ${dayOut} ${monthOut[0].toUpperCase()}${monthOut.slice(1)}.`;

        const weekdayReturn = dateReturnDate.toLocaleString("es-ES", { weekday: "short" });
        const dayReturn = String(dateReturnDate.getDate()).padStart(2, "0");
        const monthReturn = dateReturnDate.toLocaleString("es-ES", { month: "short" });
        const yearReturn = dateReturnDate.getFullYear();
        const formattedReturnDate = `${weekdayReturn[0].toUpperCase()}${weekdayReturn.slice(1)}, ${dayReturn} ${monthReturn[0].toUpperCase()}${monthReturn.slice(1)}, ${yearReturn}`;
        const formattedReturnDateToBuyDetials = `${weekdayReturn[0].toUpperCase()}${weekdayReturn.slice(1)}. ${dayReturn} ${monthReturn[0].toUpperCase()}${monthReturn.slice(1)}.`
        listOfDates.push(formattedOutDate, formattedReturnDate, formattedOutDateToBuyDetials, formattedReturnDateToBuyDetials)
        return listOfDates
    }

    async returnInfoOriginAndDestination(){
        let listOriginAndDestination = new Array()
        let listInfoOrigin =  (await this.homePage.textSelectedOrigin.innerText()).split("(")[0]
        let textOrigin =  await this.homePage.textSelectedOrigin.innerText()
        let acronymOrigin = textOrigin.substring(textOrigin.indexOf("(")+1, textOrigin.indexOf(")"))
        
        let listInfoDestination =  (await this.homePage.textSelectedDestination.innerText()).split("(")[0]
        let textDestination =  await this.homePage.textSelectedDestination.innerText()
        let acronymDestination =  textDestination.substring(textDestination.indexOf("(")+1, textDestination.indexOf(")"))
        listOriginAndDestination.push(`${listInfoOrigin.slice(0,-1)}`, `${listInfoDestination.slice(0,-1)}`, acronymOrigin, acronymDestination)
        return listOriginAndDestination
    }

    async selectLocalCoin(){
        if(!(await this.homePage.selectCoinButton.innerText()).includes("COP")){
            await this.homePage.selectCoinButton.click({delay:1000})
            await this.homePage.coinCopButton.click({delay:500})
        }
    }

}