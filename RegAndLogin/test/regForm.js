const { expect } = require(`chai`);
const { Builder, By, until } = require(`selenium-webdriver`);

async function fillTheForm(email, password, repeatPassword, name, surname) {
    await driver.findElement(By.id(`register-email`)).sendKeys(email)
    await driver.findElement(By.id(`register-password`)).sendKeys(password)
    await driver.findElement(By.id(`register-repeat-password`)).sendKeys(repeatPassword)
    await driver.findElement(By.id(`register-firstName`)).sendKeys(name)
    await driver.findElement(By.id(`register-lastName`)).sendKeys(surname)
}

describe(`Позитивные проверки формы регистрации`, async function() {
    it(`Регистрация в валидными данными`, async function() {
        //variables
        const email = `test@mail.com`
        const password = `Rthsdfj#@!1`
        const repeatPassword = `Rthsdfj#@!1`
        const name = `Auto`
        const surname = `Test`

        //open page
        await driver.get(`http://82.202.214.42/registration`);

        // actions
        fillTheForm(email, password, repeatPassword, name, surname)
        await driver.findElement(By.css(".form__checkbox-label")).click()
        await driver.findElement(By.className(`btn--white`)).click()

        //asserts
        const successfulRegistrationTitle = await driver.findElement(By.className(`form-layout__title`)).getText()
        expect(await successfulRegistrationTitle).to.be.equal(`Вы зарегистрированы!`, `Пользователь не зарегистрирован`)
    })
    
    it(`Регистрация c личными данными на латиннице`, async function() {
        //variables
        const email = `test@mail.com`
        const password = `Rthsdfj#@!1`
        const repeatPassword = `Rthsdfj#@!1`
        const name = `Auto`
        const surname = `Test`

        //open page
        await driver.get(`http://82.202.214.42/registration`);

        // actions
        fillTheForm(email, password, repeatPassword, name, surname)
        await driver.findElement(By.css(".form__checkbox-label")).click()
        await driver.findElement(By.className(`btn--white`)).click()

        //asserts
        const successfulRegistrationTitle = await driver.findElement(By.className(`form-layout__title`)).getText()
        expect(await successfulRegistrationTitle).to.be.equal(`Вы зарегистрированы!`, `Пользователь не зарегистрирован`)
    })
})

describe("Негативные сценарии проверки формы регистрации", async function() {
    
    it(`Регистрация c уже использованным email`, async function() {
        //variables
        const email = `test@mail.com`
        const password = `Rthsdfj#@!1`
        const repeatPassword = `Rthsdfj#@!1`
        const name = `Auto`
        const surname = `Test`

        //open page
        await driver.get(`http://82.202.214.42/registration`);

        // actions
        fillTheForm(email, password, repeatPassword, name, surname)
        await driver.findElement(By.css(".form__checkbox-label")).click()
        await driver.findElement(By.className(`btn--white`)).click()

        //asserts
        const successfulRegistrationTitle = await driver.findElement(By.className(`form-layout__title`)).getText()
        expect(await successfulRegistrationTitle).not.to.be.equal(`Вы зарегистрированы!`, `Пользователь зарегистрирован`)
    })
    
    it("Регистрация пользователя без заполнения обязательных полей", async function() {
        //variables
        const email = ``
        const password = `Rthsdfj#@!1`
        const repeatPassword = `Rthsdfj#@!1`
        const name = ``
        const surname = ``

        //open page
        await driver.get(`http://82.202.214.42/registration`);

        // actions
        fillTheForm(email, password, repeatPassword, name, surname)
        await driver.findElement(By.css(".form__checkbox-label")).click()
        await driver.findElement(By.className(`btn--white`)).click()

        //asserts
        const successfulRegistrationTitle = await driver.findElement(By.className(`form-layout__title`)).getText()
        expect(await successfulRegistrationTitle).not.to.be.equal(`Вы зарегистрированы!`, `пользователь зарегистрирован`)

        //проверка выделения обязательных незаполненных полей 
        //email error
        const emailFieldErrorText = await driver.findElement(By.css(".form__block:nth-child(1) > .form__group:nth-child(2) > .form__error")).getText();
        expect(emailFieldErrorText).to.be.equal(`Введите Email`, `Отсутствует сообщение о незаполненом поле email`)
        //name error
        const nameFieldErrorText = await driver.findElement(By.css(".form__block:nth-child(2) > .form__group:nth-child(2) > .form__error")).getText();
        expect(nameFieldErrorText).to.be.equal(`Обязательное поле`, `Отсутствует сообщение о незаполненом поле имя`)
        //surname error
        const surnameFieldErrorText = await driver.findElement(By.css(".form__block:nth-child(2) > .form__group:nth-child(3) > .form__error")).getText();
        expect(surnameFieldErrorText).to.be.equal(`Обязательное поле`, `Отсутствует сообщение о незаполненом поле фамилия`)
        }

    )
    
    it("Регистрация с невалидным email", async function() {
        //variables
        const email = `test.mail.ru`
        const password = `Qwerty!@#321`
        const repeatPassword = `Qwerty!@#321`
        const name = `Тестовый`
        const surname = `Профиль`

        //open page
        await driver.get(`http://82.202.214.42/registration`);

        // actions
        fillTheForm(email, password, repeatPassword, name, surname)
        await driver.findElement(By.css(".form__checkbox-label")).click()
        await driver.findElement(By.className(`btn--white`)).click()

        //asserts
        const successfulRegistrationTitle = await driver.findElement(By.className(`form-layout__title`)).getText()
        expect(await successfulRegistrationTitle).not.to.be.equal(`Вы зарегистрированы!`, `пользователь зарегистрирован`)

        //проверка текста ошибки у поля email
        let errorMessege = await driver.findElement(By.css(".form__block:nth-child(1) > .form__group:nth-child(2) > .form__error")).getText()
        expect(errorMessege).to.be.equal(`Введите корректный Email`, `текст ошибки заполнения поля email`)
    })

    it("Регистрация с невалидным паролем", async function() {
        //variables
        const email = `test.mail.ru`
        const password = `123фывфыв`
        const repeatPassword = `123фывфыв`
        const name = `Тестовый`
        const surname = `Профиль`

        //open page
        await driver.get(`http://82.202.214.42/registration`);

        // actions
        fillTheForm(email, password, repeatPassword, name, surname)
        await driver.findElement(By.css(".form__checkbox-label")).click()
        await driver.findElement(By.className(`btn--white`)).click()

        //asserts
        const successfulRegistrationTitle = await driver.findElement(By.className(`form-layout__title`)).getText()
        expect(await successfulRegistrationTitle).not.to.be.equal(`Вы зарегистрированы!`, `пользователь зарегистрирован`)
    })
    
    it("Регистрация пользователя с не совпадающими паролями", async function() {
        //variables
        const email = `test@mail.ru`
        const password = `Qwerty!@#123`
        const repeatPassword = `Qwerty!@#321`
        const name = `Тестовый`
        const surname = `Профиль`

        //open page
        await driver.get(`http://82.202.214.42/registration`);

        // actions
        fillTheForm(email, password, repeatPassword, name, surname)
        await driver.findElement(By.css(".form__checkbox-label")).click()
        await driver.findElement(By.className(`btn--white`)).click()

        //asserts
        const successfulRegistrationTitle = await driver.findElement(By.className(`form-layout__title`)).getText()
        expect(await successfulRegistrationTitle).not.to.be.equal(`Вы зарегистрированы!`, `пользователь зарегистрирован`)

        //проверка текста ошибки при разных паролях
        let errorMessege = await driver.findElement(By.css(".form__error:nth-child(3)")).getText()
        console.log(`get123test ${errorMessege}`)
        expect(errorMessege).not.to.be.equal(`Пароли должны совпадать`, `Не совпадает текст ошибки при разных значениях в поле пароль и подтверждение`)
    })
    
    it("Регистрация пользователя с спецсимволами и цифрами в поле `имя`", async function() {
        //variables
        const email = `test@mail.ru`
        const password = `Qwerty!@#321`
        const repeatPassword = `Qwerty!@#321`
        const name = `Те#$@!стовый`
        const surname = `Профиль`

        //open page
        await driver.get(`http://82.202.214.42/registration`);

        // actions
        fillTheForm(email, password, repeatPassword, name, surname)
        await driver.findElement(By.css(".form__checkbox-label")).click()
        await driver.findElement(By.className(`btn--white`)).click()

        //asserts
        const successfulRegistrationTitle = await driver.findElement(By.className(`form-layout__title`)).getText()
        expect(await successfulRegistrationTitle).not.to.be.equal(`Вы зарегистрированы!`, `пользователь зарегистрирован`)


    })
    
    it("Регистрация пользователя с спецсимволами и цифрами в поле `фамилия`", async function() {
        //variables
        const email = `test@mail.ru`
        const password = `Qwerty!@#321`
        const repeatPassword = `Qwerty!@#321`
        const name = `Тестовый`
        const surname = `Проф123$#@!иль`

        //open page
        await driver.get(`http://82.202.214.42/registration`);

        // actions
        fillTheForm(email, password, repeatPassword, name, surname)
        await driver.findElement(By.css(".form__checkbox-label")).click()
        await driver.findElement(By.className(`btn--white`)).click()

        //asserts
        const successfulRegistrationTitle = await driver.findElement(By.className(`form-layout__title`)).getText()
        expect(await successfulRegistrationTitle).not.to.be.equal(`Вы зарегистрированы!`, `пользователь зарегистрирован`)
        //проверка текста ошибки у поля имя
        let errorMessege = await driver.findElement(By.css(".form__block:nth-child(2) > .form__group:nth-child(3) > .form__error")).getText()
        expect(errorMessege).to.be.equal(`Введите корректную фамилию`, `текст ошибки заполнения поля фамилия`)
        
    })
    
    it("Регистрация без ввода данных", async function() {
        //variables
        const email = ``
        const password = ``
        const repeatPassword = ``
        const name = ``
        const surname = ``

        //open page
        await driver.get(`http://82.202.214.42/registration`);

        // actions
        fillTheForm(email, password, repeatPassword, name, surname)
        await driver.findElement(By.css(".form__checkbox-label")).click()
        await driver.findElement(By.className(`btn--white`)).click()

        //asserts
            const successfulRegistrationTitle = await driver.findElement(By.className(`form-layout__title`)).getText()
            expect(await successfulRegistrationTitle).not.to.be.equal(`Вы зарегистрированы!`, `пользователь зарегистрирован`)
    })
    
    it(`Регистрация без согласия на обработку данных`, async function() {
        //variables
        const email = `test@mail.com`
        const password = `Rthsdfj#@!1`
        const repeatPassword = `Rthsdfj#@!1`
        const name = `Auto`
        const surname = `Test`

        //open page
        await driver.get(`http://82.202.214.42/registration`);

        // actions
        fillTheForm(email, password, repeatPassword, name, surname)
        await driver.findElement(By.className(`btn--white`)).click()

        //asserts
        const successfulRegistrationTitle = await driver.findElement(By.className(`form-layout__title`)).getText()
        expect(await successfulRegistrationTitle).not.to.be.equal(`Вы зарегистрированы!`, `Пользователь зарегистрирован`)
    })
    
    it(`Регистрация c пробеллами в полях формы`, async function() {
        //variables
        const email = `   test@mail.com`
        const password = `   Rthsdfj#@!1`
        const repeatPassword = `   Rthsdfj#@!1`
        const name = `   Auto`
        const surname = `   Test`

        //open page
        await driver.get(`http://82.202.214.42/registration`);

        // actions
        fillTheForm(email, password, repeatPassword, name, surname)
        await driver.findElement(By.className(`btn--white`)).click()
        await driver.findElement(By.css(".form__checkbox-label")).click()

        //asserts
        const successfulRegistrationTitle = await driver.findElement(By.className(`form-layout__title`)).getText()
        expect(await successfulRegistrationTitle).not.to.be.equal(`Вы зарегистрированы!`, `Пользователь не зарегистрирован`)
    })
    
});