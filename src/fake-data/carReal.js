// const mapInitial = {
//     lat: 10.726909,
//     lng: 106.616678
// }

// var list = []

// for(var i=0;i<100;i++){
//   list.push({
//       id: i,
//       code: 'Point ' + i,
//       mapLocation: {
//           lat: mapInitial.lat + parseFloat(('0.0'+i)),
//           lng: mapInitial.lng + parseFloat(('0.0'+i))
//       },
//       district: 'Quận Bình Tân'
//   })
// }

// export default list;
import carStatus from 'constants/carStatus'

export default [
  {
    id: 1,
    name: '51D13904',
    mapLocation: { lat: 10.792709, lng: 106.653746 },
    status: carStatus.OFFLINE,
    listLocation: [
      {
        lat: 10.792709,
        lng: 106.653746
      },
      {
        lat: 10.793379,
        lng: 106.653854
      },
      {
        lat: 10.795289,
        lng: 106.655643
      },
      {
        lat: 10.797863,
        lng: 106.658353
      },
      {
        lat: 10.800016,
        lng: 106.660661
      },
      {
        lat: 10.79705,
        lng: 106.664577
      },
      {
        lat: 10.791833,
        lng: 106.662062
      },
      {
        lat: 10.789049,
        lng: 106.660616
      },
      {
        lat: 10.792718,
        lng: 106.653683
      }
    ],
    district: 'Quận Bình Tân'
  },
  {
    id: 2,
    name: '51D13020',
    mapLocation: { lat: 10.775094, lng: 106.647876 },
    status: carStatus.RUNNING,
    listLocation: [
      {
        lat: 10.775755,
        lng: 106.64735
      },
      {
        lat: 10.776622,
        lng: 106.646693
      },
      {
        lat: 10.777557,
        lng: 106.646028
      },
      {
        lat: 10.778416,
        lng: 106.64543
      },
      {
        lat: 10.779449,
        lng: 106.644711
      },
      {
        lat: 10.780643,
        lng: 106.643853
      },
      {
        lat: 10.781668,
        lng: 106.64322
      },
      {
        lat: 10.782667,
        lng: 106.642799
      },
      {
        lat: 10.783932,
        lng: 106.64241
      },
      {
        lat: 10.785379,
        lng: 106.641903
      },
      {
        lat: 10.786662,
        lng: 106.641367
      },
      {
        lat: 10.7877,
        lng: 106.640991
      },
      {
        lat: 10.787018,
        lng: 106.644093
      },
      {
        lat: 10.787678,
        lng: 106.645343
      },
      {
        lat: 10.788015,
        lng: 106.64648
      },
      {
        lat: 10.786921,
        lng: 106.647907
      },
      {
        lat: 10.785771,
        lng: 106.649461
      },
      {
        lat: 10.785534,
        lng: 106.65107
      },
      {
        lat: 10.783325,
        lng: 106.650707
      },
      {
        lat: 10.7821,
        lng: 106.650075
      },
      {
        lat: 10.779181,
        lng: 106.649914
      },
      {
        lat: 10.777031,
        lng: 106.64971
      },
      {
        lat: 10.774934,
        lng: 106.648122
      }
    ],
    district: 'Quận Bình Tân'
  },
  {
    id: 3,
    name: '51D12171',
    mapLocation: { lat: 10.775502, lng: 106.727618 },
    status: carStatus.RUNNING,
    listLocation: [
      {
        lat: 10.775502,
        lng: 106.727618
      },
      {
        lat: 10.776412,
        lng: 106.729375
      },
      {
        lat: 10.777837,
        lng: 106.732164
      },
      {
        lat: 10.778901,
        lng: 106.734194
      },
      {
        lat: 10.780197,
        lng: 106.736721
      },
      {
        lat: 10.781699,
        lng: 106.73965
      },
      {
        lat: 10.785526,
        lng: 106.747163
      },
      {
        lat: 10.786982,
        lng: 106.749688
      },
      {
        lat: 10.78882,
        lng: 106.751129
      },
      {
        lat: 10.791386,
        lng: 106.751826
      },
      {
        lat: 10.79401,
        lng: 106.752282
      },
      {
        lat: 10.801472,
        lng: 106.753557
      },
      {
        lat: 10.805813,
        lng: 106.754333
      },
      {
        lat: 10.806308,
        lng: 106.754054
      },
      {
        lat: 10.806176,
        lng: 106.753265
      },
      {
        lat: 10.804126,
        lng: 106.751532
      },
      {
        lat: 10.80244,
        lng: 106.745915
      },
      {
        lat: 10.800706,
        lng: 106.736321
      },
      {
        lat: 10.798503,
        lng: 106.724895
      },
      {
        lat: 10.795341,
        lng: 106.718343
      },
      {
        lat: 10.790527,
        lng: 106.717834
      },
      {
        lat: 10.789336,
        lng: 106.71652
      },
      {
        lat: 10.781725,
        lng: 106.72061
      },
      {
        lat: 10.777754,
        lng: 106.722471
      },
      {
        lat: 10.773296,
        lng: 106.722752
      }
    ],
    district: 'Quận Bình Tân'
  },
  {
    id: 5,
    name: '51D10371',
    mapLocation: { lat: 10.775502, lng: 106.727618 },
    status: carStatus.OFFLINE,
    district: 'Quận Bình Tân'
  },
  {
    id: 6,
    name: '57K0620',
    mapLocation: { lat: 10.775502, lng: 106.727618 },
    status: carStatus.RUNNING,
    district: 'Quận Bình Tân'
  }
]
