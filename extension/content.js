(function () {

    console.log("CONTENT JS RUNNING");

    chrome.storage.local.set({

        rfScore: 0,
        svmScore: 0,
        logisticScore: 0,
        decisionTreeScore: 0,
        finalRisk: 0,
        lastReasons: []

    }, () => {

        const currentURL =
            window.location.href;

        console.log(
            "URL:",
            currentURL
        );

        detectPhishing(currentURL);

    });

})();