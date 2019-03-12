'use strict';
describe('Movie App', function () {

    beforeEach(function () {
        browser.get('/');
    });

    afterEach(function () {

        // Restore original implicit wait value
        setImplicitWait();
    });

    // To check app is running
    it('Should display correct title of the App', function () {
        expect(browser.getTitle()).toEqual('Movie App');
    });

    // Navigation between pages using click on navigation menu (Search & Featured)
    it('Should display two menu (Search & Featured)', function () {
        expect(element(by.css('.menu-search')).getText()).toEqual('Search');
        expect(element(by.css('.menu-featured')).getText()).toEqual('Featured');
    });

    it('Should navigate to featured page and display featured movie list', function () {
        element(by.css('.menu-featured')).click();
        expect(element(by.css('.panel-heading')).getText()).toEqual('Featured Movies');
    });

    it('Should navigate to search page and display the search page', function () {
        element(by.css('.menu-search')).click();
        expect(element(by.tagName('app-search h2')).getText()).toEqual('Search Movies');
    });

    // Perform the search result
    it('Searched movie should give error if not found', function () {
        element(by.css('input[name="inputTitle"]')).clear().sendKeys('nomovie');
        element(by.css('.search-btn')).click();
        expect(element(by.css('.no-result')).getText()).toEqual("Sorry, we didnot find any matching result.");
    });

    it('Searched movie should be display in the result', function () {
        element(by.css('input[name="inputTitle"]')).clear().sendKeys('titanic');
        element(by.css('.search-btn')).click();
        expect(element(by.css('.panel-title')).getText()).toEqual('Search Results');
    });

    function setImplicitWait () {
        return browser.manage().timeouts().implicitlyWait(2000);
    }
});
