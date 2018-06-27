import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
    View,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';

import {Container, Content, Header} from 'native-base'
import {isNil} from 'ramda'

const data = [
    {'id': 1, title: 'Field 1'},
    {'id': 2, title: 'Field 2'},
    {'id': 4, title: 'Field 3'},
    {'id': 5, title: 'Field 4'},
    {'id': 6, title: 'Field 5'},
    {'id': 3, title: 'Field 6'},
]

type Props = {};
export default class App extends Component<Props> {
    componentWillMount () {
        this.getState()
    }
  render() {
    return (
      <Container style={styles.container}>
          <Header style={styles.vHeader}>
              <Text style={styles.welcome}>
                  React Native Dynamic View
              </Text>
          </Header>
          <Content style={{paddingHorizontal: 20}} behavior="padding" enabled>

              {this.getView()}
          </Content>
      </Container>
    );
  }

  getState () {
      if (!isNil(data) && data.length > 0) {
          for (let i = 0; i < data.length; i++) {
              this.setState({[data[i].id] : ''})
          }
      }
  }

  getView () {
      if (!isNil(data) && data.length > 0) {
          let arr = []
          for (let i = 0; i < data.length; i++) {
              arr.push(this.renderSingleField(data[i].id, data[i].title))
          } return arr
      } else return []
  }

  renderSingleField (id, title) {
    return (
        <View>
            <Text style={styles.txtSingle}>{title}</Text>
            <TextInput
                ref={id}
                value={this.state[id]}
                style={styles.inputSingle}
                onSubmitEditing={(event) => {
                    if ( !isNil(this.getIdNext(id))) {
                        this.setState({[this.getIdNext(id).toString()] : ' '}, () => {
                            this.refs[this.getIdNext(id).toString()].focus()
                            this.setState({[this.getIdNext(id).toString()] : ''})
                        })
                    }
                }}
                underlineColorAndroid='transparent'
                blurOnSubmit={isNil(this.getIdNext(id))}
                returnKeyType={ !isNil(this.getIdNext(id)) ? 'next' : 'done'}
                onChangeText={(text) => this.setState({ [id]: text })}
            />
        </View>
    )
  }
  getIdNext (id) {
      if (!isNil(data)) {
          for (let i = 0; i < data.length; i++) {
              if (data[i].id === id) {
                  if (!isNil(data[i + 1])) { return data[i + 1].id } else { return null }
              }
          }
      } return null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
    txtSingle: {
        marginTop: 16,
        marginBottom: 8,
        lineHeight: 20,
        fontSize: 14,
        color: 'rgb(69,90,100)',
        textAlign: 'left'
    },
    vHeader: {
    backgroundColor: 'rgb(1,183,207)'
    },
    inputSingle: {
        width: '100%',
        height: 42,
        padding: 8,
        borderColor: 'rgb(69,90,100)',
        borderWidth: 1
    },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
