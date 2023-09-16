import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 55,
  },
  modalView: {
    flex: 0,
    minWidth: '50%',
    margin: 20,
    borderRadius: 7,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalViewHeader: {
    width: '100%',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  modalViewContent: {
    flex: 0,
    width: '100%',
    paddingTop: 20,
    paddingRight: 5,
    paddingBottom: 20,
    paddingLeft: 5,
  },
  alertContainer: {
    paddingTop: 15,
    paddingRight: 35,
    paddingBottom: 15,
    paddingLeft: 35,
    width: '100%',
    alignSelf: 'stretch',
    borderRadius: 7,
  },
  alertBGContainer: {
    alignSelf: 'stretch',
    borderRadius: 7,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  loader: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  button: {
    borderRadius: 7,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 5,
  },
  textStyle: {
    color: 'white',
    //fontWeight: "bold",
    fontSize: 24,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default style;
