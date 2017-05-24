/**
 * Created by cmcrae on 5/9/17.
 */
import './mapTest.html';
import {GoogleMaps} from 'meteor/dburles:google-maps';
import {Session} from 'meteor/session';

Template.mapTest.onCreated(function(){
    //Put publications / subscription information here

    //Load in fake data. Replace this with real data eventually

    let myMarkers = [
        {lat: 5, lng: 112, title: 'first'}
        //{lat: 5.5, lng: 112, title: 'second'},
        //{lat: 5, lng: 111.5, title: 'third'},
    ];

    GoogleMaps.ready('exampleMap', function(map) {
        myMarkers.map(function(marker){
            let temp = new google.maps.Marker({
                position: new google.maps.LatLng(marker.lat,marker.lng),
                map: map.instance,
                title: marker.title,
                clickable: true
            });
            let infowindow = new google.maps.InfoWindow({
                content: '<div><h1>I am the info!</h1><span style="color:red">Some bad dudes</span></div>'
            });
            temp.addListener('click', function(event){
                infowindow.open(map.instance, temp);
            });
        });

        google.maps.event.addListener(map.instance, 'click', function(event) {
            //Check what the type of marker is
            let mylat = event.latLng.lat();
            let mylng = event.latLng.lng();

            let temp = new google.maps.Marker({
                position: new google.maps.LatLng(mylat,mylng),
                map: map.instance,
                clickable: true
            });

            let infowindow = new google.maps.InfoWindow({
                content: 'Hello I am info window change me into HTML!!!!'
            });
            temp.addListener('click', function(event){
                infowindow.open(map.instance, temp);
            });

            //Maybe set lines or no lines
            if(Session.get('marker-lines')){
                let myLine = new google.maps.Polyline({
                    path : [{lat: 5, lng: 112}, {lat: mylat, lng: mylng}],
                    geodesic: true,
                    strokeColor: '#000000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });
                myLine.setMap(map.instance);
            }
        });

        google.maps.event.addListener(map.instance, 'rightclick', function(event) {
            //Check what the type of marker is
            let mylat = event.latLng.lat();
            let mylng = event.latLng.lng();

            //ability to choose icon
        });
    });
});

Template.mapTest.onRendered(function(){
    GoogleMaps.load({
        v: '3',
        key: 'AIzaSyBH4-LYFgDBuDU_ZvaT7pTZu9JrJjSQqBE',
        libraries: 'geometry,places'
    });
});

Template.mapTest.helpers({
    myfunc() {
        return "Value";
    },
    exampleMapOptions(){
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(5,112),
                zoom: 7,
                name: 'exampleMap'
            };
        }
    }
});

Template.mapTest.events({
    'click .getLatLong': function(){
        console.log(JSON.stringify(GoogleMaps.maps.exampleMap.options.center.toJSON()));
    }
});

