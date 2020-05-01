import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['pt-BR'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan.', 'Fer.', 'Mar', 'Abr', 'Mai', 'Jui', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
  today: 'Hoje\'Hj'
};
LocaleConfig.defaultLocale = 'pt-BR';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {
        '2020-04-09': [{ name: 'item 1 - any js object' }],
        '2020-04-08': [{ name: 'item 2 - any js object', height: 80 }],
        '2020-04-10': [{ name: 'item 1 - any js object' }],
        '2020-04-11': [{ name: 'item 2 - any js object', height: 80 }],
        '2020-04-12': [{ name: 'item 1 - any js object' }],
        '2020-04-13': [{ name: 'item 2 - any js object', height: 80 }],
        '2020-04-14': [{ name: 'item 1 - any js object' }],
        '2020-04-15': [{ name: 'item 2 - any js object', height: 80 }],
        '2020-04-16': [{ name: 'item 1 - any js object' }],
        '2020-04-17': [{ name: 'item 2 - any js object', height: 80 }],
        '2020-04-18': [{ name: 'item 1 - any js object' }],
        '2020-04-19': [{ name: 'item 2 - any js object', height: 80 }],
      }
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Agenda
          items={this.state.items}
          renderItem={this.renderItem.bind(this)}
          renderEmptyData={() => { return (<View><Text>Nada Marcado para hoje</Text></View>); }}
        />
        <TouchableOpacity
   style={{
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:70,
       position: 'absolute',                                          
       bottom: 10,                                                    
       right: 10,
       height:70,
       backgroundColor:'#00adf5',
       borderRadius:100,
     }}
 >
   <Text>+</Text>
  </TouchableOpacity>
      </View>
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        console.log(strTime);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: 80
            });
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  adicionarbtn: {
    position: 'absolute',
    backgroundColor: '#00adf5',
    height: 40,
    width: 160,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    position: 'absolute',
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: 'rgba(208, 215, 85, 1)'
  }
});
