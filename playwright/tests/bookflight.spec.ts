import { test } from "@playwright/test";
import { HomePage } from "./POM/pages/HomePage";
import { AirfarePage } from "./POM/pages/AirfarePage";
import { CustomizePage } from "./POM/pages/CustomizePage";
import { ChairsPage } from "./POM/pages/ChairsPage";
import { PaymentPage } from "./POM/pages/PaymentPage";
import { User } from "./POM/utils/data/User";
import { ComfirmPage } from "./POM/pages/ComfirmPage";


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
    const homePage = new HomePage(page);

    await homePage.clickOnFlyButton();
    await homePage.selectFromDestination();
    await homePage.clickOnFlyButton();
    await homePage.selectToDestination();
    await homePage.selectNumberofPassanger();
    await homePage.selectDayOutAndReturnDay();
    await homePage.selectLocalCoin();
    textDatesFlights = await homePage.returnDateofFlight();
    textOriginAndDestination = await homePage.returnInfoOriginAndDestination();
    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        homePage.clickOnFlightButton(),
    ]);
    page.close()

    const airfarePage = new AirfarePage(newPage);
    const customizePage = new CustomizePage(newPage);
    const chairsPage = new ChairsPage(newPage)
    const paymentPage = new PaymentPage(newPage)
    const comfirmPage = new ComfirmPage(newPage)

    await airfarePage.clickOnacceptConditionsToInfantsButton();
    await airfarePage.selectTypeFlights();
    let titleBundles = await airfarePage.returnNameOfBundles()
    await airfarePage.checkDatesFlight(
        `${textOriginAndDestination[0]} a ${textOriginAndDestination[1]} -  ${textDatesFlights[0]}`,
        `${textOriginAndDestination[1]} a ${textOriginAndDestination[0]} -  ${textDatesFlights[1]}`
    );
    await airfarePage.clickContinueButton()

    let firstUser = User.generateUser()
    await customizePage.fillPassangerNamesAndLastnames(firstUser.getName(), firstUser.getLastname(), firstUser.getEmail(), firstUser.getDocumentNumber(), firstUser.getPhoneNumber())
    await customizePage.selectPassagerGenre()
    await customizePage.selectDateBirthDatePassagers()
    await customizePage.selectTravelWith()
    await customizePage.clickCheckboxes()
    await customizePage.clickOnContinueButton()

    await chairsPage.selectChair()
    await chairsPage.clickOnChairsFlightReturn()
    await chairsPage.selectChair()
    await chairsPage.clickOnContinueButton()

    await paymentPage.clickOnSomeOptionTravelInsurance()
    let paymentMethod = await paymentPage.fillPaymentInfo()
    await paymentPage.clickOnAcceptTerms()
    await paymentPage.
    checkInforOfFlightToBuyDetials(textDatesFlights[2], textOriginAndDestination[2], textDatesFlights[3], textOriginAndDestination[3], 
        titleBundles[0], titleBundles[1])
    await paymentPage.clickOnPayPopup()
    await paymentPage.clickOnPayContinue()

    if(paymentMethod=="efectivo"){
     await comfirmPage.checkInforOfFlightToBuyDetials(textDatesFlights[2], textOriginAndDestination[2], textDatesFlights[3], textOriginAndDestination[3])
    await comfirmPage.checkInfoOfUser(firstUser.getName(), firstUser.getName(), firstUser.getEmail(), firstUser.getPhoneNumber())
    }
    
});
