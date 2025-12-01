import { Text, View, StyleSheet } from 'react-native';
import Top from "../../components/top/top"

export default function Sobre() {

  return (
    <View style={design.body}>
        <Top title='Sobre'/>
        <View style={{flex: 1, alignItems: "center", justifyContent: "center",}}>
            <View style={design.content}>
                <Text style={design.titulo}>Desenvolvedores:</Text>
                <Text style={design.nome}>Gabriel Filipe Azevedo Montalvão</Text>
                <Text style={design.nome}>Gabrielle Oliveira Pires</Text>
                <Text style={design.nome}>Gabrielle Oliveira Pires</Text>
                <Text style={design.nome}>Henrique de Souza Evangelista</Text>
                <Text style={design.nome}>Ingrid Lorrane Esteves da Silva</Text>
                <Text style={design.nome}>Ludmilla Caroline Gomes Dutra</Text>
                <Text style={design.rodape}>Versão 1.0</Text>
            </View>
        </View>
    </View>
  );
}

const design = StyleSheet.create({
  body: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a056eb",
    borderRadius: 20,
    width: 300,
    height: 500,
    marginTop: 40,
  },
  titulo: {
    fontWeight: 'bold',
    color: "white",
    fontSize: 18,
    padding: 20, // Ajuste o padding para que o texto não fique esmagado
  },
  nome: {
    fontWeight: 'bold',
    color: "white",
    fontSize: 16,
    padding: 10,
  },
  rodape: {
    fontWeight: 'bold',
    color: "white",
    fontSize: 14,
    padding: 30, // Ajuste o padding para que o rodapé fique visível
  },
});
