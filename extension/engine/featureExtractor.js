function extractFeatures(url) {
    const features = {};
    features["LongURL"] =
        url.length > 75 ? 1 : 0;

    features["Symbol@"] =
        url.includes("@") ? 1 : 0;

    features["HTTPS"] =
        url.startsWith("https") ? 0 : 1;

    features["ShortURL"] =
        (
            url.includes("bit.ly") ||
            url.includes("tinyurl")
        ) ? 1 : 0;

    features["Redirecting//"] =
        url.lastIndexOf("//") > 7 ? 1 : 0;

    features["PrefixSuffix-"] =
        url.includes("-") ? 1 : 0;

    const domain =
        new URL(url).hostname;

    features["SubDomains"] =
        domain.split(".").length > 3
            ? 1
            : 0;

    features["UsingIP"] = 0;
    features["DomainRegLen"] = 0;
    features["Favicon"] = 0;
    features["NonStdPort"] = 0;
    features["HTTPSDomainURL"] = 0;
    features["RequestURL"] = 0;
    features["AnchorURL"] = 0;
    features["LinksInScriptTags"] = 0;
    features["ServerFormHandler"] = 0;
    features["InfoEmail"] = 0;
    features["AbnormalURL"] = 0;
    features["WebsiteForwarding"] = 0;
    features["StatusBarCust"] = 0;
    features["DisableRightClick"] = 0;
    features["UsingPopupWindow"] = 0;
    features["IframeRedirection"] = 0;
    features["AgeofDomain"] = 0;
    features["DNSRecording"] = 0;
    features["WebsiteTraffic"] = 0;
    features["PageRank"] = 0;
    features["GoogleIndex"] = 0;
    features["LinksPointingToPage"] = 0;
    features["StatsReport"] = 0;

    return features;
}