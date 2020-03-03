import'babel-polyfill';

const puppeteer = require('puppeteer');

const timeout = 1000;

describe('Chat', () => {
	let page;
	let browser;
	jest.setTimeout(300000);
	beforeAll(async () => {
		browser = await puppeteer.launch({headless: false});
		page = await browser.newPage();
		await page.goto('http://localhost:3000/');
	});
	it('should be created', async () => {
		await expect(page).toClick('#create-chat-button');
		await expect(page).toFill('#create-chat-name', 'First chat');
		await expect(page).toClick('#create-chat-submit');
	});
	it('should exist', async () => {
		await expect(page).toClick('#link-to-chat1');
	});
	it('should print message', async () => {
		await expect(page).toFillForm('#message-input-form', {content: 'Test message'});
		await page.keyboard.press('Enter');
		await expect(page).toMatchElement('#messageContainer> div:first-child > div > div:nth-child(2)', {text: 'Test message'});
	});
	afterAll(async () => {
		await browser.close();
	});
}, timeout);
