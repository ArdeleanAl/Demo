var webdriver = require("selenium-webdriver"),
    By = webdriver.By,
    until = webdriver.until;
var assert = require("assert");

var driver = new webdriver.Builder().forBrowser("chrome").build();
driver.manage().window().maximize();

const TIMEOUT = 10000;
const UrlSettigs = "http://qaexercise.envalfresco.com/settings";
const LoginPage = "http://qaexercise.envalfresco.com/login";
const FilesPage = "http://qaexercise.envalfresco.com/files";
const Username = "guest@example.com";
const Password = "Password";
const GitUsername = "ArdeleanAl"


//Access to http://qaexercise.envalfresco.com/settings
function AccessUrl(url) {
    driver.get(url);
    driver.sleep(500);
}

//Change Provider to ECM
function ChangeProviderToECM() {
    driver.wait(until.elementLocated(By.css('.mat-select-arrow-wrapper')), TIMEOUT);
    driver.findElement(By.css('.mat-select-arrow-wrapper')).click();
    driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'ECM')]")), TIMEOUT).click();
    driver.sleep(500);
}

//Click Apply
function ClickApply() {
    driver.wait(until.elementLocated(By.id('host-button')), TIMEOUT).click();
    driver.sleep(500);
}

//Navigate to http://qaexercise.envalfresco.com/login

//Insert Username and Password
////Username : guest@example.com
////Password : Password
////Click Loginaaa
function InsertUsernameAndPassword(Username, Password) {
    driver.wait(until.elementLocated(By.id('username')), TIMEOUT).sendKeys(Username);
    driver.wait(until.elementLocated(By.id('password')), TIMEOUT).sendKeys(Password);
    driver.sleep(500);
    driver.wait(until.elementLocated(By.id('login-button')), TIMEOUT).click();
    driver.sleep(500);
}


//Navigate to http://qaexercise.envalfresco.com/files


//Click on 'create new folder' icon.
function ClickCreateNewFolder() {
    driver.wait(until.elementLocated(By.xpath("//*[contains(@data-automation-id,'create-new-folder')]")), TIMEOUT).click();
    driver.sleep(500);
}


//New folder dialog is displayed.
function CreateNewFolderDiablog() {

    driver.wait(until.elementLocated(By.className('mat-dialog-title')), TIMEOUT);
    driver.findElement(By.className('mat-dialog-title')).getText().then(function (text) {
        assert.equal(text, 'New folder');
    });
    driver.sleep(500);
}

//Introduce your Github username (for example in my case) "magemello".
//Name has been added.
function SendGitHubUsername(text) {
    driver.wait(until.elementLocated(By.id('adf-folder-name-input'))).sendKeys(text);
    driver.sleep(500);
}

//Click on 'Create' button.
function ClickCreateButton() {
    driver.wait(until.elementLocated(By.id('adf-folder-create-button'))).click();
    driver.sleep(500);
}

//The dialog is closed. Folder with your Github username is created in the current folder.
function DialogIsClosed() {
    try {
        wait.Until(ExpectedConditions.presenceOfElementLocated(By.className('mat-dialog-title')));
        assert.strict.ok(false);
    }
    catch (TimeOutException) {
        assert.strict.ok(true);
    }
    driver.sleep(500);
}

//Search for folder
function FindFolderName() {
    var flag = false;
    driver.findElements(By.css('adf-datatable-row')).then(function (elements) {
        elements.forEach(element => {
            element.getAttribute("aria-label").then(function (elementText) {
                if (GitUsername === elementText)
                    assert.strict.ok(true);

            });
        });
    });
    driver.sleep(500);
}
//Click on 'create new folder' icon.
//New folder dialog is displayed.
//Introduce your Github username (for example in my case) "magemello".
//Name has been added.
//Click on 'Create' button.
//The dialog is not closed.
//The message "There's already a folder with this name. Try a different name" is displayed.
function DialogIsNotClosed() {
    driver.wait(until.elementLocated(By.css('simple-snack-bar span'))).getText().then(function (text) {
        assert.equal(text, "There's already a folder with this name. Try a different name.")
    });
    driver.sleep(500);
}

function ClickCancelButton() {
    driver.wait(until.elementLocated(By.id('adf-folder-cancel-button'))).click();
    driver.sleep(500);
}
//Select the folder with your Github username
function SelectFolderByName(name) {
    var flag = false;
    driver.findElements(By.css('adf-datatable-row')).then(function (elements) {
        elements.forEach(element => {
            element.getAttribute("aria-label").then(function (elementText) {
                if (name === elementText)
                    element.click();
            });
        });
    });
    driver.sleep(500);
}

//Open Options window (3 dots)
function ClickOptionWindow() {
    driver.wait(until.elementLocated(By.xpath("//adf-datatable//adf-datatable-row[contains(@aria-selected,'true')]//button[contains(@title,'Content')]"))).click();
    driver.sleep(500);
}
//Click delete  //button//span[contains(text(),'Delete')]
function ClickDelete() {
    driver.wait(until.elementLocated(By.xpath("//button//span[contains(text(),'Delete')]"))).click();
    driver.sleep(500);
}

//Access SettingPage
AccessUrl(UrlSettigs);
ChangeProviderToECM();
ClickApply();

//Access LoginPage
AccessUrl(LoginPage);
InsertUsernameAndPassword(Username, Password);
AccessUrl(FilesPage);

//Create Folder
ClickCreateNewFolder();
CreateNewFolderDiablog();
SendGitHubUsername(GitUsername);
ClickCreateButton();
DialogIsClosed();
FindFolderName(GitUsername);

//Create the same folder again
ClickCreateNewFolder();
CreateNewFolderDiablog();
SendGitHubUsername(GitUsername);
ClickCreateButton();
DialogIsNotClosed();
ClickCancelButton();

//Delete Created folder
SelectFolderByName(GitUsername)
ClickOptionWindow();
ClickDelete();

//killBrowser
driver.sleep(1000);
driver.quit();