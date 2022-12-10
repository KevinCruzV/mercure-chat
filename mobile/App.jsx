  import { StatusBar } from 'expo-status-bar';
  import {Button, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
  import { BarCodeScanner } from 'expo-barcode-scanner'
  import { useState, useEffect } from 'react'

  export default function App() {
  const [ hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  const [text, setText] = useState('Not yet scanned')

  const askForpermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission( status == 'granted')
    })()
  }

  useEffect(() => {
    askForpermission();
  }, []);
  
  const handleQrCodeScanned = ({type, data}) => {
    setScanned(true)
    setText(data)
    console.log('data: ' + data + 'type: ' + type);
  }

  if (hasPermission === null) {
    return(
      <View>
        <Text>Need Permission</Text>
      </View>
    )
  }
  if (hasPermission === false) {
    return(
      <View>
        <Text>Need Permission</Text>
        <Button onPress={() => askForpermission() }/>
      </View>
    )
  }
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.barcodebox}>
            <BarCodeScanner 
            onBarCodeScanned={scanned ? undefined : handleQrCodeScanned}
            style={{ height: 400, width: 400 }}/>
          </View>
          <Text> {text} </Text>
          {scanned && <Button title='scan again' onPress={() => setScanned(false)} color='tomato' />}
        </ScrollView> 
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    barcodebox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: 300,
      overflow: 'hidden',
      borderRadius: 30,
      backgroundColor: 'tomato'
    }
  });
