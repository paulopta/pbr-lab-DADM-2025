import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const TASKS_KEY = '@tasklife:tasks';
const USERS_KEY = '@tasklife:users';
const LOGGED_KEY = '@tasklife:logged';

async function getTasks() {
  try {
    const raw = await AsyncStorage.getItem(TASKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

async function saveAllTasks(tasks) {
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

async function saveTask(task) {
  const tasks = await getTasks();
  if (task.id) {
    const idx = tasks.findIndex(t => t.id === task.id);
    if (idx >= 0) {
      tasks[idx] = {...tasks[idx], ...task};
    } else {
      tasks.push({...task, id: task.id});
    }
  } else {
    tasks.push({...task, id: uuidv4()});
  }
  await saveAllTasks(tasks);
}

async function deleteTask(id) {
  const tasks = await getTasks();
  const filtered = tasks.filter(t => t.id !== id);
  await saveAllTasks(filtered);
}

async function getTask(id) {
  const tasks = await getTasks();
  return tasks.find(t => t.id === id);
}

export default {
  getTasks,
  saveTask,
  deleteTask,
  getTask
};
