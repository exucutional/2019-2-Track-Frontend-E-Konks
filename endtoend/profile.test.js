import'babel-polyfill';

const puppeteer = require('puppeteer');

const timeout = 1000;

describe('Profile', () => {
	let page;
	let browser
	beforeAll(async () => {
		browser = await puppeteer.launch({headless: false});
		page = await browser.newPage();
		await page.goto('http://localhost:3000/');
	});
	it('should exist', async () => {
		await expect(page).toClick('#menu-button');
		await page.waitFor(400);
		await expect(page).toClick('a[href="/profile"]');
	});
	it('should change username', async () => {
		await expect(page).toFill('#profile-input-username', 'Test username');
		await expect(page).toClick('#check-button');
		await expect(page).toMatchElement('#profile-input-username', {value: 'Test username'})
	})
	afterAll(async () => {
		await browser.close();
	});
}, timeout);
