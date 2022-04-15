/*
    Author: Horseface
    Date: 27/03:2022

    Framedata url: https://docs.google.com/spreadsheets/d/1R3I_LXfqhvFjlHTuj-wSWwwqYmlUf299a3VY9pVyGEw/
        CSV: https://docs.google.com/spreadsheets/d/1R3I_LXfqhvFjlHTuj-wSWwwqYmlUf299a3VY9pVyGEw/export?exportFormat=csv
*/


// #region GLobal variables
//CSV lol
const FrameDataCSV = "https://docs.google.com/spreadsheets/d/1R3I_LXfqhvFjlHTuj-wSWwwqYmlUf299a3VY9pVyGEw/export?exportFormat=tsv";

//Var framedata data
var Fdata;

//Framedata Datatable refrenece
var Dtable;

//#region Filter logic
class searchFilters{
    CharacterFilter = "";
    ImpactFilter = "";
    //UrlFilter = "";

    getUrlParameters(){
        let urlParam = new URLSearchParams(window.location.search)
        
        //Character filter
        var characterlist = ["2b", "amy", "astaroth", "azwel", "cassandra", "cervantes", "geralt", "groh", "haohmaru", "hilde", "inferno", "ivy", "kilik", "maxi", "mitsurugi", "nightmare", "raphael", "seong-mi-na", "setsuka", "siegfried", "sophitia", "taki", "talim", "tira", "voldo", "xianghua", "yoshimitsu", "zasalamel", "hwang"]
        if(characterlist.includes(urlParam.get("character"))){
            this.CharacterFilter = urlParam.get("character");
        }

        //Impact filter
        if(!isNaN(urlParam.get("imapct"))){
            this.ImpactFilter = urlParam.get("impact");
        }
        
    }    
}

var Filters = new searchFilters()


// #region Gloabl icons
var Icons = {
    //Notes
    ":TH:": '<img width="40" height="20" src="Icons/TH.png" value="TH" ></img>',
    ":BA:": '<img width="40" height="20" src="Icons/BA.png" value="BA" ></img>',
    ":GI:": '<img width="40" height="20" src="Icons/GI.png" value="GI" ></img>',
    ":SS:": '<img width="40" height="20" src="Icons/SS.png" value="SS" ></img>',
    ":UA:": '<img width="40" height="20" src="Icons/UA.png" value="UA" ></img>',
    ":LH:": '<img width="40" height="20" src="Icons/LH.png" value="LH" ></img>',
    ":RE:": '<img width="40" height="20" src="Icons/RE.png" value="RE" ></img>',
    ":GC:": '<img width="40" height="20" src="Icons/GC.png" value="GC" ></img>',
    ":AT:": '<img width="40" height="20" src="Icons/AT.png" value="AT" ></img>',
    ":CE:": '<img width="40" height="20" src="Icons/CE.png" value="CE" ></img>',
    ":SC:": '<img width="40" height="20" src="Icons/SC.png" value="SC" ></img>',
    //":TS:": '<img width="40" height="20" src="Icons/TS.png" value = "TS"></img>',

    //Slide combo buttons
    ":a::A:": '<img width="28" height="20" src="Icons/A-A.png" class="mr-1" value = "aA" ></img>',
    ":a::B:": '<img width="28" height="20" src="Icons/A-B.png" class="mr-1" value = "aB" ></img>',
    ":a::K:": '<img width="28" height="20" src="Icons/A-K.png" class="mr-1" value = "aK" ></img>',
    ":a::G:": '<img width="28" height="20" src="Icons/A-G.png" class="mr-1" value = "aG" ></img>',
    ":b::A:": '<img width="28" height="20" src="Icons/B-A.png" class="mr-1" value = "bA" ></img>',
    ":b::B:": '<img width="28" height="20" src="Icons/B-B.png" class="mr-1" value = "bB" ></img>',
    ":b::K:": '<img width="28" height="20" src="Icons/B-K.png" class="mr-1" value = "bK" ></img>',
    ":b::G:": '<img width="28" height="20" src="Icons/B-G.png" class="mr-1" value = "bG" ></img>',
    ":k::A:": '<img width="28" height="20" src="Icons/K-A.png" class="mr-1" value = "kA" ></img>',
    ":k::B:": '<img width="28" height="20" src="Icons/K-B.png" class="mr-1" value = "kB" ></img>',
    ":k::K:": '<img width="28" height="20" src="Icons/K-K.png" class="mr-1" value = "kK" ></img>',
    ":k::G:": '<img width="28" height="20" src="Icons/K-G.png" class="mr-1" value = "kG" ></img>',
    ":g::A:": '<img width="28" height="20" src="Icons/G-A.png" class="mr-1" value = "gA" ></img>',
    ":g::B:": '<img width="28" height="20" src="Icons/G-B.png" class="mr-1" value = "gB" ></img>',
    ":g::K:": '<img width="28" height="20" src="Icons/G-K.png" class="mr-1" value = "gK" ></img>',
    ":g::G:": '<img width="28" height="20" src="Icons/G-G.png" class="mr-1" value = "gG" ></img>',
    
    //Directions
    ":9:": '<img width="20" height="20" src="Icons/9.png" value = "9" ></img>',
    ":8:": '<img width="20" height="20" src="Icons/8.png" value = "8" ></img>',
    ":7:": '<img width="20" height="20" src="Icons/7.png" value = "7" ></img>',
    ":6:": '<img width="20" height="20" src="Icons/6.png" value = "6" ></img>',
    ":5:": '<img width="20" height="20" src="Icons/5.png" value = "5" ></img>',
    ":4:": '<img width="20" height="20" src="Icons/4.png" value = "4" ></img>',
    ":3:": '<img width="20" height="20" src="Icons/3.png" value = "3" ></img>',
    ":2:": '<img width="20" height="20" src="Icons/2.png" value = "2" ></img>',
    ":1:": '<img width="20" height="20" src="Icons/1.png" value = "1" ></img>',

    //Directions held
    ":(9):": '<img width="20" height="20" src="Icons/9-.png" value = "(9)" ></img>',
    ":(8):": '<img width="20" height="20" src="Icons/8-.png" value = "(8)" ></img>',
    ":(7):": '<img width="20" height="20" src="Icons/7-.png" value = "(7)" ></img>',
    ":(6):": '<img width="20" height="20" src="Icons/6-.png" value = "(6)" ></img>',
    ":(4):": '<img width="20" height="20" src="Icons/4-.png" value = "(4)" ></img>',
    ":(3):": '<img width="20" height="20" src="Icons/3-.png" value = "(3)" ></img>',
    ":(2):": '<img width="20" height="20" src="Icons/2-.png" value = "(2)" ></img>',
    ":(1):": '<img width="20" height="20" src="Icons/1-.png" value = "(1)" ></img>',

    //Held buttons
    ":(G):": '<img width="20" height="20" src="Icons/G-.png" class="mr-1" value = "(G)" ></img>',
    ":(A):": '<img width="20" height="20" src="Icons/A-.png" class="mr-1" value = "(A)" ></img>',
    ":(B):": '<img width="20" height="20" src="Icons/B-.png" class="mr-1" value = "(B)" ></img>',
    ":(K):": '<img width="20" height="20" src="Icons/K-.png" class="mr-1" value = "(K)" ></img>',

    //Buttons
    ":G:": '<img width="20" height="20" src="Icons/G.png" class="mr-1" value = "G" ></img>',
    ":A:": '<img width="20" height="20" src="Icons/A.png" class="mr-1" value = "A" ></img>',
    ":B:": '<img width="20" height="20" src="Icons/B.png" class="mr-1" value = "B" ></img>',
    ":K:": '<img width="20" height="20" src="Icons/K.png" class="mr-1" value = "K" ></img>',

    //Slide buttons
    ":g:": '<img width="20" height="20" src="Icons/gs.png" value = "g" ></img>',
    ":a:": '<img width="20" height="20" src="Icons/As.png" value = "a" ></img>',
    ":b:": '<img width="20" height="20" src="Icons/Bs.png" value = "b" ></img>',
    ":k:": '<img width="20" height="20" src="Icons/Ks.png" value = "k" ></img>',

    //Held combo buttons
    ":(A)+(K):": '<img width="46" height="20" src="Icons/AK-.png" class="mr-1" value = "(A)+(K)" ></img>',
    ":(A)+(B):": '<img width="46" height="20" src="Icons/AB-.png" class="mr-1" value = "(A)+(B)" ></img>',
    ":(K)+(G):": '<img width="46" height="20" src="Icons/KG-.png" class="mr-1" value = "(K)+(H)" ></img>',
    ":(B)+(K):": '<img width="46" height="20" src="Icons/BK-.png" class="mr-1" value = "(B+K)" ></img>',
    ":(A)+(G):": '<img width="46" height="20" src="Icons/AG-.png" class="mr-1" value = "(A)+(G)" ></img>',
    ":(B)+(G):": '<img width="46" height="20" src="Icons/BG-.png" class="mr-1" value = "(B+G)" ></img>',

    //Combo buttons
    ":A+K:": '<img width="46" height="20" src="Icons/AK.png" class="mr-1" value="A+K" ></img>',
    ":A+B:": '<img width="46" height="20" src="Icons/AB.png" class="mr-1" value="A+B" ></img>',
    ":K+G:": '<img width="46" height="20" src="Icons/KG.png" class="mr-1" value="K+G" ></img>',
    ":A+G:": '<img width="46" height="20" src="Icons/AG.png" class="mr-1" value="A+G" ></img>',
    ":B+K:": '<img width="46" height="20" src="Icons/BK.png" class="mr-1" value="B+K" ></img>',
    ":B+G:": '<img width="46" height="20" src="Icons/BG.png" class="mr-1" value="B+G" ></img>',

    ":A+B+K:": '<img width="72" height="20" src= "Icons/ABK.png" class="mr-1" value="A+B+K"></img>',
    ":(A)+(B)+(K):": '<img width="72" height="20" src="Icons/ABK-.png" class="mr-1" value="(A+B+K)"></img>',

    //Height
    ":H:": '<img width="20" height="20" src="Icons/H.png" value="H"></img>',
    ":M:": '<img width="20" height="20" src="Icons/M.png" value="M"></img>',
    ":L:": '<img width="20" height="20" src="Icons/L.png" value="L"></img>',
    ":SH:": '<img width="40" height="20" src="Icons/SH.png" value="SH"></img>',
    ":SM:": '<img width="40" height="20" src="Icons/SM.png" value="SM"></img>',
    ":SL:": '<img width="40" height="20" src="Icons/SL.png" value="SL"></img>',

    //Misc
    ":a+b:": '<img width="46" height="20" src="Icons/AB.png" class="mr-1" value="a+b"></img>',
}

var CommandIcons = [
    //Slide inputs
    [":a::A:", Icons[":a::A:"]],
    [":a::B:", Icons[":a::B:"]],
    [":a::K:", Icons[":a::K:"]],
    [":a::G:", Icons[":a::G:"]],
    [":b::A:", Icons[":b::A:"]],
    [":b::B:", Icons[":b::B:"]],
    [":b::K:", Icons[":b::K:"]],
    [":b::G:", Icons[":b::G:"]],
    [":k::A:", Icons[":k::A:"]],
    [":k::B:", Icons[":k::B:"]],
    [":k::K:", Icons[":k::K:"]],
    [":k::G:", Icons[":k::G:"]],
    [":g::A:", Icons[":g::A:"]],
    [":g::B:", Icons[":g::B:"]],
    [":g::K:", Icons[":g::K:"]],
    [":g::G:", Icons[":g::G:"]],

    //B6B missing

    //Directions
    [":9:", Icons[":9:"]],
    [":8:", Icons[":8:"]],
    [":7:", Icons[":7:"]],
    [":6:", Icons[":6:"]],
    [":5:", Icons[":5:"]],
    [":4:", Icons[":4:"]],
    [":3:", Icons[":3:"]],
    [":2:", Icons[":2:"]],
    [":1:", Icons[":1:"]],
 
    [":(9):", Icons[":(9):"]],
    [":(8):", Icons[":(8):"]],
    [":(7):", Icons[":(7):"]],
    [":(6):", Icons[":(6):"]],
    [":(4):", Icons[":(4):"]],
    [":(3):", Icons[":(3):"]],
    [":(2):", Icons[":(2):"]],
    [":(1):", Icons[":(1):"]],

    //Buttons
    [":(G):", Icons[":(G):"]],
    [":(A):", Icons[":(A):"]],
    [":(B):", Icons[":(B):"]],
    [":(K):", Icons[":(K):"]],

    [":G:", Icons[":G:"]],
    [":A:", Icons[":A:"]],
    [":B:", Icons[":B:"]],
    [":K:", Icons[":K:"]],

    [":A+K:", Icons[":A+K:"]],
    [":A+B:", Icons[":A+B:"]],
    [":K+G:", Icons[":K+G:"]],
    [":A+G:", Icons[":A+G:"]],
    [":B+K:", Icons[":B+K:"]],
    [":B+G:", Icons[":B+G:"]],

    
    [":(A)+(K):", Icons[":(A)+(K):"]],
    [":(A)+(B):", Icons[":(A)+(B):"]],
    [":(K)+(G):", Icons[":(K)+(G):"]],
    [":(B)+(K):", Icons[":(B)+(K):"]],
    [":(A)+(G):", Icons[":(A)+(G):"]],
    [":(B)+(G):", Icons[":(B)+(G):"]],

    [":A+B+K:", Icons[":A+B+K:"]],
    [":(A)+(B)+(K):", Icons[":(A)+(B)+(K):"]],
    
    [":g:", Icons[":g:"]],
    [":a:", Icons[":a:"]],
    [":b:", Icons[":b:"]],
    [":k:", Icons[":k:"]],

    //Misc
    [":(B+K):", '<img width="46" height="20" src="Icons/BK-.png" value = "(B+K)"></img>'],
    [":a+b:", '<img width="46" height="20" src="Icons/AB.png" value = "a+b"></img>'],
    [":b+k:", '<img width="46" height="20" src="Icons/BK.png" value = "B+K"></img>'],
];

var HeightIcons = [
    [":H:", Icons[":H:"]],
    [":M:", Icons[":M:"]],
    [":L:", Icons[":L:"]],
    [":SH:", Icons[":SH:"]],
    [":SM:", Icons[":SM:"]],
    [":SL:", Icons[":SL:"]],
];

var NotesIcons = [
    //Unique notes Icons
    [":TH:", Icons[":TH:"]],
    [":BA:", Icons[":BA:"]],
    [":GI:", Icons[":GI:"]],
    [":SS:", Icons[":SS:"]],
    [":UA:", Icons[":UA:"]],
    [":LH:", Icons[":LH:"]],
    [":RE:", Icons[":RE:"]],
    [":GC:", Icons[":GC:"]],
    [":AT:", Icons[":AT:"]],
    //[":TS:", Icons[":TS:"]],
    [":CE:", Icons[":CE:"]],
    [":SC:", Icons[":SC:"]],


    //Directions
    [":9:", Icons[":9:"]],
    [":8:", Icons[":8:"]],
    [":7:", Icons[":7:"]],
    [":6:", Icons[":6:"]],
    [":5:", Icons[":5:"]],
    [":4:", Icons[":4:"]],
    [":3:", Icons[":3:"]],
    [":2:", Icons[":2:"]],
    [":1:", Icons[":1:"]],

    //Height Icons
    [":H:", Icons[":H:"]],
    [":M:", Icons[":M:"]],
    [":L:", Icons[":L:"]],

    [":SH:", Icons[":SH:"]],
    [":SM:", Icons[":SM:"]],
    [":SL:", Icons[":SL:"]],

];
// #endregion

// #endregion

function downloadFrameData(){
    const CSVHeaders = ["Character", "Move category", "Move Name", "Stance", "Command", "Hit level", "Impact", "Damage", "Block", "Hit", "Counter Hit", "Guard Burst", "Notes"];
    toastr.warning("Downloading framedata...");

    Papa.parse(FrameDataCSV, {
        download: true,
        header: true,
        delimiter: "\t",
        transformHeader: function(header,index){
            //Applies headers from Fheaders
            return CSVHeaders[index];
        },
        complete: (results) => {
            //Pre process
            results.data.splice(0,3);

            //Add framedata to localstorage
            localStorage.setItem("Fdata", JSON.stringify(results.data));

            createTable(results.data);
            toastr.clear();
        }
    });

}

function createTable(data){
    const Fheaders = ["Character", "Move category", "Move Name", "Stance", "Command", "Hit level", "Impact", "Damage", "Sum(Damage)", "Block", "Hit", "Counter Hit", "Guard Burst", "Notes"];

    var vData = [];
    data.forEach(function (row, index){

        sumDamage = row[Fheaders[7]].split(",").map(Number).reduce((partialSum, a) => partialSum + a, 0);
        //sumDamage = "0";
        //console.log(row[Fheaders[7]])

        vData.push([
            row[Fheaders[0]],//"Character"
            row[Fheaders[1]],//"Move category"
            row[Fheaders[2]],//"Move Name"
            row[Fheaders[3]],//"Stance"
            row[Fheaders[4]],//"Command"
            row[Fheaders[5]],//"Hit level"
            row[Fheaders[6]],//"Impact",
            row[Fheaders[7]],//"Damage",
            sumDamage,       //"Sum(Damage)"
            row[Fheaders[9]],//"Block",
            row[Fheaders[10]],//"Hit",
            row[Fheaders[11]],//"Counter Hit"
            row[Fheaders[12]],//"Guard Burst"
            row[Fheaders[13]],//"Notes"
        ]);
    });

    var vDom = `
                <"row mx-0"
                    <"col-6"l>
                    <"col-6 px-0 float-right"B>
                    
                >
                rt
                <"row fixed-bottom mx-0 bg-light"
                    <"col-6"i>
                    <"col-6 px-0 float-right"p>
                >
    `;
    
    Dtable = $('#fdata').DataTable({
        // initComplete: function(settings, json){
        //     console.log("Finished")
        // },
        data: vData,
        columns: [
            { title: Fheaders[0] },//"Character"
            { title: Fheaders[1] },//"Move category"
            { title: Fheaders[2] },//"Move Name"
            { title: Fheaders[3] },//"Stance"
            { title: Fheaders[4] },//"Command"
            { title: Fheaders[5] },//"Hit level"
            { title: Fheaders[6] },//"Impact",
            { title: Fheaders[7] },//"Damage",
            { title: Fheaders[8] },//"Sum(Damage)"
            { title: Fheaders[9] },//"Block",
            { title: Fheaders[10] },//"Hit",
            { title: Fheaders[11] },//"Counter Hit"
            { title: Fheaders[12] },//"Guard Burst"
            { title: Fheaders[13] },//"Notes"
        ],

        dom: vDom,
        
        buttons: [
            "colvis",
            "csv",
            "excel",
            {
                text: "Command search",
                action: function () {
                    $("#commandSearchModal").modal("show");
                }
            },
            "searchBuilder",

        ],

        bProcessing: true,
        orderCellsTop: true,
        responsive: true,
        fixedHeader: true,

        pageLength: 15,
        lengthMenu: [[10, 15, 20, 30, 40, 50, -1], [10, 15, 20, 30, 40, 50, "All"]],

        scrollCollapse: true,
        scrollX: true,
        //scrollY: '1vh',
        scrollY: true,
          
        colReorder: {
            realtime: false
        },
        columnDefs: [
            {targets: 0, visible: true},//Character
            {targets: 1, visible: false},//Move category
            {targets: 2, visible: false},//Move Name
            {
                targets: 3, 
                visible: true,
                className: 'dt-body-right'
            },//Stance
            {
                targets: 4, 
                visible: true,
                width: "10%",
                render: function(data, type, row){
                    var value = data;
                    for (let index = 0; index < CommandIcons.length; index++) {
                        value = value.replaceAll(CommandIcons[index][0], CommandIcons[index][1])
                    }
                    value = value.replaceAll("_", '<img width="10" height="20" src="Icons/underscore.png" value = "_"></img>');
                    return value + `<p class="superHidden"> ${data} </p>`;
                }
            },//Command
            {
                targets: 5, visible: true,
                render: function(data, type, row){
                    var value = data;
                    for (let index = 0; index < HeightIcons.length; index++) {
                        value = value.replaceAll(HeightIcons[index][0], HeightIcons[index][1])
                    }
                    value = value.replaceAll("_", "");
                    return value + `<p class="superHidden"> ${data} </p>`;
                }
            },//Hitlevel
            {targets: 6, visible: true},//impact
            {targets: 7, visible: false},//Damage
            {targets: 8, type: 'numeric-comma'},//Sum damage
            {targets: 13, 
                visible: true,
                render: function(data, type, row){
                    value = data;
                    for (let index = 0; index < NotesIcons.length; index++) {
                        value = value.replaceAll(NotesIcons[index][0], NotesIcons[index][1])
                    }
                    return value;
                }
            },//Notes
        ],

        searchBuilder: {
            columns: [3,4,5],
        },
    });
    

    Dtable.searchBuilder.rebuild({
        criteria:[
            {
                condition: '=',
                data: 'Character',
                type: 'string',
                value: [Filters.CharacterFilter]
            },
        ],
        logic: 'AND'
    });

    //Dtable.columns(0).search(Filters.CharacterFilter).draw()
}


function refreshFrameData(){
    if(Dtable !== undefined){
        Dtable.destroy();
        $("#fdata").html("");
    }
    downloadFrameData();
}

$(document).ready(function() {
    Filters.getUrlParameters();

    //Options for toastr
    toastr.options = {
        "closeButton": true,
        "newestOnTop": false,
        "positionClass": "toast-middle-left",
        "preventDuplicates": false,
        "onclick": null,
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    //#region Buttons
    $("#btnRefreshFramedata").on("click", refreshFrameData);

    $("#btnCredits").on("click", function(){
        $("#creditModal").modal("show");
    });
    //#endregion

    //
    if (localStorage.hasOwnProperty("Fdata")) {
        createTable(JSON.parse(localStorage.Fdata));
    } else {
        downloadFrameData();
    }
      
    
});
    