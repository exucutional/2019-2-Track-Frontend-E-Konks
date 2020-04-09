import { translate, memoize, ITranslateParams } from '../translate';

const translateUtil = memoize(translate);

interface ITranslateTest extends ITranslateParams {
    result: string,
};

const cases: Array<ITranslateTest> = [
    {
        lang: 'en',
        text: 'Привет',
        result: 'Hi'
    },
    {
        lang: 'rand',
        text: 'test',
        result: 'Error 501',
    }
];

async function isTestPassed(): Promise<Boolean> {
    let isTotalPassed: Boolean = true;
    for (let testCase of cases) {
        let isLocalPassed: Boolean = await translateUtil(testCase).then(result => {
            if (testCase.result != result) {
                console.log(`Test failed. Expect: ${testCase.result}. Got: ${result}`);
                return false;
            }
            return true;
        });
        if (!isLocalPassed) {
            isTotalPassed = false;
        }
    }
    return isTotalPassed;
}

async function startTest() {
    if (await isTestPassed()) {
        console.log('All tests passed');
    }
}

startTest();
