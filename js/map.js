//--------------------
//--Global Variables--
//--------------------
var geocoder;
var map;
var zipcode;
var city;
var address;
var serviceURL = "http://services.brighthouse.stage/sbm/SBMDataService.svc/";
var serviceTimeout = 50000;
var ps = new pageState();
var sc = new serviceCalls();
var pcu = new pageControlUtilities();
var searchOrigin;
var markers = [];
//End Global Variables


//-------------------
//--Utility Methods--
//-------------------


//--End Utility Methods--


//-----------------------------
//--Page State Object Methods--
//-----------------------------
function pageState() {

    this.PerformSearch = PerformSearch;

    //Submit event method for the search criteria
    function PerformSearch() {
        clearMarkers();
        sc.getListingsByLatLng();
    }




}
//End Page State Methods


//-----------------
//--Service Calls--
//-----------------
function serviceCalls() {

    this.getListingsByLatLng = getListingsByLatLng;
    //Calls out to the service for the selected remote's details
    function getListingsByLatLng() {
        if (searchOrigin != null && searchOrigin != '') {

            $.when($.ajax({
                type: "GET",
                url: serviceURL + "GetListingDetailsByPosition/?lat=" + searchOrigin.lat() + "&lng=" + searchOrigin.lng() + "&cat=" + $('#BusinessCategory').val() + "&top=" + $('#BusinessCount').val(),
                cache: false,
                dataType: "jsonp",
                timeout: serviceTimeout
            }).then(function (data, textStatus) {

                if (data != null && textStatus == "success") {
                    
                    var parsed = JSON.parse(data)
                    
                    //alert(parsed[0].CompanyName);

                    $('#count').html(parsed.length + ' businesses matched your search criteria');

                    for (var j = 0; j < parsed.length; j++) {
                        var latlng = new google.maps.LatLng(parsed[j].Lat, parsed[j].Lng);
                        var infoWindowContent = pcu.buildBusinessInfoWindow(parsed[j]);

                        if ($('#Distance').val() != 0) {
                            if (parsed[j].Distance < $('#Distance').val()) {
                                placeInfoWindow(latlng, infoWindowContent, parsed[j].CompanyName);
                            }
                        } else {
                            placeInfoWindow(latlng, infoWindowContent, parsed[j].CompanyName);
                        }

                        
                    }

                    


                }
            }

        ).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("Sorry, no listings matched your search criteria.  Please adjust your search and try again.");
            alert(errorThrown);
        }));

        } else {
            //enforce the zip code entry
            alert("Please specify a zip code to search.");
        }
    }


    this.codeAddress = codeAddress;
    function codeAddress() {
        address = $('#Zip').val();
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                alert(results[0].geometry.location);
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    }




}
//End service calls

//--------------------------
//--Page Control Utilities--
//--------------------------
function pageControlUtilities() {



    this.buildBusinessInfoWindow = buildBusinessInfoWindow;
    //creates the display content for a given info window
    function buildBusinessInfoWindow(parsedJSONResult) {
        var contentString = '<div id="content">' +
              '<h1 id="firstHeading" class="firstHeading">' + parsedJSONResult.CompanyName + '</h1>' + '<div id="bodyContent"><p>' +
              'Phone: <a href="tel:' + parsedJSONResult.Phone + '">' + parsedJSONResult.Phone + '</a><br />' +
              parsedJSONResult.StreetAddress + '<br />' +
              parsedJSONResult.City + ', ' + parsedJSONResult.State + ' ' + parsedJSONResult.Zip + '<br />';
        if (parsedJSONResult.WebSite != null && parsedJSONResult.WebSite != '') {
            contentString += '<a href="' + parsedJSONResult.WebSite + '" target="_new">' + parsedJSONResult.WebSite + '</a><br /><br />';
        }
        contentString += '<a href="#">More details &#187;</a>' + '</p></div></div>';
        return contentString;
    }


}
//End Page Control Utilities
