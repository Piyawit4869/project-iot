import { ThemeConfig } from 'antd';
import { CSSProperties } from 'react';

export const ThemeColors = {
  primaryColor: '#E46F1B',
  brickOrangeColor: '#EC8235',
  orangeColor: '#EE9437',
  lightOrangeColor: '#EFAB3A',
  goldColor: '#F0BA3D',
  yellowColor: '#F3D840',
  whiteColor: '#ffffff',
  blackColor: '#000000',
  bgColor: '#FFF5ED',
  darkColor: '#2B2B2B',
  greenColor: '#22BE7D',
  waringColor: '#EA5959',
  saveDraftColor: '#4CBFFF',
  lightYellowColor: '#fbffd1',
  lightGreenColor: '#d8e6d9',
  darkorangeColor: '#E46F1B',
  grayColor: '#727272',
  blueColor: '#4CBFFF',
  fontColor1: '#ffffff',
  fontColor2: '#000000',
  fontColor3: '#727272',
  fontColor4: '#19142A',
  VerydarkmostlyblackblueColor: '#19142A',
};

export const styles: Record<string, CSSProperties> = {
  input: {
    borderRadius: '10px',
    border: '1px solid #ccc',
    padding: '10px',
    // fontFamily: "Arial, sans-serif",
  },
};

export const Config = {
  ThemeColorsV2: {
    token: {
      colorPrimary: '#19142a',
      colorInfo: '#19142a',
      colorSuccess: '#52c41a',
      colorWarning: 'rgb(226, 49, 54)',
      colorTextBase: '#19142a',
    },
    components: {
      Card: {
        colorBgContainer: '#19142A',
      },
      Menu: {
        itemSelectedBg: '#19142A',
        itemSelectedColor: '#ffffff',
        itemColor: 'grey',
        itemHoverColor: 'lightGrey',
      },

      Calendar: {
        controlItemBgActive: '#f2f2f2',
      },
      Select: { optionSelectedBg: '#19142A', optionSelectedColor: '#ffffff' },
      Layout: {
        siderBg: '#f2f2f2',
        headerBg: '#ffffff',
      },
      Table: {
        headerBg: '#19142A',
        headerColor: 'rgba(255, 255, 255, 0.88)',
        headerSortHoverBg: '#A79DB4',
        headerSortActiveBg: '#19142A',
        colorPrimary: '#ffffff',
      },
      Segmented: { itemSelectedBg: '#19142A', itemSelectedColor: '#ffffff' },
    },
    Button: {
      defaultColor: 'rgb(25, 20, 42)',
      colorPrimaryHover: 'rgb(25, 20, 42)',
      colorPrimaryBorder: 'rgb(25, 20, 42)',
      colorPrimaryActive: 'rgb(25, 20, 42)',
      colorLinkHover: 'rgb(25, 20, 42)',
      colorLinkActive: 'rgb(25, 20, 42)',
      colorText: 'rgb(25, 20, 42)',
      defaultActiveBorderColor: 'rgb(25, 20, 42)',
      defaultActiveColor: 'rgb(25, 20, 42)',
      defaultHoverBorderColor: 'rgb(25, 20, 42)',
      defaultHoverColor: 'rgb(25, 20, 42)',
      groupBorderColor: 'rgb(25, 20, 42)',
      colorPrimary: 'rgb(25, 20, 42)',
      colorErrorHover: 'rgb(226, 49, 54)',
      colorErrorActive: 'rgb(226, 49, 54)',
      colorError: 'rgb(226, 49, 54)',
    },
  } as ThemeConfig,
};
