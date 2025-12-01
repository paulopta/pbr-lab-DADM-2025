# TaskLife (Complete) - Expo React Native Project

This is the **complete** version of TaskLife prepared for academic submission and demonstration.
It includes:
- Mock authentication (local, using AsyncStorage)
- Task and Habit management (create/edit/delete, recurrence)
- Local persistence with AsyncStorage
- Navigation (Bottom tabs + Stack)
- Basic statistics screen
- Notifications setup (expo-notifications) - requires minimal configuration to fully work on device

## How to run

1. Install Node.js (LTS).
2. Install Expo CLI globally:
   ```bash
   npm install -g expo-cli
   ```
3. Install project dependencies:
   ```bash
   npm install
   ```
4. Start dev server:
   ```bash
   npx expo start
   ```
5. Open on device with Expo Go (scan QR) or run on emulator:
   ```bash
   npx expo run:android
   npx expo run:ios
   ```

Notes:
- This project uses AsyncStorage for a local demo. For production, replace with a backend or cloud sync.
- Notifications require extra setup on iOS (APNs) and Android (app identifiers). For demo, local scheduling works in Expo Go with limitations.

