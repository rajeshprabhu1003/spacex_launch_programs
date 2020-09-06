module.exports = class Launch{
    constructor(missonName, flightNo, ids, logo, launchYear, launchSuccess, landSuccess){
        this.missonName = missonName;
        this.flightNo = flightNo;
        this.ids = ids;
        this.logo = logo;
        this.launchYear = launchYear;
        this.launchSuccess = launchSuccess;
        this.landSuccess = landSuccess
    }
}