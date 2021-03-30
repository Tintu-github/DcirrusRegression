import {BackgroudHelper} from '../stephelpers/backgroudHelper';
const  {Before,  When } = require('cucumber');

Before({timeout: 60 * 1000}, function() {
    // Does some slow browser/filesystem/network actions
});

When(/^I set "([^"]*)" state of Execution$/, async (stateExecution: string) => {
    if (stateExecution === 'Success') {
        await BackgroudHelper.executionSet(true);
    } else {
       await BackgroudHelper.executionSet(false );
    }
});
