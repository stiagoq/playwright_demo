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
    

    async clickOnFlyButton(){
        await this.flyButton.click()
    }

    async selectFromDestination(){
        await this.fromDestinationButton.click()
        await this.fromDestinationInput.fill("Mede")
        await this.selectfromDestinationButton.waitFor()
        await this.selectfromDestinationButton.click()
    }

    async selectToDestination(){
        await this.toDestinationButton.click()
        await this.toDestinationInput.fill("Santa ")
        await this.selectToDestinationButton.waitFor()
        await this.selectToDestinationButton.click()
    }

    async selectNumberofPassanger(){
        await this.selectPassengerButton.click()
        let listAddPassengerButton = await this.page.$$("//div[contains(@class,'bts-add')]/div[contains(@class, 'plus')]")
        for(let i = 0 ; i<2; i++){
            await listAddPassengerButton[Math.floor(Math.random() * listAddPassengerButton.length)].click()
        }
    }

    async selectDayOutAndReturnDay(){
        await this.calendarFromElement.waitFor()
        let listOfDaysValidDayOut = await this.page
        .$$("//div[not(contains(@class,'return-selected')) and contains(@class,'cont-calendar')]//div[@class='month-wrapper']/table//td/div[contains(@class, ' valid')]")
         for(let i in listOfDaysValidDayOut){
            if(await listOfDaysValidDayOut[i].isVisible()){
                this.listDaysValidAndVisibleButton.push(listOfDaysValidDayOut[i])
            }
        }
        await this.listDaysValidAndVisibleButton[Math.floor(Math.random() * this.listDaysValidAndVisibleButton.length)].click()
        this.listDaysValidAndVisibleButton.length = 0

        await this.calendarToElement.waitFor()
        let listOfDaysValidReturnDay =  await this.page
        .$$("//div[contains(@class,'return-selected')]//div[@class='month-wrapper']/table//td/div[contains(@class, ' valid')]")

        for(let i in listOfDaysValidReturnDay){
            if(await listOfDaysValidReturnDay[i].isVisible()){
                this.listDaysValidAndVisibleButton.push(listOfDaysValidReturnDay[i])
            }
        }
        await this.listDaysValidAndVisibleButton[Math.floor(Math.random() * this.listDaysValidAndVisibleButton.length)].click()
        let validRepeatDay = (await this.textDateOut.innerText()) == (await this.textDateReturn.innerText())
        while (validRepeatDay){
            await this.dateReturnButton.click()
            await this.nextCalendarReturnButton.click()
            await this.listDaysValidAndVisibleButton[Math.floor(Math.random() * this.listDaysValidAndVisibleButton.length)].click()
            validRepeatDay = (await this.textDateOut.innerText()) == (await this.textDateReturn.innerText())
        }
        
    }

    async clickOnFlightButton(){
        await this.searchFlightButton.click()
    }

    async returnDateofFlight(){
        let listOfDates = new Array()
        let dateOut = await this.textDateOut.innerText()
        const [dayDateOut,monthDateOut,yearDateOut] = dateOut.split("/").map(Number)
        const stringValidDateOut = monthDateOut + "/" + dayDateOut + "/" + yearDateOut 
        const dateOutDate : Date = new Date(stringValidDateOut)

        let dateReturn =await this.textDateReturn.innerText()
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
        let listInfoOrigin =  (await this.textSelectedOrigin.innerText()).split("(")[0]
        let textOrigin =  await this.textSelectedOrigin.innerText()
        let acronymOrigin = textOrigin.substring(textOrigin.indexOf("(")+1, textOrigin.indexOf(")"))
        
        let listInfoDestination =  (await this.textSelectedDestination.innerText()).split("(")[0]
        let textDestination =  await this.textSelectedDestination.innerText()
        let acronymDestination =  textDestination.substring(textDestination.indexOf("(")+1, textDestination.indexOf(")"))
        listOriginAndDestination.push(`${listInfoOrigin.slice(0,-1)}`, `${listInfoDestination.slice(0,-1)}`, acronymOrigin, acronymDestination)
        return listOriginAndDestination
    }

    async selectLocalCoin(){
        if(!(await this.selectCoinButton.innerText()).includes("COP")){
            await this.selectCoinButton.click({delay:1000})
            await this.coinCopButton.click({delay:500})
        }
    }
}