import React, {useState, useEffect} from 'react';
import storage from '@react-native-firebase/storage';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  ActionSheetIOS,
  Pressable,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Input} from 'react-native-elements';
import Colors from '../../../constants/Colors';
import ButtonDefault from '../../components/Button/ButtonDefault';
import {ScrollView} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import RNFS from 'react-native-fs';

import {launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

const HEIGHT = Dimensions.get('window').height;

import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {GET_USER} from '../../redux/type';
import {TYPE_DEP} from '../../locale';

export default function SigninNextDep({route, navigation}) {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const [civ, setCIV] = useState(null);
  const [cir, setCIR] = useState(null);
  const [kbis, setKbis] = useState(null);
  const [profile, setProfile] = useState(null);

  const [message, setMessage] = useState('');

  useEffect(() => {
    const user = route.params?.user;

    if (!user) {
      return navigation.navigate('SigninDep');
    }
    setUser(user);
  }, []);

  useEffect(() => {
    // (async () => {
    //   const listRef = storage().ref().child("uploads");
    //   const res = (await listRef.listAll()).items;
    //   setUploads(res);
    // })();
  }, []);

  const pickDocument = async () => {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });

    return {path: res[0].uri, name: res[0].name};
  };

  const pickAttachmenet = async () => {
    if (Platform.OS === 'ios') {
      const options = ['Image', 'Cancel'];
      ActionSheetIOS.showActionSheetWithOptions(
        {options, cancelButtonIndex: 2, title: 'Pick a data type'},
        async buttonIndex => {
          if (buttonIndex === 0) {
            // Open Image Picker
            launchImageLibrary({mediaType: 'photo'}, res => {
              if (!res.didCancel) {
                return {path: res.uri, name: res.fileName};
              }
            });
          } else if (buttonIndex === 1) {
            // Open Document Picker
            return pickDocument();
          } else {
            // exit
          }
        },
      );
    } else {
      // For Android we can just use the normal DocumentPicker, as it can also access images
      return pickDocument();
    }
  };

  const onSubmit = async () => {
    if (!civ || !cir || !kbis || !profile) {
      return Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Error nous avons besoin de tous les fichiers svp',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
    }
    setLoading(true);
    try {
      await firestore().collection('users').doc(user.id).set({
        id: user.id,
        email: user.email,
        firstname: user.firstName,
        name: user.name,
        civ,
        cir,
        kbis,
        profile,
        message,
        type: TYPE_DEP,
      });

      dispatch({
        type: GET_USER,
        payload: {...user, civ, cir, kbis, profile, message},
      });
    } catch (err) {
      setLoading(false);
      console.error(err);
      throw err;
    }
  };

  return (
    <ScrollView style={{backgroundColor: Colors.default}}>
      <View style={{zIndex: 9999}}>
        <Toast ref={ref => Toast.setRef(ref)} />
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>CRÉEZ UN COMPTE DÉPANNEUR</Text>

        <View style={{marginVertical: 10}}>
          <Text>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et
          </Text>
        </View>

        <View>
          <Pressable
            onPress={async () => {
              const attachmentInfo = await pickAttachmenet();
              if (attachmentInfo?.name) {
                try {
                  const data = await RNFS.readFile(
                    attachmentInfo.path,
                    'base64',
                  );
                  const fileRef = storage()
                    .ref()
                    .child('DEPANNEUR')
                    .child('KBIS-SIRENE')
                    .child(user.id)
                    .putString(data, 'base64');

                  fileRef.on(
                    'state_changed',
                    snapshot => {
                      var progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log('Upload is ' + progress + '% done');
                    },
                    error => {
                      setKbis('error');
                    },
                    () => {
                      fileRef.snapshot.ref
                        .getDownloadURL()
                        .then(downloadURL => {
                          console.log('File available at', downloadURL);
                          setKbis(downloadURL);
                        });
                    },
                  );
                } catch (err) {
                  console.error(err);
                  setKbis('error');
                }
              }
            }}>
            <View style={styles.contentPicker}>
              <Text>Extrait KBIS ou SIRENE</Text>
              {kbis === 'error' ? (
                <Image
                  style={{width: 25, height: 15}}
                  source={require('../../assets/icons/Annule.png')}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  style={{width: 25, height: 15}}
                  source={
                    kbis
                      ? require('../../assets/icons/Valide.png')
                      : require('../../assets/icons/photo.png')
                  }
                  resizeMode="contain"
                />
              )}
            </View>
          </Pressable>
        </View>
        <View>
          <Pressable
            onPress={async () => {
              const attachmentInfo = await pickAttachmenet();
              if (attachmentInfo?.name) {
                try {
                  const data = await RNFS.readFile(
                    attachmentInfo.path,
                    'base64',
                  );
                  const fileRef = storage()
                    .ref()
                    .child('DEPANNEUR')
                    .child('PROFILE')
                    .child(user.id)
                    .putString(data, 'base64');

                  fileRef.on(
                    'state_changed',
                    snapshot => {
                      var progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log('Upload is ' + progress + '% done');
                    },
                    error => {
                      setProfile('error');
                    },
                    () => {
                      fileRef.snapshot.ref
                        .getDownloadURL()
                        .then(downloadURL => {
                          console.log('File available at', downloadURL);
                          setProfile(downloadURL);
                        });
                    },
                  );
                } catch (err) {
                  console.error(err);
                  setProfile('error');
                }
              }
            }}>
            <View style={styles.contentPicker}>
              <Text>Photo de profil</Text>
              {profile === 'error' ? (
                <Image
                  style={{width: 25, height: 15}}
                  source={require('../../assets/icons/Annule.png')}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  style={{width: 25, height: 15}}
                  source={
                    profile
                      ? require('../../assets/icons/Valide.png')
                      : require('../../assets/icons/photo.png')
                  }
                  resizeMode="contain"
                />
              )}
            </View>
          </Pressable>
        </View>
        <View>
          <Pressable
            onPress={async () => {
              const attachmentInfo = await pickAttachmenet();
              if (attachmentInfo?.name) {
                try {
                  const data = await RNFS.readFile(
                    attachmentInfo.path,
                    'base64',
                  );
                  const fileRef = storage()
                    .ref()
                    .child('DEPANNEUR')
                    .child('CI RECTO')
                    .child(user.id)
                    .putString(data, 'base64');

                  fileRef.on(
                    'state_changed',
                    snapshot => {
                      var progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log('Upload is ' + progress + '% done');
                    },
                    error => {
                      setCIR('error');
                    },
                    () => {
                      fileRef.snapshot.ref
                        .getDownloadURL()
                        .then(downloadURL => {
                          console.log('File available at', downloadURL);
                          setCIR(downloadURL);
                        });
                    },
                  );
                } catch (err) {
                  console.error(err);
                  setCIR('error');
                }
              }
            }}>
            <View style={styles.contentPicker}>
              <Text>Pièce d’identité (RECTO)</Text>
              {cir === 'error' ? (
                <Image
                  style={{width: 25, height: 15}}
                  source={require('../../assets/icons/Annule.png')}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  style={{width: 25, height: 15}}
                  source={
                    cir
                      ? require('../../assets/icons/Valide.png')
                      : require('../../assets/icons/photo.png')
                  }
                  resizeMode="contain"
                />
              )}
            </View>
          </Pressable>
        </View>
        <View>
          <Pressable
            onPress={async () => {
              const attachmentInfo = await pickAttachmenet();
              if (attachmentInfo?.name) {
                try {
                  const data = await RNFS.readFile(
                    attachmentInfo.path,
                    'base64',
                  );
                  const fileRef = storage()
                    .ref()
                    .child('DEPANNEUR')
                    .child('CI VERSO')
                    .child(user.id)
                    .putString(data, 'base64');

                  fileRef.on(
                    'state_changed',
                    snapshot => {
                      var progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log('Upload is ' + progress + '% done');
                    },
                    error => {
                      setCIV('error');
                    },
                    () => {
                      fileRef.snapshot.ref
                        .getDownloadURL()
                        .then(downloadURL => {
                          console.log('File available at', downloadURL);
                          setCIV(downloadURL);
                        });
                    },
                  );
                } catch (err) {
                  console.error(err);
                  setCIV('error');
                }
              }
            }}>
            <View style={styles.contentPicker}>
              <Text>Pièce d’identité (VERSO)</Text>
              {civ === 'error' ? (
                <Image
                  style={{width: 25, height: 15}}
                  source={require('../../assets/icons/Annule.png')}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  style={{width: 25, height: 15}}
                  source={
                    civ
                      ? require('../../assets/icons/Valide.png')
                      : require('../../assets/icons/photo.png')
                  }
                  resizeMode="contain"
                />
              )}
            </View>
          </Pressable>
        </View>
        <View style={{marginTop: 20}}>
          <Input
            textAlign="left"
            placeholder="Ecrivez ici votre message"
            label="Votre Message (facultatif)"
            value={message}
            multiline
            maxLength={200}
            numberOfLines={3}
            labelStyle={{marginBottom: -12, fontSize: 14}}
            inputStyle={{marginBottom: -5, fontSize: 14}}
            onChangeText={message => setMessage(message)}
          />
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ButtonDefault handleSend={() => onSubmit()} title="Continuer" />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 22,
    marginTop: 22,
    maxHeight: 1200,
    minHeight: HEIGHT * 0.45,
  },
  contentPicker: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#D5D5D5',
    borderBottomWidth: 1,
    padding: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
});
