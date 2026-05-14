function calculateRFScore(features) {
    let score = 0;
    let reasons = [];
    for (let key in features) {
        if (
            features[key] === 1 &&
            RF_WEIGHTS[key] !== undefined
        ) {
            score += RF_WEIGHTS[key] * 300;
            reasons.push(key + " suspicious");
        }
    }
    score = Math.min(score, 100);
    return {
        score: Number(score.toFixed(3)),
        reasons
    };
}

function calculateSVMScore(features) {
    let score = 0;
    for (let key in features) {
        if (
            features[key] === 1 &&
            SVM_WEIGHTS[key] !== undefined
        ) {
            score += SVM_WEIGHTS[key] * 300;
        }
    }
    score = Math.min(score, 100);
    return Number(score.toFixed(3));
}

function calculateLRScore(features) {
    let score = 0;
    for (let key in features) {
        if (
            features[key] === 1 &&
            LR_WEIGHTS[key] !== undefined
        ) {
            score += Math.abs(LR_WEIGHTS[key]) * 20;
        }
    }
    score = Math.min(score, 100);
    return Number(score.toFixed(3));
}

function calculateDTScore(features) {
    let score = 0;
    for (let key in features) {
        if (
            features[key] === 1 &&
            DT_WEIGHTS[key] !== undefined
        ) {
            score += DT_WEIGHTS[key] * 300;
        }
    }
    score = Math.min(score, 100);
    return Number(score.toFixed(3));
}

function detectPhishing(url) {
    console.log("Detecting:", url);

    const features = extractFeatures(url);
    console.log("Features:", features);

    const rfResult = calculateRFScore(features);
    const svmScore = calculateSVMScore(features);
    let logisticScore = calculateLRScore(features);
    let decisionTreeScore = calculateDTScore(features);

    logisticScore = Math.min(logisticScore, 100);
    decisionTreeScore = Math.min(decisionTreeScore, 100);

    const finalRisk = Number((
        (rfResult.score + svmScore + logisticScore + decisionTreeScore) / 4
    ).toFixed(3));

    chrome.storage.local.set({
        rfScore: rfResult.score,
        svmScore: svmScore,
        logisticScore: logisticScore,
        decisionTreeScore: decisionTreeScore,
        finalRisk: finalRisk,
        lastReasons: rfResult.reasons
    });

    console.log("FINAL RISK:", finalRisk);

    const THRESHOLD = 50;

    if (finalRisk >= THRESHOLD) {
        chrome.runtime.sendMessage({
            action: "OPEN_WARNING",
            url: url,
            riskScore: finalRisk,
            reasons: rfResult.reasons
        });
    }
}
