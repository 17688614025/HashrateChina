export default {
  backgroundColor: 'transparent',
  series: [
    {
      type: 'map',
      map: 'china',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      //   environment: '#000',
      boundingCoords: [
        [-180, 90],
        [180, -90]
      ],
      label: {
        normal: {
          show: false,
          fontSize: 4,
          lineHeigh: 4,
          color: '#000'
        }
      },
      itemStyle: {
        normal: {
          areaColor: 'transparent',
          borderWidth: 1,
          borderType: 'solid',
          borderColor: '#a85000'
        }
      }
    }
  ]
}
