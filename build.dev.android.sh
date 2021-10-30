#!/bin/bash
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle chmod +x
cd android/
./gradlew assembleRelease --stacktrace