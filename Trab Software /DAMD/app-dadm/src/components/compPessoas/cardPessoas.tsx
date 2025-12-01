import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TypePessoa } from "../../components/type"

type Props = {
    pessoaTipo: string
}

export default function CardPessoas({ pessoa, pessoaTipo }: Props & { pessoa: TypePessoa }) {

    const [seeOptions, setSeeOptions] = useState(false);

    return (
        <View style={{ width: "95%", justifyContent: "flex-start", alignItems: "center"}}>
            <TouchableOpacity style={styles.card} onPress={()=> setSeeOptions(!seeOptions)}>
                <View style={styles.cardText}>
                    {pessoa.nome}
                </View>
                <View style={styles.ima}>
                    {seeOptions == true ?
                        <MaterialIcons name="keyboard-arrow-up" size={30} color="black" />:
                        <MaterialIcons name="keyboard-arrow-down" size={30} color="black" />
                    }
                </View>
            </TouchableOpacity>

            {seeOptions &&
                <View style={styles.cardOpen}>
                    <View style={styles.option}>
                        <View style={{width:"100%", paddingLeft: 10}}>
                            <Text>Nome</Text>
                        </View>
                        <View style={styles.inputOption}>{pessoa.nome}</View>
                    </View>
                    <View style={styles.option}>
                        <View style={{width:"100%", paddingLeft: 10}}>
                            <Text>Matricula</Text>
                        </View>
                        <View style={styles.inputOption}>{pessoa.matricula}</View>
                    </View>
                    <View style={styles.option}>
                        <View style={{width:"100%", paddingLeft: 10}}>
                            <Text>CPF</Text>
                        </View>
                        <View style={styles.inputOption}>{pessoa.cpf}</View>
                    </View>
                    <View style={styles.option}>
                        <View style={{width:"100%", paddingLeft: 10}}>
                            <Text>RG</Text>
                        </View>
                        <View style={styles.inputOption}>{pessoa.carteiraIdentidade}</View>
                    </View>
                    <View style={styles.option}>
                        <View style={{width:"100%", paddingLeft: 10}}>
                            <Text>Data de Nascimento</Text>
                        </View>
                        <View style={styles.inputOption}>{`${pessoa.dataNascimento}`}</View>
                    </View>
                    <View style={styles.option}>
                        <View style={{width:"100%", paddingLeft: 10}}>
                            <Text>Nacionalidade</Text>
                        </View>
                        <View style={styles.inputOption}>{pessoa.nacionalidade}</View>
                    </View>
                    <View style={styles.option}>
                        <View style={{width:"100%", paddingLeft: 10}}>
                            <Text>Naturalidade</Text>
                        </View>
                        <View style={styles.inputOption}>{pessoa.naturalidade}</View>
                    </View>
                    <View style={styles.option}>
                        <View style={{width:"100%", paddingLeft: 10}}>
                            <Text>Sexo</Text>
                        </View>
                        <View style={styles.inputOption}>{pessoa.sexo}</View>
                    </View>
                    {pessoa.sexo == "M" ? //mostra somente se for masculino
                        <View style={styles.option}>
                            <View style={{width:"100%", paddingLeft: 10}}>
                                <Text>Reservista</Text>
                            </View>
                            <View style={styles.inputOption}>{pessoa.certificadoReservista}</View>
                        </View>
                        :""
                    }
                    <View style={styles.option}>
                        <View style={{width:"100%", paddingLeft: 10}}>
                            <Text>Endereço</Text>
                        </View>
                        <View style={styles.inputOption}>{pessoa.endereco}</View>
                    </View>
                    <View style={styles.option}>
                        <View style={{width:"100%", paddingLeft: 10}}>
                            <Text>Telefone</Text>
                        </View>
                        <View style={styles.inputOption}>{pessoa.telefone}</View>
                    </View>
                    <View style={styles.option}>
                        <View style={{width:"100%", paddingLeft: 10}}>
                            <Text>E-mail</Text>
                        </View>
                        <View style={styles.inputOption}>{pessoa.email}</View>
                    </View>
                    {pessoaTipo == "2" ?
                        <>
                            <View style={styles.option}>
                                <View style={{width:"100%", paddingLeft: 10}}>
                                    <Text>Titulação</Text>
                                </View>
                                <View style={styles.inputOption}>{pessoa.titulacao}</View>
                            </View>
                            <View style={styles.option}>
                                <View style={{width:"100%", paddingLeft: 10}}>
                                    <Text>Categoria</Text>
                                </View>
                                <View style={styles.inputOption}>{pessoa.categiria}</View>
                            </View>
                            <View style={styles.option}>
                                <View style={{width:"100%", paddingLeft: 10}}>
                                    <Text>Regime</Text>
                                </View>
                                <View style={styles.inputOption}>{pessoa.regime}</View>
                            </View>
                        </>: ""
                    }
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        marginTop: 25,
        flexDirection: "row",
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        zIndex: 100,
    },
    cardText: {
        width: "95%",
    },
    ima: {
        width: "20%",
    },
    cardOpen:{
        width: "90%",
        height: "auto",
        padding: 20,
        flexWrap: "wrap",
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    option:{
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
    },
    inputOption:{
        width: "90%",
        height: 25,
        paddingLeft: 5,
        paddingTop: 5,
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        borderRadius: 10,
    },
});