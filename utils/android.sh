#!/usr/bin/env bash
export ANDROID_HOME=~/Android/Sdk/
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
export PATH=${PATH}:$ANDROID_HOME/build-tools/28.0.3/
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export ENV=prod
export GRADLE_HOME=/opt/gradle/gradle-5.0
export PATH=${GRADLE_HOME}/bin:${PATH}
export APP_NAME=nativecards-old

if [ $1 == 'release' ]; then
  echo 'Build release APK'
  ionic cordova build android --prod --release --verbose
  jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk $APP_NAME
  rm -f platforms/android/app/build/outputs/apk/release/$APP_NAME.apk
  zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk platforms/android/app/build/outputs/apk/release/$APP_NAME.apk
elif [ $1 == 'key' ]; then
  echo 'Generate key'
  keytool -genkey -v -keystore $APP_NAME.jks -keyalg RSA -keysize 2048 -validity 10000 -alias $APP_NAME
elif [ $1 == 'licenses' ]; then
    echo 'Accepting licenses'
    yes | $ANDROID_HOME/tools/bin/sdkmanager --licenses
else
  echo 'Build USB prod APK'
  cross-env ENV=prod ionic cordova run android --device
fi
