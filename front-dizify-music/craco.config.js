/* eslint-disable @typescript-eslint/no-var-requires */
const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#FF4E7B',
              '@secondary-color': '#513CFF',
              '@link-color': '#232323',
              '@font-family': 'GreycliffCF, Helvetica, Arial, sans-serif',
              '@avatar-font-size-base': '14px',
              '@slider-rail-background-color': '#D4D4D4',
              '@slider-rail-background-color-hover': '#D4D4D4',
              '@slider-track-background-color': '#FF4E7B',
              '@slider-track-background-color-hover': '#FF4E7B',
              '@slider-handle-color': '#FF4E7B',
              '@slider-handle-color-hover': '#FF4E7B',
              '@slider-handle-color-focus': 'tint(#FF4E7B, 20%)',
              '@slider-handle-color-focus-shadow': 'fade(#FF4E7B, 12%)',
              '@slider-handle-color-tooltip-open': '#FF4E7B',
              '@input-placeholder-color': '#232323',
              '@select-item-selected-color': '#232323',
              '@checkbox-check-bg': '#FFF',
              '@checkbox-color': '#FFF',
              '@checkbox-check-color': '#513CFF',
              '@table-header-bg': '#FFF',
              '@table-header-color': '#8C8C8C',
              '@table-header-sort-active-bg': '#f5f5f5',
              '@table-padding-vertical': '2px',
              '@tabs-card-head-background': 'transparent',
              '@tabs-card-active-color': '#OOO',
              '@btn-default-color': '#513CFF',
              '@btn-default-bg': 'transparent',
              '@btn-default-border': '#513CFF',
              '@input-number-hover-border-color': '#513CFF',
              '@input-hover-border-color': '#513CFF',
              '@input-disabled-bg': '#F5F5F5',
              '@input-disabled-color': '#D9D9D9',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
