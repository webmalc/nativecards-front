#!/usr/bin/env bash
export ANDROID_HOME=~/Android/Sdk/
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
export PATH=${PATH}:$ANDROID_HOME/build-tools/28.0.2/
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk
export ENV=prod

if [ $1 == 'release' ]; then
  echo 'Build release APK'
  cross-env ENV=prod ionic cordova build android --prod --release
  jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk my-alias
  rm -f platforms/android/app/build/outputs/apk/release/maxibooking.apk
  zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk platforms/android/app/build/outputs/apk/release/maxibooking.apk
elif [ $1 == 'key' ]; then
  echo 'Generate key'
  keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias
else
  echo 'Build USB prod APK'
  cross-env ENV=prod ionic cordova run android --device
fi
