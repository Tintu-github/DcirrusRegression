# We-break-it-you-buy-it

Please check framework in Design/GenericBDDFrameworkApproach.docx file

|   .gitignore
|   .npmrc
|   package-lock.json
|   package.json
|   README.md
|   tsconfig.json
|   tslint.json
|           
+---core
|   |       
|   +---logger
|   |       step-logger.ts
|           
+---e2e
|   +---components
|   |   +---devfactory
|   |   |   \---component-helpers
|   |   |           component-helpers.ts
|   |   |           
|   |   +---html
|   |   |       button-helper.ts
|   |   |       checkbox-helper.ts
|   |   |       dropdown-helper.ts
|   |   |       element-helper.ts
|   |   |       page-helper.ts
|   |   |       textbox-helper.ts
|   |   |       wait-helper.ts
|   |   |       
|   |   +---misc-utils
|   |   |       constants.ts
|   |   |       html-helper.ts
|   |   |       js-helper.ts
|   |   |       json-helper.ts
|   |   |       validation-helper.ts
|   |               
|   +---config
|   |       e2e.conf.json
|   |       protractor.conf.ts
|   |       
|   +---features
|   |       Demo.feature
|   |       
|   +---page-objects
|   |   |   common.json
|   |   |   pages.json
|   |   |   
|   |   +---pages
|   |   |       Bing_Search.json
|   |   |       home_page.json
|   |   |       
|   |   \---TestCasesData
|   |           home_Test_Case_1.json
|   |           
|   +---stepdefinitions
|   |       background.ts
|   |       click.ts
|   |       hotkeys.ts
|   |       input.ts
|   |       navigate.ts
|   |       wait.ts
|   |       
|   \---stephelpers
|           backgroudHelper.ts
|           dataHelper.ts
|           elementHelper.ts
|           pageHelper.ts         


The Series of commands that we need to use are

1) npm install
2) npm run clean
3) npm run remove
4) npm run tsc
5) npm run test
6) npm run testTag "@automation_framework_demo1"
7) npm run testTag "@automation_framework_demo1 or @automation_framework_demo2"

Check the cucumber reports in reports folder as given below

We-break-it-you-buy-it\reports\report\index.html
