import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {


  @ViewChild('mapElement')
  mapElement!: ElementRef;

  @ViewChild('currentLocation')
  currentLoc!: ElementRef;

  @ViewChild(' rectangle')
  recang!: ElementRef;

  @ViewChild(' circle')
  cir!: ElementRef;

  @ViewChild(' polyline')
  poly!: ElementRef;

  @ViewChild(' polygon')
  plgon!: ElementRef;

  @ViewChild(' tools')
  tols!: ElementRef;

  @ViewChild(' geocode')
  gcode!: ElementRef;

  map!: google.maps.Map;
  infoWindow!: google.maps.InfoWindow;
  marker!: google.maps.Marker;
  reacangle!: google.maps.Rectangle;
  circle!: google.maps.Circle;
  polyline!: google.maps.Polyline;
  polygon!: google.maps.Polygon;
  drawingManager!: google.maps.drawing.DrawingManager;
  geocoder!: google.maps.Geocoder;
  markers: any[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapInit();
  }

  /*-------------   Map initilize   ----------------*/

  mapInit = () => {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 4,
      center: { lat: 22.055925764046314, lng: 78.01832977322736 },
      streetViewControl: false,
      mapTypeControl: false,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,

    })

    //-------------   Click to get LatLng    ----------------

    /*
       google.maps.event.addListener(this.map, 'click', (e: any) => {
          // this.clickTogetLatLng(e.latLng);
          // this.addMarker(e.latLng);

          //-------------   Click to Add Marker, show infoWindow and get latlng     ----------------

          this.marker = new google.maps.Marker({
            position: e.latLng,
            map: this.map,
            draggable: true,

          })

          for (let i = 0; i < this.markers.length; i++) {

            // google.maps.event.addListener(this.markers[i], 'click', () => {

            //   this.infoWindow = new google.maps.InfoWindow({
            //     position: e.LatLng,
            //     content: JSON.stringify(e.latLng.toJSON(), null, 2),
            //   })
            //   this.infoWindow.open(this.map, this.markers[i]);

            // })

            this.infoWindow = new google.maps.InfoWindow({
              position: e.LatLng,
              content: JSON.stringify(this.markers[i].position.toJSON(), null, 2),
            })

            this.infoWindow.open(this.map, this.markers[i]);
            // console.log(JSON.stringify(e.latLng.toJSON(), null, 2));
            // console.log(this.markers[i]);
            console.log(i + '::' + this.markers[i].position);

          }
          this.markers.push(this.marker);
          // console.log(this.markers);



        })

    */

    //-------------   setCurrent Location   ----------------

    // let currentLocation = this.currentLoc.nativeElement;
    // currentLocation.addEventListener('click', this.getLocation)



    // ---------------------------------------------- Draw Shapes -------------------------------------------------

    //----------------------------------------   Click to  Add rectangle ------------------------------------------

    let rc = this.recang.nativeElement
    rc.addEventListener('click', this.addRectangle);

    //----------------------------------------   Create a rectangle ------------------------------------------

    // const rectangle = new google.maps.Rectangle({
    //   strokeColor: "#FF0000",
    //   strokeOpacity: 0.8,
    //   strokeWeight: 2,
    //   fillColor: "#FF0000",
    //   fillOpacity: 0.35,
    //   map: this.map,
    //   bounds: new google.maps.LatLngBounds(
    //     new google.maps.LatLng(22.055925764046314, 78.01832977322736),
    //     new google.maps.LatLng(23.055925764046314, 80.01832977322736))
    // });

    //----------------------------------------   Click to  Add Circle ------------------------------------------
    let circle = this.cir.nativeElement;
    circle.addEventListener('click', this.addCircle);

    //----------------------------------------   Click to  Add Polylines ------------------------------------------
    let polyline = this.poly.nativeElement;
    polyline.addEventListener('click', this.addPolyline);

    //----------------------------------------   Click to  Add Polygons ------------------------------------------
    let polygons = this.plgon.nativeElement;
    polygons.addEventListener('click', this.addPolygons);

    //----------------------------------------   Click to  Add Tools ------------------------------------------
    let tools = this.tols.nativeElement;
    tools.addEventListener('click', this.addTools);

    //----------------------------------------   Click to  Add Geocode ------------------------------------------
    let geocode = this.gcode.nativeElement;
    geocode.addEventListener('click', this.addGeocode);


  }

  //-------------   Click to Add Marker    ----------------
  addMarker = (loc: any) => {
    // console.log(loc.lat());
    if (this.marker) {
      this.marker = new google.maps.Marker({
        position: loc,
        map: this.map,
        label: 'A',
        title: `loc ${loc.lat()} ${loc.lng()} `,
        draggable: true,
      })

      let pos = new google.maps.LatLng(loc.lat(), loc.lng())
      this.infoWindow = new google.maps.InfoWindow();

      google.maps.event.addListener(this.marker, 'mouseover', () => {
        this.infoWindow.setPosition(pos);
        this.infoWindow.setContent(` ${loc.lat()} - ${loc.lng()} `);
        this.infoWindow.open(this.map, this.marker);
        // this.map.panTo(pos)
      })
      console.log(loc);

    }

  }


  /*-------------   Click to get LatLng    ----------------*/
  clickTogetLatLng = (location: any) => {
    if (this.marker) {
      this.marker.setPosition(location)
      // console.log(location.lat() + '::' + location.lng());
    } else {
      this.marker = new google.maps.Marker({
        position: location,
        draggable: true,
      })
      google.maps.event.addListener(this.marker, 'dragend', (l: any) => {
        console.log(l.LatLng.lat());
      })
    }


  }

  // ------------------------- Marker Icons --------------------------------
  svgMarker: any = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "red",
    fillOpacity: 0.9,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };


  // ------------------------- Getcurrent Location --------------------------------
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // ------------------------- Marker Options --------------------------------
        this.marker = new google.maps.Marker({
          position: new google.maps.LatLng(pos.lat, pos.lng),
          map: this.map,
          label: 'a',
          icon: this.svgMarker,
          // draggable: true,
          title: 'Current position' + pos.lat + "," + pos.lng
        });

        // ------------------------- InfoWindow --------------------------------------
        this.infoWindow = new google.maps.InfoWindow({
          position: pos,
          content: 'Current position' + pos.lat + "," + pos.lng,
        });
        // ------------------------- Navigate the map to current position --------------------------------

        this.map.setZoom(10)
        this.map.setCenter(pos);

        // ------------------------- current position adding a Marker and InfoWindow ---------------------

  /*click function*/     // google.maps.event.addListener(this.marker, 'click', () => this.infoWindow.open(this.map, this.marker));

  /*Mouseover function*/     google.maps.event.addListener(this.marker, 'mouseover', () => {
          this.infoWindow.open(this.map, this.marker)
        });
  /*Mouseout function*/        google.maps.event.addListener(this.marker, 'mouseout', () => this.infoWindow.close());
      })
    }

  }
  // ---------------------------------------------- Draw Shapes -------------------------------------------------

  //-------------   Click to  Add rectangle    ----------------
  addRectangle = () => {
    this.reacangle = new google.maps.Rectangle({
      map: this.map,
      fillColor: 'yellow',
      strokeColor: 'red',
      strokeWeight: 2,
      fillOpacity: 0.5,
      draggable: true,
      editable: true,
      // --------------------
      // bounds: {
      //   north: 22.055925764046314,
      //   south: 23.055925764046314,
      //   east: 78.01832977322736,
      //   west: 80.01832977322736,
      // }
      // "south": , "west": , "north": , "east":

      bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(10.110672914902935, 58.33789559073244),
        new google.maps.LatLng(20.6733684603117, 76.83969077135518)
      )
    })
    // ------------------------------------- Get latLng using dragend --------------------------------------------
    google.maps.event.addListener(this.reacangle, 'dragend', (e: any) => console.log(this.reacangle.getBounds())
    )
    // ------------------------------------- Get latLng using click --------------------------------------------

    google.maps.event.addListener(this.reacangle, 'click', (e: any) => console.log(e.latLng)
    )


  }
  //-------------   Click to  Add Circle   ----------------
  addCircle = () => {
    let latlng = new google.maps.LatLng(27.055925764046314, 75.01832977322736)
    this.circle = new google.maps.Circle({
      fillColor: 'yellow',
      fillOpacity: 0.6,
      strokeColor: 'red',
      strokeWeight: 1,
      center: latlng,
      radius: 80000,
      draggable: true,
      editable: true,
      map: this.map
    })
    this.map.setZoom(5)
    // this.map.setCenter(latlng)
    this.map.panTo(latlng)

    this.infoWindow = new google.maps.InfoWindow({})

    google.maps.event.addListener(this.circle, 'click', (e: google.maps.LatLng) => {

      this.infoWindow.open(this.map)
      this.infoWindow.setPosition(this.circle.getCenter())
      this.infoWindow.setContent(`
      ${JSON.stringify(this.circle.getCenter())}
      ${JSON.stringify(this.circle.getBounds())}
      ${JSON.stringify(this.circle.getRadius())}
      `)
    })
    this.circle.addListener('drag', () => {
      this.infoWindow.close()
      this.infoWindow.open(this.map)
      this.infoWindow.setPosition(this.circle.getCenter())
      this.infoWindow.setContent(`
      ${JSON.stringify(this.circle.getCenter())}
      ${JSON.stringify(this.circle.getBounds())}
      ${JSON.stringify(this.circle.getRadius())}
      `)
      // console.log(this.circle.getCenter())
      // console.log(this.circle.getBounds())

      // console.log(JSON.stringify(this.circle.getCenter()));

    })
  }
  //-------------   Click to  Add Polylines   ----------------
  addPolyline = () => {


    // /* Normal Array */  let destination: google.maps.LatLng[] = [];
    /* MVC Array */let destination: any = new google.maps.MVCArray();

    destination.push(new google.maps.LatLng(13.331495421922959, 80.34594845586608));
    destination.push(new google.maps.LatLng(14.860769579657262, 84.56112931545789));
    destination.push(new google.maps.LatLng(13.31986072050784, 88.08501077273671));
    destination.push(new google.maps.LatLng(20.52781626562086, 92.442642075329));


    this.polyline = new google.maps.Polyline({
      path: destination,
      strokeColor: 'red',
      strokeWeight: 5,
      strokeOpacity: 0.5,
      // editable: true,
      // draggable: true,
    })

    //------------- Bounds to the placs ----------------

    let bounds = new google.maps.LatLngBounds();
    let po = destination.Be;
    for (let i = 0; i < po.length; i++) {
      let loc = new google.maps.LatLng(po[i].lat(), po[i].lng())
      bounds.extend(loc)
    }

    this.map.setZoom(9);
    this.map.fitBounds(bounds);

    this.polyline.setMap(this.map)

    this.infoWindow = new google.maps.InfoWindow()
    this.marker = new google.maps.Marker();


    this.polyline.addListener('click', (e: google.maps.MapMouseEvent) => {
      this.infoWindow.setPosition(e.latLng);
      this.infoWindow.setContent(`${JSON.stringify(e.latLng)}`)
      this.marker = new google.maps.Marker({
        position: e.latLng,
        map: this.map
      });

      this.marker.addListener('click', () => {

        this.infoWindow.open(this.map, this.marker)
      }
      )
      // console.log(JSON.stringify(e.latLng));
    })

    //------------- Dynamic Draw Polylines ----------------

    google.maps.event.addListener(this.map, 'click', (e: google.maps.MapMouseEvent) => {

      let currentPath = this.polyline.getPath();
      currentPath.push(e.latLng);

      this.infoWindow.setContent(`${JSON.stringify(e.latLng)}`)
      this.marker.setPosition(e.latLng);
      this.marker.setMap(this.map)
      this.infoWindow.open(this.map, this.marker)
    })

  }

  //-----------------------------   Click to  Add Polylines   ------------------------------------
  addPolygons = () => {

 /* MVC Array */let destination: any = new google.maps.MVCArray();

    destination.push(new google.maps.LatLng(13.331495421922959, 80.34594845586608));
    destination.push(new google.maps.LatLng(14.860769579657262, 84.56112931545789));
    destination.push(new google.maps.LatLng(13.31986072050784, 88.08501077273671));
    destination.push(new google.maps.LatLng(20.52781626562086, 92.442642075329));

    this.polygon = new google.maps.Polygon({
      paths: destination,
      fillColor: 'blue',
      fillOpacity: 0.5,
      strokeColor: 'red',
      strokeOpacity: 0.5,
      strokeWeight: 4,
    })
    this.polygon.setMap(this.map)

    let bounds = new google.maps.LatLngBounds();
    let po = destination.Be;
    for (let i = 0; i < po.length; i++) {
      let loc = new google.maps.LatLng(po[i].lat(), po[i].lng())
      bounds.extend(loc)
    }

    this.map.setZoom(9);
    this.map.fitBounds(bounds);
    google.maps.event.addListener(this.map, 'click', (e: google.maps.MapMouseEvent) => {
      let currentPosition = this.polygon.getPath();
      currentPosition.push(e.latLng)
    })
  }

  addTools = () => {
    let shapeOption = {
      fillColor: 'blue',
      strokeColor: 'red',
      strokeWeight: 6,
      editable: true,
      draggable: true
    }
    this.drawingManager = new google.maps.drawing.DrawingManager({
/* Default selected tool*/      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.CIRCLE,
          google.maps.drawing.OverlayType.MARKER,
          google.maps.drawing.OverlayType.POLYGON,
          google.maps.drawing.OverlayType.POLYLINE,
          google.maps.drawing.OverlayType.RECTANGLE,
        ]
      },
      circleOptions: shapeOption,
      rectangleOptions: shapeOption,
      polygonOptions: shapeOption,
      map: this.map
    });

    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (e: any) => {
      console.log(e);
      console.log(e.overlay);
      console.log(e.overlay.position);
      // only learning purposs only this code how to do
      // var isNotMarker = (e.type != google.maps.drawing.OverlayType.MARKER);
      // this.drawingManager.setDrawingMode(null);
      // var newShape = e.overlay;
      // newShape.type = e.type;
      // google.maps.event.addListener(newShape, 'click', function () {
      //   console.log(newShape);

      // });
      // google.maps.event.addListener(newShape, 'drag', function () {
      //   console.log(newShape);
      // });
      // google.maps.event.addListener(newShape, 'dragend', function () {
      //   console.log(newShape);
      // });


    })
  }

  addGeocode = () => {
    this.map.setZoom(5)
    this.map.panTo({ "lat": 24.317881106081785, "lng": 78.10622039822736 })
    this.marker = new google.maps.Marker({
      position: { "lat": 24.317881106081785, "lng": 78.10622039822736 },
      map: this.map
    })
    this.infoWindow = new google.maps.InfoWindow({
      position: { "lat": 24.317881106081785, "lng": 78.10622039822736 },
      content: `{ "lat": 24.317881106081785, "lng": 78.10622039822736 }`,
    })
    this.marker.addListener('click', () => {
      this.infoWindow.open(this.map, this.marker)
    })


    this.geocoder = new google.maps.Geocoder();

    this.map.addListener('click', (e: google.maps.MapMouseEvent) => {

      this.geocoder.geocode({ location: e.latLng }).then((response) => {
        console.log(response);
        console.log('log-1');

      })


      console.log('log-2');


      this.marker.setPosition(e.latLng);
      this.marker.setMap(this.map);
      this.infoWindow.setPosition(e.latLng);
      this.infoWindow.setContent(JSON.stringify(e.latLng))
      this.marker.addListener('click', () => {
        this.infoWindow.open(this.map, this.marker)
      })
    }
    )
    // console.log(this.geocoder);
  }
  ngOnInit(): void { }

}




