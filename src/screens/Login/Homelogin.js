import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import Colors from '../../../constants/Colors';
import ButtonDefault from '../../components/Button/ButtonDefault';

export default function Homelogin({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          source={require('../../assets/icons/Logo_DepanneVelo.png')}
          resizeMode="contain"
          style={{width: 200}}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>
          CHOISISSEZ VOTRE TYPE DE COMPTE
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: Colors.grey,
            textAlign: 'center',
            marginTop: 20,
          }}>
          Nous mettons tout en œuvre pour vous assurer un trajet serein
        </Text>
      </View>
      <View style={styles.containerHome}>
        <View style={{marginBottom: 20}}>
          <ButtonDefault
            handleSend={() => navigation.navigate('SigninDep')}
            title="Je suis dépanneur"
          />
        </View>
        <ButtonDefault
          buttonOulined
          handleSend={() => {
            console.log('CLICK*********');
            navigation.navigate('Signin');
          }}
          title="Je suis utilisateur"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 70,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerHome: {
    position: 'absolute',
    top: '75%',
    width: '100%',
  },
});
