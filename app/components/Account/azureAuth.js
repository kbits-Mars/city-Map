import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {AzureInstance, AzureLoginView} from 'react-native-azure-ad-2';

// CONSTANT
const CREDENTIAILS = {
    client_id: 'c2bda0e4-a212-4169-8aa3-db5544b6308a',
    client_secret: 'we34c-55a9V62kl2_gttsmj_.6O-UT5O7g',
 
    scope: 'User.ReadBasic.All Mail.Read offline_access'

};

export default class azureAuth extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        azureLoginObject: {},
        loginSuccess: false
      };
          this.azureInstance = new AzureInstance(CREDENTIAILS);
          this._onLoginSuccess = this._onLoginSuccess.bind(this);
      }
  
      _onLoginSuccess(){
          this.azureInstance.getUserInfo().then(result => {
              this.setState({
          loginSuccess: true,
          azureLoginObject: result
        });
        console.log(result);
          }).catch(err => {
              console.log(err);
          })
    }
    
  
    render() {
  
      if (!this.state.loginSuccess) {
  
        return (<AzureLoginView
            azureInstance={this.azureInstance}
            loadingMessage="Requesting access token"
            onSuccess={this._onLoginSuccess}
          />)
      }
  
      const {userPrincipalName, givenName} = this.state.azureLoginObject;
      
      return (
        <View style={styles.container}>
                  <Text style={styles.text}>Welcome {givenName}</Text> 
                  <Text style={styles.text}>You logged into Azure with {userPrincipalName}</Text> 
              </View>
      );
    }
  }
