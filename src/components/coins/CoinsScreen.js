import React, {Component} from 'react';
import {
  View,
  FlatList,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Http from 'cryptoTracker/src/libs/http';
import CoinsItem from './CoinsItem';
import Colors from 'cryptoTracker/src/res/colors';

class CoinsScreen extends Component {
  state = {
    coins: [],
    loading: false,
  };

  componentDidMount = async () => {
    this.setState({loading: true});
    const coins = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    this.setState({coins: coins.data, loading: false});
  };

  handlePress = (coin) => {
    this.props.navigation.navigate('CoinDetail', {coin});
  };

  render() {
    const {coins, loading} = this.state;

    return (
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator
            style={styles.loader}
            color={Colors.white}
            size="large"
          />
        ) : null}
        <FlatList
          data={coins}
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => this.handlePress(item)} />
          )}
        />
        <Text>Coins Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
  },
  loader: {
    marginTop: 60,
  },
});
export default CoinsScreen;
