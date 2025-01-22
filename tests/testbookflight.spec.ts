import { test } from "@playwright/test";
import { User } from "./POM/utils/data/User";
import { HomeActions } from "./POM/actions/HomeActions";
import { AirfareActions } from "./POM/actions/AirfareActions";
import { CustomizeActions } from "./POM/actions/CustomizeActions";
import { ChairsActions } from "./POM/actions/ChairsActions";
import { PaymentActions } from "./POM/actions/PaymentActions";
import { ConfirmActions } from "./POM/actions/ConfirmActions";
import { TextExpectFromHomePage } from "./POM/utils/data/TextExpectFromHomePage";
import { TextExpectFromAirfarePage } from "./POM/utils/data/TextExpectFromAirfarePage";

let context : any
let page : any 

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://www.wingo.com/");
});

test.afterAll(async ({browser}) =>{
    browser.close()
})

test("book a flight on wingo", async () => {
    const homeActions = new HomeActions(page)
    await homeActions.clickOnFlyButton()
    await homeActions.selectFromDestination()
    await homeActions.clickOnFlyButton()
    await homeActions.selectToDestination()
    await homeActions.selectNumberOfPassanger()
    await homeActions.selectDayOutAndReturnDay() 
    await homeActions.selectLocalCoin();
    let textExpectHomePage = TextExpectFromHomePage.getTextExpect(await homeActions.joinAndReturnDatesOfFlightAndAcronym())
    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        homeActions.clickOnFlightButton(),
    ]);
    page.close()

    const airfareActions = new AirfareActions(newPage);
    const customizeActions = new CustomizeActions(newPage);
    const chairsActions = new ChairsActions(newPage)
    const paymentActions = new PaymentActions(newPage)
    const comfirmActions = new ConfirmActions(newPage)

    await airfareActions.clickOnacceptConditionsToInfantsButton();
    await airfareActions.selectTypeFlights();
    let textExpectAirfarePage = TextExpectFromAirfarePage.getTextExpect(await airfareActions.returnNameOfBundles())
    await airfareActions.checkDatesFlight(textExpectHomePage)
    await airfareActions.clickContinueButton()

    let firstUser = User.generateUser()
    await customizeActions.fillPassangerNamesAndLastnames(firstUser)
    await customizeActions.selectPassagerGenre()
    await customizeActions.selectDateBirthDatePassagers()
    await customizeActions.selectTravelWith()
    await customizeActions.clickCheckboxes()
    await customizeActions.clickOnContinueButton()

    await chairsActions.selectChair()
    await chairsActions.clickOnChairsFlightReturn()
    await chairsActions.selectChair()
    await chairsActions.clickOnContinueButton()

    await paymentActions.clickOnSomeOptionTravelInsurance()
    let paymentMethod = await paymentActions.fillPaymentInfo()
    await paymentActions.clickOnAcceptTerms()
    await paymentActions.checkInforOfFlightToBuyDetials(textExpectHomePage)
    await paymentActions.checkInfoOfBundlesToBuyDetails(textExpectAirfarePage)
    await paymentActions.clickOnPayPopup()
    await paymentActions.clickOnPayContinue()

    if(paymentMethod=="efectivo"){
     await comfirmActions.checkInforOfFlightToBuyDetials(textExpectHomePage)
    await comfirmActions.checkInfoOfUser(firstUser)
    }
    
});
