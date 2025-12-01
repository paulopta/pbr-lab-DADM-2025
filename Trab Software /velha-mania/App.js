import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Config ---
const APP_NAME = 'Velha Mania';
const APP_VERSION = '1.0.2';
const STORAGE_KEY = '@velharn:state';

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// --- Square componente ---
const Square = ({ value, onPress, disabled }) => (
  <TouchableOpacity style={styles.square} onPress={onPress} activeOpacity={0.7} disabled={disabled}>
    <Text style={[styles.squareText, value === 'X' ? styles.playerX : styles.playerO]}>
      {value}
    </Text>
  </TouchableOpacity>
);

// --- App ---
export default function App() {
  // navegação simples por estado (sem react-navigation)
  const [screen, setScreen] = useState('splash'); // splash | home | game | scores | about
  const [loading, setLoading] = useState(true);

  // estado do jogo
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // modo de jogo: 'pvp' ou 'cpu'
  const [mode, setMode] = useState('pvp');

  // placar persistente
  const [scores, setScores] = useState({ winsX: 0, winsO: 0, ties: 0 });

  // Carrega armazenamento e mostra splash
  useEffect(() => {
    const init = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.scores) setScores(parsed.scores);
        }
      } catch (err) {
        console.warn('Erro lendo storage:', err);
      } finally {
        // mantém splash por 1.8s, depois vai pro menu
        setTimeout(() => {
          setLoading(false);
          setScreen('home');
        }, 1800);
      }
    };
    init();
  }, []);

  // calcula vencedor sempre que o tabuleiro muda
  useEffect(() => {
    const calc = calculateWinner(board);
    if (calc) setWinner(calc);
    else if (board.every((s) => s !== null)) setWinner('Empate');
    else setWinner(null);
  }, [board]);

  // reage quando houver vencedor: atualiza placar e salva
  useEffect(() => {
    if (!winner) return;

    const applyResult = async () => {
      const newScores = { ...scores };
      if (winner === 'Empate') newScores.ties += 1;
      else if (winner === 'X') newScores.winsX += 1;
      else if (winner === 'O') newScores.winsO += 1;

      setScores(newScores);

      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ version: APP_VERSION, scores: newScores, lastPlayed: new Date().toISOString() })
        );
      } catch (err) {
        console.warn('Erro salvando placar:', err);
      }

      // mostra alerta com opção de reiniciar imediatamente
      if (winner === 'Empate') {
        Alert.alert('Fim de Jogo', 'Deu Empate!', [{ text: 'Novo Jogo', onPress: resetBoard }], { cancelable: false });
      } else {
        Alert.alert('Fim de Jogo', `O jogador ${winner} venceu!`, [{ text: 'Novo Jogo', onPress: resetBoard }], { cancelable: false });
      }
    };

    applyResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner]);

  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a];
      }
    }
    return null;
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const resetScores = async () => {
    const base = { winsX: 0, winsO: 0, ties: 0 };
    setScores(base);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ version: APP_VERSION, scores: base, lastPlayed: null }));
      Alert.alert('Ok', 'Placar reiniciado.');
    } catch (err) {
      console.warn('Erro resetando placar:', err);
    }
  };

  // ---------- AI (Minimax) ----------
  // vamos assumir: humano = 'X', CPU = 'O' quando mode === 'cpu'
  const emptyIndexes = (brd) => brd.map((v, i) => v === null ? i : null).filter((v) => v !== null);

  const minimax = (newBoard, player) => {
    const huPlayer = 'X';
    const aiPlayer = 'O';

    const winnerNow = calculateWinner(newBoard);
    if (winnerNow === huPlayer) return { score: -10 };
    if (winnerNow === aiPlayer) return { score: 10 };
    if (newBoard.every((s) => s !== null)) return { score: 0 };

    const availSpots = emptyIndexes(newBoard);
    const moves = [];

    for (let i = 0; i < availSpots.length; i++) {
      const move = {};
      move.index = availSpots[i];
      newBoard[move.index] = player;

      if (player === aiPlayer) {
        const result = minimax(newBoard, huPlayer);
        move.score = result.score;
      } else {
        const result = minimax(newBoard, aiPlayer);
        move.score = result.score;
      }

      newBoard[move.index] = null;
      moves.push(move);
    }

    // pick best move
    let bestMoveIndex = 0;
    if (player === aiPlayer) {
      // maximize
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMoveIndex = i;
        }
      }
    } else {
      // minimize
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMoveIndex = i;
        }
      }
    }

    return moves[bestMoveIndex];
  };

  const cpuPlay = () => {
    // se já venceu ou empate, não joga
    if (winner) return;
    const best = minimax(board.slice(), 'O');
    const idx = (best && typeof best.index === 'number') ? best.index : (board.findIndex((c) => c === null));
    if (idx >= 0) {
      const newBoard = board.slice();
      newBoard[idx] = 'O';
      setBoard(newBoard);
      setIsXNext(true);
    }
  };

  // detecta vez da CPU em modo cpu e joga com pequeno delay
  useEffect(() => {
    if (mode !== 'cpu') return;
    // CPU joga como 'O' quando for a vez do O (isXNext === false)
    if (!isXNext && !winner) {
      const t = setTimeout(() => cpuPlay(), 350);
      return () => clearTimeout(t);
    }
  }, [isXNext, mode, board, winner]);

  // handler de jogada humano
  const handlePress = (index) => {
    // bloqueia se já preenchido ou fim de jogo
    if (board[index] || winner) return;

    // se modo CPU e não é vez do humano (X), bloqueia
    if (mode === 'cpu' && !isXNext) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext((p) => !p);
  };

  // status mostrado na UI
  const getStatus = () => {
    if (winner && winner !== 'Empate') return `Vencedor: ${winner}`;
    if (winner === 'Empate') return 'Resultado: Empate';
    const turno = isXNext ? 'X' : 'O';
    if (mode === 'cpu') {
      return `Próximo: ${turno} ${turno === 'O' ? '(CPU)' : '(Você)'} `;
    }
    return `Próximo: ${turno}`;
  };

  // ---------- RENDERIZAÇÕES (telas) ----------
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (screen === 'splash') {
    return (
      <SafeAreaView style={styles.container}>
        <ImagePlaceholder />
        <Text style={styles.title}>{APP_NAME}</Text>
        <Text style={styles.subtitle}>Versão {APP_VERSION}</Text>
      </SafeAreaView>
    );
  }

  if (screen === 'home') {
    return (
      <SafeAreaView style={styles.container}>
        <ImagePlaceholder />
        <Text style={styles.title}>{APP_NAME}</Text>
        <Text style={styles.subtitle}>Versão {APP_VERSION}</Text>

        <TouchableOpacity style={styles.menuButton} onPress={() => { resetBoard(); setMode('pvp'); setScreen('game'); }}>
          <Text style={styles.menuButtonText}>Jogar 2 jogadores</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuButton, { backgroundColor: '#6f42c1' }]} onPress={() => { resetBoard(); setMode('cpu'); setScreen('game'); }}>
          <Text style={styles.menuButtonText}>Jogar vs Máquina</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => setScreen('scores')}>
          <Text style={styles.menuButtonText}>Placar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => setScreen('about')}>
          <Text style={styles.menuButtonText}>Sobre</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuButton, { backgroundColor: '#ccc', marginTop: 18 }]} onPress={resetScores}>
          <Text style={[styles.menuButtonText, { color: '#333' }]}>Resetar Placar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (screen === 'scores') {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Placar</Text>
        <View style={{ marginVertical: 12 }}>
          <Text style={styles.status}>X venceu: {scores.winsX}</Text>
          <Text style={styles.status}>O venceu: {scores.winsO}</Text>
          <Text style={styles.status}>Empates: {scores.ties}</Text>
        </View>

        <TouchableOpacity style={styles.menuButton} onPress={() => setScreen('home')}>
          <Text style={styles.menuButtonText}>Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (screen === 'about') {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Sobre</Text>
        <Text style={styles.text}>Desenvolvedores:</Text>
        <Text style={styles.text}>Luiz Eduardo Jardim de Medeiros </Text>
        <Text style={styles.text}>Enzo Kurt Sales Almeida </Text>
        <Text style={styles.text}>Tiago Oliveira Castro </Text>
        <Text style={styles.text}>Gustavo Henrique Teixeira Viana </Text>
        <Text style={styles.text}>Gustavo Moreira </Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>Disciplina: React Native</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>Descrição: Este trabalho consiste em um aplicativo mobile desenvolvido em React Native que implementa o Jogo da Velha. O app possui uma interface com menu principal, tela de jogo, placar persistente usando AsyncStorage, tela de sobre com informações do desenvolvedor, e uma SplashScreen exibindo o logo e a versão do aplicativo. O objetivo é demonstrar conhecimentos em React Native, componentes, hooks, navegação básica e armazenamento local de dados.</Text>
        <Text style={styles.text}></Text>

        <TouchableOpacity style={styles.menuButton} onPress={() => setScreen('home')}>
          <Text style={styles.menuButtonText}>Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // tela do jogo
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Jogo da Velha</Text>
      <Text style={styles.status}>{getStatus()}</Text>

      <View style={styles.board}>
        {board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onPress={() => handlePress(index)}
            disabled={mode === 'cpu' ? (!isXNext || !!value || !!winner) : (!!value || !!winner)}
          />
        ))}
      </View>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <TouchableOpacity style={[styles.smallButton, { marginRight: 12 }]} onPress={resetBoard}>
          <Text style={styles.resetButtonText}>Reiniciar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallButton} onPress={() => setScreen('home')}>
          <Text style={styles.resetButtonText}>Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// componente que tenta renderizar a logo, ou um placeholder
function ImagePlaceholder() {
  try {
    // require pode falhar se o arquivo não existir — o try evita crash em tempo de execução
    const img = require('./assets/logo.png');
    return <Image source={img} style={{ width: 120, height: 120, marginBottom: 12 }} resizeMode="contain" />;
  } catch {
    return (
      <View style={{
        width: 120, height: 120, borderRadius: 12, backgroundColor: '#eee',
        justifyContent: 'center', alignItems: 'center', marginBottom: 12
      }}>
        <Text style={{ fontWeight: '700', color: '#666' }}>LOGO</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 28, fontWeight: '700', color: '#222' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 18 },
  text: { fontSize: 16, color: '#333', marginBottom: 6 },
  menuButton: { backgroundColor: '#007BFF', paddingVertical: 12, paddingHorizontal: 28, borderRadius: 8, marginTop: 12 },
  menuButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  board: { width: 306, height: 306, flexDirection: 'row', flexWrap: 'wrap', borderWidth: 2, borderColor: '#333', marginTop: 12 },
  square: { width: '33.33%', height: '33.33%', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#aaa' },
  squareText: { fontSize: 52, fontWeight: '700' },
  playerX: { color: '#E91E63' },
  playerO: { color: '#4CAF50' },
  status: { fontSize: 18, marginTop: 10, color: '#444' },
  resetButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  smallButton: { backgroundColor: '#28A745', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 8 }
});
