import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Colors from '../../../constants/Colors';
import ButtonDefault from '../../components/Button/ButtonDefault';

const PaymentRequest = require('react-native-payments').PaymentRequest;

// const METHOD_DATA = [{
//   supportedMethods: ['apple-pay'],
//   data: {
//     merchantIdentifier: 'merchant.com.your-app.namespace',
//     supportedNetworks: ['visa', 'mastercard', 'amex'],
//     countryCode: 'US',
//     currencyCode: 'USD'
// paymentMethodTokenizationParameters: {
//   				parameters: {
//   					gateway: 'stripe',
//   					'stripe:publishableKey': 'pk_test_asdfghjkl_qwertyuiop'
//   				}
//   			}
//   }
// }];

const METHOD_DATA = [
  {
    supportedMethods: ['android-pay'],
    data: {
      supportedNetworks: ['visa', 'mastercard', 'amex'],
      currencyCode: 'USD',
      environment: 'TEST', // defaults to production
      paymentMethodTokenizationParameters: {
        tokenizationType: 'NETWORK_TOKEN',
        parameters: {
          publicKey:
            'BB0kMB9zQ6LMmW3OByUjQV3ZnYC4exd50a2tdd62lJN/CYNXyEz6Efuyvswfu2HEjR0cnHRYniR21fxaVmq1ra0=',
        },
      },
    },
  },
];

const DETAILS = {
  id: 'basic-example',
  displayItems: [
    {
      label: 'Movie Ticket',
      amount: {currency: 'USD', value: '15.00'},
    },
  ],
  total: {
    label: 'Merchant Name',
    amount: {currency: 'USD', value: '15.00'},
  },
};

// const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);

// paymentRequest.show().then(paymentResponse => {
//   // Your payment processing code goes here

// const { transactionIdentifier, paymentData } = paymentResponse.details;

//ANDROID

// const { getPaymentToken } = paymentResponse.details;

// return getPaymentToken()
//   .then(paymentToken => {
//     const { ephemeralPublicKey, encryptedMessage, tag } = paymentResponse.details;

//     return fetch('...', {
//       method: 'POST',
//       body: {
//         ephemeralPublicKey,
//         encryptedMessage,
//         tag
//       }
//     })
//     .then(res => res.json())
//     .then(successHandler)
//     .catch(errorHandler)
//   });

//   return processPayment(paymentResponse);
// });

// paymentRequest.abort();

function Abonnement({navigation, user}) {
  const [choice, setChoice] = useState(user.abonnement);
  const [abbonnement, setAbbonnement] = useState([]);

  useEffect(() => {
    const getAbonnement = async () => {
      const snapshot = await firestore().collection('abonnement').get();
      const data = snapshot.docs.map(doc => doc.data());

      if (data.length === 0) {
        console.log('No such document!');
        return null;
      }
      setAbbonnement(data);
    };
    getAbonnement();
    console.log('***** USER ****** ', user);
  }, []);

  //fonction caclul date end

  const handleSend = () => {
    console.log('CALL PAYEMENT');
  };

  const dateToday = new Date().getTime();
  const handleChoice = select => {};

  return (
    <View style={styles.container}>
      <ScrollView>
        {abbonnement.map((e, i) => (
          <View key={i} style={styles.content}>
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
                    {e?.name ?? ''}
                  </Text>
                  <Text
                    style={{
                      marginTop: 2,
                      color: Colors.green,
                      fontWeight: '700',
                    }}>
                    {e?.displayPrice ?? ''}
                  </Text>
                </View>
              </View>
              <Text style={{marginTop: 2, color: Colors.grey}}>
                {e?.line1 ?? ''}
              </Text>
              <Text style={{marginTop: 2, color: Colors.grey}}>
                {e?.line2 ?? ''}
              </Text>
            </View>
            <ButtonDefault
              title={
                user.abonnementId === 0
                  ? 'Choisir'
                  : e.id === user.abonnementId
                  ? 'Actif'
                  : 'Non Actif'
              }
              disable={
                user.abonnementId === 0 ? false : e.id !== user.abonnementId
              }
              handleSend={() => handleChoice(e.id)}
            />
          </View>
        ))}
        <View style={{marginLeft: 20, marginBottom: 30}}>
          <Text style={{marginTop: -12, color: Colors.grey}}>
            * déplacement, petite pièce et main d'œuvre
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Abonnement);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default,
    paddingTop: 20,
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
    marginHorizontal: 20,
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
