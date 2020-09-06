//CSS Imports
import '../css/styles.scss';

//JS Imports
const Launch = require('./launch');
const HttpRequests = require('./http-requests');
const http = new HttpRequests();

//variable declarations
let baseUrl = "https://api.spaceXdata.com/v3/launches?limit=100";

$(window).resize(function() {
    /*If browser resized, check width again */
    if ($(window).width() > 620) {
        $(".filter-body").show();
    }
 });

$(document).ready(function() {
    populateLaunchYears();
    populateLaunches(baseUrl);

    //Event Handlers
    $(".launch-year .filter-button").on("click", function() {
        let filterBy = "launch_year";
        let elements = ".launch-year .filter-button"
        filterData(this, filterBy, elements)
    });

    $(".launch-success .filter-button").on("click", function() {
        let filterBy = "launch_success";
        let elements = ".launch-success .filter-button"
        filterData(this, filterBy, elements)
    });

    $(".landing-success .filter-button").on("click", function() {
        let filterBy = "land_success";
        let elements = ".landing-success .filter-button"
        filterData(this, filterBy, elements)
    });

    $(".toggleFilter").click(function(){
        if($(".toggleFilter .arrow").hasClass('up'))
            $(".toggleFilter .arrow").removeClass('up').addClass("down");
        else 
            $(".toggleFilter .arrow").removeClass('down').addClass("up");
        $(".filter-body").slideToggle();
    });
    
});

//Function Declarations

function showLoader(flag){
    flag ? $(".page-loader").show().fadeIn(): $(".page-loader").hide().fadeOut();
}

function populateLaunchYears() {
    const startYear = 2006;
    const currentYear = new Date().getFullYear();
    for(let i = startYear; i <= currentYear; i++) {
        let elem = `<div class="filter-button launchYear">${i}</div>`;
        $(".sub-filter-content.launch-year").append(elem);
    }
}

function filterData(elem, filterBy, elements) {
    const value = $(elem).text().toLowerCase();
    const isActive = $(elem).hasClass("active");
    $(elements).removeClass("active");
    baseUrl = removeQueryStringParam(baseUrl, filterBy);
    if(!isActive) {
        $(elem).addClass("active");
        baseUrl += `&${filterBy}=${value}`;
    }
    populateLaunches(baseUrl);
}

function populateLaunches(url) {
    $(".programs-content").html("");
    showLoader(true);
    http.get(url).then( res => {
        if(res.length > 0) {
            res.map(item => {
                const launchItem = new Launch(
                    item.mission_name,
                    item.flight_number,
                    item.mission_id,
                    item.links.mission_patch_small,
                    item.launch_year,
                    item.launch_success,
                    item.land_success
                );
    
                let missionTemplate = createMissionTemplate(launchItem);
                $(".programs-content").append(missionTemplate);
            });
        } else {
            $(".programs-content").html("<div class='no-data'><span>No Missions Found.</span></div>");
        }
        
        showLoader(false);
    });
}

function createMissionTemplate(launchItem) {
    return `<div class="mission">
                <div class="img-container">
                    <img class="logo" src="${launchItem.logo || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png'}" alt="SpaceX Mission">
                </div>
                <div class="text-container">
                    <p class="mission-name">${launchItem.missonName} #${launchItem.flightNo}</p>
                    <div class="mission-table">
                        <div class="tr mission-ids">
                            <div class="td label">Mission Ids: </div>
                            <div class="td id output"><ul>${launchItem.ids.length > 0 ? launchItem.ids.map(id => `<li>${id}</li>`).join(''): 'N/A'}</ul></div>
                        </div>
                        <div class="tr mission-year">
                            <div class="td label">Launch Year: </div>
                            <div class="td output">${launchItem.launchYear}</div>
                        </div>
                        <div class="tr mission-launch">
                            <div class="td label">Successful Launch: </div>
                            <div class="td output">${launchItem.launchSuccess}</div>
                        </div>
                        <div class="tr mission-landing">
                            <div class="td label">Successful Landing: </div>
                            <div class="td output">${launchItem.launchSuccess}</div>
                        </div>
                    </div> 
                </div>
            </div>`;
}

function removeQueryStringParam(url, key){
    return url.replace(new RegExp('&'+ key + "=\\w+"),"").replace("?&","?");
}