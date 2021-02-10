export default {
  // backgroundColor: 'rgba(3,28,72,0.3)',
  backgroundColor: 'transparent',
  title: {
    show: true
  },
  geo: {
    type: 'map',
    map: 'world',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    boundingCoords: [
      [-180, 90],
      [180, -90]
    ],
    zoom: 0,
    roam: false,
    itemStyle: {
      borderColor: '#000d2d',
      normal: {
        areaColor: '#2455ad',
        borderColor: '#000c2d'
      },
      emphasis: {
        areaColor: '#357cf8'
      }
    },
    label: {
      fontSize: 24
    }
  },
  series: []
}
