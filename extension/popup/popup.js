chrome.tabs.query(
    {
        active: true,
        currentWindow: true
    },

    tabs => {

        const currentURL =
            tabs[0].url;

        document.getElementById("url")
            .innerText = currentURL;

        chrome.storage.local.get(
            [
                "rfScore",
                "svmScore",
                "logisticScore",
                "decisionTreeScore",
                "finalRisk",
                "lastReasons"
            ],

            data => {

                document.getElementById(
                    "rfScore"
                ).innerText =
                    (data.rfScore || 0).toFixed(3) + "%";

                document.getElementById(
                    "svmScore"
                ).innerText =
                    (data.svmScore || 0).toFixed(3) + "%";

                document.getElementById(
                    "logisticScore"
                ).innerText =
                    (data.logisticScore || 0).toFixed(3) + "%";

                document.getElementById(
                    "decisionTreeScore"
                ).innerText =
                    (data.decisionTreeScore || 0).toFixed(3) + "%";


                document.getElementById(
                    "finalRisk"
                ).innerText =
                    "FINAL RISK: " +
                    (data.finalRisk || 0).toFixed(3) +
                    "%";

                const result =
                    document.getElementById(
                        "result"
                    );

                if (data.finalRisk >= 60) {
                    result.innerHTML =
                        "PHISHING WEBSITE";
                    result.className = "danger";
                    document.body.style.border = "4px solid #ff1744";
                } else {
                    result.innerHTML =
                        "SAFE WEBSITE";
                    result.className = "safe";
                    document.body.style.border = "4px solid #00e676";
                }
                let html = "<ul>";
                (
                    data.lastReasons || []
                ).forEach(reason => {
                    html +=
                        "<li>" +
                        reason +
                        "</li>";
                });

                html += "</ul>";

                document.getElementById(
                    "reasons"
                ).innerHTML = html;
            }
        );
    }
);