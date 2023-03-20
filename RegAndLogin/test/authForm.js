const { expect } = require(`chai`);
const { Builder, By, until } = require(`selenium-webdriver`);

async function fillForm(email, password) {
    await driver.findElement(By.id(`login-email`)).sendKeys(email);
    await driver.findElement(By.id(`login-password`)).sendKeys(password);
}

describe(`Позитивные сценарии`, async function() {
    const url = `http://82.202.214.42/login`
    const loginBtn = By.className(`btn--white`)
    it(`Авторизация с данными зарегистрированного пользователя`, async function() {
        //переменные
        const email = `test@skillbox.ru`
        const password = `Qwerty!@#321`
        //open page
        await driver.get(url)
        //actions
        await fillForm(email, password,)
        await driver.findElement(loginBtn).click();
        // asserts
        try {
            await driver.wait(until.elementLocated(By.css(".main-layout__header")), 2000) // проверка на наличие хеддера
        } catch {
            throw Error(`Авторизация с валидными данными`)
        }
        
    })
})

describe(`Негативные сценарии`, async function() {
    const url = `http://82.202.214.42/login`
    it(`Авторизация с данными не существующего пользователя`, async function() {
        //переменные
        const email = `test@skill123box.ru`
        const password = `Qwerty#321`
        //open page
        await driver.get(url);
        //actions
        fillForm(email, password,)
        await driver.findElement(loginBtn).click();
        // asserts

        try { // проверка на наличие хеддера
            await driver.wait(until.elementLocated(By.css(".main-layout__header")), 2000)
            throw Error(`Авторизация с невалидными данными`)
        } catch {}
    })
    
    it(`Авторизация без ввода пароля`, async function() {
        //переменные
        const email = `test@skillbox.ru`
        const password = ``
        //open page
        await driver.get(url);
        //actions
        fillForm(email, password,)
        await driver.findElement(loginBtn).click();
        // asserts
        const errorText = await driver.findElement(By.className(`form__error`)).getText()
        expect(errorText).to.be.equal(`Введите пароль`, `отсутствует сообщение о пустом поле пароль`) // проверка текста ошибки
        
    })
    
    it(`Авторизация без ввода email`, async function() {
        //переменные
        const email = ``
        const password = `Qwerty!@#321`
        //open page
        await driver.get(url);
        //actions
        fillForm(email, password,)
        await driver.findElement(loginBtn).click();
        // asserts
        const errorText = await driver.findElement(By.className(`form__error`)).getText()
        expect(errorText).to.be.equal(`Введите Email`, `отсутствует сообщение о пустом поле email`) // проверка текста ошибки
        
    })
    
    it(`Авторизация с невалидным email`, async function() {
        //переменные
        const email = `teпочта@skillbox.ru`
        const password = `Qwerty!@#321`
        //open page
        await driver.get(url);
        //actions
        fillForm(email, password,)
        await driver.findElement(loginBtn).click();
        // asserts
        const errorText = await driver.findElement(By.className(`form__error`)).getText()
        expect(errorText).to.be.equal(`Введите корректный Email`, `отсутствует сообщение о вводе невалидного значения email`) // проверка текста ошибки
        
    })
    
    it(`Авторизация с пробелами в поле пароль`, async function() {
        //переменные
        const email = `test@skillbox.ru`
        const password = `Qwerty!@#321`
        //open page
        await driver.get(url);
        //actions
        fillForm(email, password,)
        await driver.findElement(loginBtn).click()
        await driver.findElement(loginBtn).click()
        // asserts
        try {
            await driver.wait(until.elementLocated(By.css(".main-layout__header")), 2000)    
        } catch {
            throw Error(`Не удаляются пробелы перед данными в поле пароль`)    
        }

    })
    
    it(`Авторизация с пробелами в поле email`, async function() {
        //переменные
        const email = `   test@skillbox.ru   `
        const password = `Qwerty!@#321`
        //open page
        await driver.get(url);
        //actions
        fillForm(email, password,)
        await driver.findElement(loginBtn).click();
        // asserts
        try {
            await driver.wait(until.elementLocated(By.css(".main-layout__header")), 2000)
        } catch {
            throw Error(`Не удаляются пробелы перед данными в поле Email`)
        }
    })
})