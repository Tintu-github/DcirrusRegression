const {
    _
} = require("underscore");
const Testrail = require("testrail-api");

let testRail = undefined;
let reporterSavedMilestoneId = 0;
const results = {};
const suites = [];
const specs = [];
let reporterSuiteIds = [];
const suiteTimes = [];
let reporterPostedSuites = 0;
let testRailParams;
const statusIdByName = function (text) {
    switch (text.toLowerCase()) {
        case "passed":
            return 1; //6 aurea passed (auto)
        case "failed":
            return 5; //7 aurea failed (auto)
        case "disabled":
        case "pending":
            return 8; //8 aurea skipped (auto)
    }
};
const reporter = {
    jasmineStarted: function (suiteInfo) {
        results.startTime = new Date();
        results.noOfSpecs = suiteInfo.totalSpecsDefined;
    },
    suiteStarted: function (suite) {
        const time = new Date();
        const suiteExists = suites.filter(function (singleSuite) {
            return singleSuite.fullName === suite.fullName;
        });
        if (suiteExists.length !== 0) {
            return;
        }
        suites.push(suite);
        suiteTimes.push({
            id: suite.id,
            startTime: time
        });
    },
    suiteDone: function (result, done) {
        const time = new Date();

        suiteTimes.forEach(function (suiteTime, index) {
            if (suiteTime.id === result.id) {
                suiteTimes[index].endTime = time;
            }
        });
    },
    specStarted: function (spec) {
        const specDetails = spec;
        specDetails.startTime = new Date();
        if (specs.length === 0) {
            specs.push(specDetails);
        } else {
            if (specs.indexOf(spec) === -1) {
                specs.push(specDetails);
            }
        }
    },
    specDone: function (result) {
        const time = new Date();
        suiteTimes.forEach(function (suiteTime, index) {
            if (suiteTime.id === result.id) {
                suiteTimes[index].endTime = time;
            }
        });
    },
    jasmineDone: function () {
        results.endTime = new Date();
        suites.forEach(function (suite, index) {
            specs.forEach(function (spec, specIndex) {
                if (
                    suite.fullName.trim() ===
                    spec.fullName.replace(spec.description, "").trim()
                ) {
                    if (suites[index].specs) {
                        suites[index].specs.push(spec);
                    } else {
                        suites[index].specs = [];
                        suites[index].specs.push(spec);
                    }
                }
            });

            suiteTimes.forEach(function (suiteTime, timeIndex) {
                if (suiteTime.id === suite.id) {
                    suites[index].startTime = suiteTime.startTime;
                    suites[index].endTime = suiteTime.endTime;
                }
            });
        });
        suites.forEach(function (suite, index) {
            let flag = true;
            if(suite.specs){
            suite.specs.forEach(function (spec, specIndex) {
                if (spec.failedExpectations.length > 0) {
                    suites[index].testStatus = "Fail";
                    flag = false;
                }
            });

            if (flag) {
                suites[index].testStatus = "Pass";
            }
            }
        });

        results.suites = suites;
        testRail = new Testrail({
            host: testRailParams.host,
            user: testRailParams.user,
            password: testRailParams.password
        });
        const timestamp = (new Date()).toUTCString();
        if (!testRailParams.postResult) {
            return;
        }

        const processingWithSuite = function (milestoneId) {
            reporterSavedMilestoneId = milestoneId;
            return testRail
                .getSuites(testRailParams.projectId)
                .then(suites => {
                    const getSuiteId = function (suiteName) {
                        const suite = suites.filter(function (data) {
                            return data.name === suiteName;
                        });
                        if (!suite[0]) {
                            throw "Suite doesn't exist or name doesn't match";
                        }
                        return suite[0].id;
                    };
                    const testrailResults = [];
                    results.suites.forEach(function (suite, suiteIndex) {
                        if(suite.specs) {
                            suite.specs.forEach(function (spec, specIndex) {
                                let caseId;
                                const caseIdRegexMatch = /\[[cC]?(\d+)\]/.exec(spec.description);
                                if (caseIdRegexMatch) {
                                    caseId = caseIdRegexMatch[1];
                                }
                                let defectId = '';
                                if (spec.status === 'disabled') {
                                    const defectIdRegexMatch = /\[BUG:([A-Za-z][A-Z]+-\d+)\]/.exec(spec.description);
                                    if (defectIdRegexMatch) {
                                        defectId = defectIdRegexMatch[1];
                                    }
                                }
                                if (caseId) {
                                    spec.duration = spec.duration || 0.1;
                                    testrailResults.push({
                                        suite_id: getSuiteId(suite.description),
                                        suite_name: suite.description,
                                        defects: defectId,
                                        case_id: caseId,
                                        version: testRailParams.versionName,
                                        elapsed: Math.ceil(parseFloat(spec.duration) + 0.1) + "s",
                                        status_id: statusIdByName(spec.status)
                                    });
                                }
                            });
                        }
                    });
                    const getTestrailResultById = function (suiteId) {
                        return testrailResults.filter(function (item) {
                            return item.suite_id === suiteId;
                        });
                    };
                    reporterSuiteIds = _.uniq(_.pluck(testrailResults, "suite_id"));
                    reporterSuiteIds.forEach(function (suiteId) {
                        const newRun = {
                            suite_id: suiteId,
                            name: "Suite '" +
                            getTestrailResultById(suiteId)[0].suite_name +
                            "' execution on " +
                            timestamp,
                            description: "Run for suite '" +
                            getTestrailResultById(suiteId)[0].suite_name +
                            "' created by automation framework on " +
                            timestamp,
                            milestone_id: milestoneId
                        };
                        if (!testRailParams.createRunFromSuite) {
                            newRun["include_all"] = false;
                            newRun["case_ids"] = getTestrailResultById(suiteId).map(function (item) {
                                return item.case_id;
                            });
                        }

                        return testRail
                            .addRun(testRailParams.projectId, newRun)
                            .then(run => {
                                const testsForSpecificSuite = testrailResults.filter(function (item) {
                                    return item.suite_id === suiteId;
                                });

                                return testRail
                                    .addResultsForCases(run.id, {
                                        results: testsForSpecificSuite
                                    })
                                    .then(resultsForCases => {
                                        return testRail.closeRun(run.id, null).then(run => {
                                            reporterPostedSuites++;
                                        }).catch(err => {
                                            reporterPostedSuites++;
                                            console.log("error", err);
                                        });
                                    })
                                    .catch(err => {
                                        reporterPostedSuites++;
                                        console.log("error", err);
                                    });
                            })
                            .catch(function (err) {
                                console.log("error", err);
                            });
                    });
                })
                .catch(function (err) {
                    console.log("error", err);
                });
        };

        return testRail
            .getMilestones(testRailParams.projectId, {
                is_completed: 0
            })
            .then(function (milestones) {
                const fetchedMilestones = milestones.filter(function (data) {
                    return data.name === testRailParams.milestoneName;
                });
                if (!fetchedMilestones[0]) {

                    const newMilestone = {
                        name: testRailParams.milestoneName +
                        (testRailParams.isUniqueMilestone ? ' - ' + timestamp : '') + ' - ('
                        + browser.platform + '-' + browser.browserName + ')',
                        description: testRailParams.milestoneName +
                        " created by automation framework on " +
                        timestamp,
                        start_on: new Date().getTime()
                    };

                    return testRail
                        .addMilestone(testRailParams.projectId, newMilestone)
                        .then(milestone => {
                            return processingWithSuite(milestone.id);
                        })
                        .catch(function (err) {
                            console.log("error", err);
                        });
                }
                return processingWithSuite(fetchedMilestones[0].id);
            })
            .catch(function (err) {
                console.log("error", err);
            });
    }
};
module.exports = {
    testRailJasmin2Reporter: reporter,
    testRailParameters: function (value) {
        testRailParams = value;
    },
    suiteIds: function () {
        return reporterSuiteIds;
    },
    postedSuites: function () {
        return reporterPostedSuites;
    },
    savedMilestoneId: function () {
        return reporterSavedMilestoneId;
    },
    updateMilestone: function () {
        return testRail.updateMilestone(reporterSavedMilestoneId, {is_completed: true}).then(run => {
            console.log("Results posted for test rail");
        }).catch(err => {
            console.log("error", err);
        });
    }
};