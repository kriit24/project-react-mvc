import { StyleSheet, Dimensions, Platform } from 'react-native';

const width = Dimensions.get('window').width; //full width

const css = StyleSheet.create({
  dimensions: (normal, less) => {
    if (width <= 370) {
      return { ...normal, ...less };
    }
    return normal;
  },
  debug: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'red',
  },
  content: {
    padding: 5,
    alignItems: 'stretch',
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  content_fit_to_text: {
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 10,
  },
  form_control: {
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ced4da',
    color: 'grey',
    direction: 'ltr',
  },

  color_success: {
    color: '#259041',
  },

  color_warning: {
    color: '#e0a800',
  },

  color_danger: {
    color: '#b81640',
  },

  color_white: {
    color: '#ffffff',
  },

  btn: {
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#337ab7',
    backgroundColor: '#337ab7',
  },

  btn_txt: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },

  btn_success: {
    borderColor: '#259041',
    backgroundColor: '#259041',
  },
  btn_warning: {
    borderColor: '#e0a800',
    backgroundColor: '#e0a800',
  },
  btn_danger: {
    borderColor: '#b81640',
    backgroundColor: '#b81640',
  },
  btn_disabled: {
    borderColor: '#D3D3D3',
    backgroundColor: '#D3D3D3',
  },
  btn_close: {
    width: 'auto',
    fontSize: 46,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 6.5,
    paddingRight: 6.5,
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 52 / 2,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff'
  },
  btn_close_sm: {
    width: 'auto',
    fontSize: 27,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4.5,
    paddingRight: 4.5,
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 34 / 2,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff'
  },

  bg_success: {
    borderColor: '#259041',
    backgroundColor: '#259041',
  },
  bg_warning: {
    borderColor: '#e0a800',
    backgroundColor: '#e0a800',
  },
  bg_danger: {
    borderColor: '#b81640',
    backgroundColor: '#b81640',
  },



  form_label: {
    textAlign: 'left',
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#FFFFFF',
  },

  loader_container: {
    flex: 1,
    justifyContent: 'center',
  },
  loader_horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  hidden: {
    width: 0,
    height: 0,
    overflow: 'hidden',
  },
});

if (Platform.OS === 'ios') {
  css.btn = {
    ...css.btn,
    ...{
      paddingLeft: 6,
      paddingRight: 10,
    },
  };
}

export default css;
