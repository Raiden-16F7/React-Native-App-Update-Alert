// index.js

import { useEffect, useRef } from "react";
import { Alert, Linking, Platform, AppState } from "react-native";
import DeviceInfo from "react-native-device-info";

const checkForAppUpdate = ({
  iosStoreURL,
  androidStoreURL,
  country = "us", // Default country setting
  majorUpdateTitle = "Update Required",
  majorUpdateMessage = "A major update is available. Please update your app to continue using it.",
  minorUpdateTitle = "Update Available",
  minorUpdateMessage = "A minor update is available. Would you like to update now?",
  minorUpdateButtonText = "Later",
  minorUpdateButtonStyle = "cancel",
}) => {
  const showAlertRef = useRef(true);

  useEffect(() => {
    const checkForUpdate = async () => {
      try {
        const localVersion = DeviceInfo.getVersion();

        const check = await checkVersion({
          version: localVersion,
          iosStoreURL,
          androidStoreURL,
          country,
        });

        console.log(check);

        if (check.result === "new") {
          const latestVersion = check.remote;
          const updateType = getUpdateType(localVersion, latestVersion);

          console.log("updateType: ", updateType);

          if (updateType === "major" && showAlertRef.current) {
            showUpdateAlert("major");
          } else if (updateType === "minor") {
            showUpdateAlert("minor");
          }
        }
      } catch (error) {
        console.error("Error checking for update:", error);
      }
    };

    const getUpdateType = (currentVersion, latestVersion) => {
      const currentVersionParts = currentVersion.split(".").map(Number);
      const latestVersionParts = latestVersion.split(".").map(Number);

      // Compare each segment starting from major to minor
      for (
        let i = 0;
        i < Math.max(currentVersionParts.length, latestVersionParts.length);
        i++
      ) {
        const currentPart = currentVersionParts[i] || 0;
        const latestPart = latestVersionParts[i] || 0;

        if (latestPart > currentPart) {
          return i === 0 ? "major" : "minor";
        } else if (latestPart < currentPart) {
          return "none";
        }
      }

      return "none";
    };

    const showUpdateAlert = (updateType) => {
      const title =
        updateType === "major" ? majorUpdateTitle : minorUpdateTitle;
      const message =
        updateType === "major" ? majorUpdateMessage : minorUpdateMessage;
      const buttons = [
        {
          text: "Update Now",
          onPress: () => {
            if (updateType === "major") {
              openStoreUrl();
            } else {
              showAlertRef.current = false;
              openStoreUrl();
            }
          },
        },
      ];

      if (updateType === "minor") {
        buttons.push({
          text: minorUpdateButtonText,
          style: minorUpdateButtonStyle,
        });
      }

      Alert.alert(title, message, buttons, {
        cancelable: updateType === "minor",
      });
    };

    const openStoreUrl = () => {
      const storeUrl = Platform.OS === "ios" ? iosStoreURL : androidStoreURL;

      Linking.openURL(storeUrl);
    };

    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "active") {
        checkForUpdate();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );

    checkForUpdate(); // Initial check on component mount

    return () => {
      subscription.remove();
    };
  }, []);

  return null; // or return your app's UI components if needed
};

export default checkForAppUpdate;
