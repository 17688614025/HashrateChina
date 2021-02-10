export default {
  backgroundColor: '#000',
  globe: {

    environment: '../../asset/starfield.png',

    // heightTexture: '/data-gl/asset/bathymetry_bw_composite_4k.jpg',

    displacementScale: 0.05,
    displacementQuality: 'high',

    baseColor: '#000',

    shading: 'realistic',
    realisticMaterial: {
      roughness: 0.2,
      metalness: 0
    },

    postEffect: {
      enable: true,
      depthOfField: {
        // enable: true
      }
    },
    light: {
      ambient: {
        intensity: 0
      },
      main: {
        intensity: 0.1,
        shadow: false
      },
      ambientCubemap: {
        // texture: '/data-gl/asset/lake.hdr',
        exposure: 1,
        diffuseIntensity: 0.5,
        specularIntensity: 2
      }
    },
    viewControl: {
      autoRotate: false
    },

    layers: [{
      type: 'blend',
      blendTo: 'emission',
      texture: contourChart,
      intensity: config.intensity
    }]
  }
}
