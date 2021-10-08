import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';

import Colors from '../../../constants/Colors';
import ButtonDefault from '../../components/Button/ButtonDefault';
import ModalDefault from '../../components/Modal/ModalDefault';

function Abonnement({navigation}) {
  const [choice, setChoice] = useState('1');

  const [modal, setModal] = useState(false);

  const handleSend = () => navigation.navigate('Buy');

  const handleChoice = select => {
    setChoice(select);
    if (select === '2') {
      setModal(true);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.padding}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  paddingTop: 10,
                  marginRight: 15,
                }}>
                <Image
                  style={{width: 24, height: 24, resizeMode: 'contain'}}
                  source={require('../../assets/icons/abonnement1.png')}
                />
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 15,
                    color: Colors.black,
                    fontWeight: '700',
                  }}>
                  Annuel
                </Text>
                <Text
                  style={{
                    marginTop: 2,
                    color: Colors.green,
                    fontWeight: '700',
                  }}>
                  70€/an
                </Text>
              </View>
            </View>
            <Text style={{marginTop: 2, color: Colors.grey}}>
              Deux dépannages complets*
            </Text>
            <Text style={{marginTop: 2, color: Colors.grey}}>
              Révision à la date anniversaire
            </Text>
          </View>
          <ButtonDefault
            title="Actif"
            disable
            handleSend={() => handleChoice('1')}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.padding}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  paddingTop: 10,
                  marginRight: 15,
                }}>
                <Image
                  style={{width: 24, height: 24, resizeMode: 'contain'}}
                  source={require('../../assets/icons/abonnement1.png')}
                />
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 15,
                    color: Colors.black,
                    fontWeight: '700',
                  }}>
                  Semestriel
                </Text>
                <Text
                  style={{
                    marginTop: 2,
                    color: Colors.green,
                    fontWeight: '700',
                  }}>
                  40€/semestre
                </Text>
              </View>
            </View>
            <Text style={{marginTop: 2, color: Colors.grey}}>
              Un dépannage complet*
            </Text>
            <Text style={{marginTop: 2, color: Colors.grey}}>
              Check Sécurité à la date anniversaire
            </Text>
          </View>
          <ButtonDefault
            title="Actif"
            disable
            handleSend={() => handleChoice('1')}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.padding}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  paddingTop: 10,
                  marginRight: 15,
                }}>
                <Image
                  style={{width: 24, height: 24, resizeMode: 'contain'}}
                  source={require('../../assets/icons/abonnement1.png')}
                />
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 15,
                    color: Colors.black,
                    fontWeight: '700',
                  }}>
                  Mensuel
                </Text>
                <Text
                  style={{
                    marginTop: 2,
                    color: Colors.green,
                    fontWeight: '700',
                  }}>
                  21€/mois
                </Text>
              </View>
            </View>
            <Text style={{marginTop: 2, color: Colors.grey}}>
              Un dépannage complet*
            </Text>
            <Text style={{marginTop: 2, color: Colors.grey}}>
              chaque dépannage lance un nouveau contrat
            </Text>
          </View>
          <ButtonDefault title="Choisir" handleSend={() => handleChoice('2')} />
        </View>
        <Text style={{marginTop: -12, color: Colors.grey}}>
          * déplacement, petite pièce et main d'œuvre
        </Text>
      </ScrollView>
      <ModalDefault
        title="Confirmer de dépannages"
        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor"
        callBack={open => setModal(open)}
        modal={modal}
      />
    </View>
  );
}

export default Abonnement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default,
    padding: 30,
    paddingTop: 50,
  },
  padding: {
    padding: 20,
  },
  content: {
    backgroundColor: Colors.white,
    borderColor: Colors.green,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },
  buttonContain: {
    padding: 8,
    paddingLeft: 28,
    paddingRight: 28,
    backgroundColor: Colors.blue,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
