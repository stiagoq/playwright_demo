import { test } from "@playwright/test";
import { User } from "./POM/utils/data/User";
import { HomeActions } from "./POM/actions/HomeActions";
import { AirfareActions } from "./POM/actions/AirfareActions";
import { CustomizeActions } from "./POM/actions/CustomizeActions";
import { ChairsActions } from "./POM/actions/ChairsActions";
import { PaymentActions } from "./POM/actions/PaymentActions";
import { ConfirmActions } from "./POM/actions/ConfirmActions";


let context : any
let page : any 
let textDatesFlights: any;
let textOriginAndDestination: any;

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
    textDatesFlights = await homeActions.returnDateofFlight();
    textOriginAndDestination = await homeActions.returnInfoOriginAndDestination();
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
    let titleBundles = await airfareActions.returnNameOfBundles()
    await airfareActions.checkDatesFlight(
        `${textOriginAndDestination[0]} a ${textOriginAndDestination[1]} -  ${textDatesFlights[0]}`,
        `${textOriginAndDestination[1]} a ${textOriginAndDestination[0]} -  ${textDatesFlights[1]}`
    );
    await airfareActions.clickContinueButton()

    let firstUser = User.generateUser()
    await customizeActions.fillPassangerNamesAndLastnames(firstUser.getName(), firstUser.getLastname(), firstUser.getEmail(), firstUser.getDocumentNumber(), firstUser.getPhoneNumber())
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
    await paymentActions.
    checkInforOfFlightToBuyDetials(textDatesFlights[2], textOriginAndDestination[2], textDatesFlights[3], textOriginAndDestination[3], 
        titleBundles[0], titleBundles[1])
    await paymentActions.clickOnPayPopup()
    await paymentActions.clickOnPayContinue()

    if(paymentMethod=="efectivo"){
     await comfirmActions.checkInforOfFlightToBuyDetials(textDatesFlights[2], textOriginAndDestination[2], textDatesFlights[3], textOriginAndDestination[3])
    await comfirmActions.checkInfoOfUser(firstUser.getName(), firstUser.getName(), firstUser.getEmail(), firstUser.getPhoneNumber())
    }
    
});
