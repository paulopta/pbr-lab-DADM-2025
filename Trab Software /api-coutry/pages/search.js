import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import { useEffect, useState } from 'react';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [countryData, setCountryData] = useState(null);
  const [countryData2, setCountryData2] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (inputValue.trim() === '') return;

    const fetchCountry = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${inputValue}`
        );
        if (!response.ok) {
          throw new Error('País não encontrado');
        }
        const data = await response.json();
        setCountryData(data[0]);
        setCountryData2(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCountryData(null);
      }
    };

    fetchCountry();
  }, [inputValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar País</Text>

      <TextInput
        style={styles.input}
        onChangeText={(text) => setInputValue(text)}
        value={inputValue}
        placeholder="Digite o nome do país"
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <ScrollView>
        
        {countryData && (
          <View style={styles.card}>
            <Text style={styles.name}>{countryData.name.common}</Text>
            <Image
              source={{ uri: countryData.flags.png }}
              style={styles.flag}
              resizeMode="contain"
            />
            <Text>Capital: {countryData.capital?.[0]}</Text>
            <Text>Região: {countryData.region}</Text>
            <Text>População: {countryData.population.toLocaleString()}</Text>
          </View>
        )}
        
        {countryData2.map((item, index) => (
          <View>
            <Pressable
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardActive,
              ]}>
              <View style={styles.card} value={index}>
                <Image
                  source={{ uri: item.flags.png }}
                  style={styles.flag}
                  resizeMode="contain"
                />
                <Text>{item.name.common}</Text>
              </View>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    cursor: 'pointer',

    transitionDuration: '0.1s',
  },
  cardActive: {
    backgroundColor: '#e0e0e0', 
    transform: [{ scale: 0.98 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flag: {
    width: 20,
    height: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
