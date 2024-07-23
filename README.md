## 📲 `React Native App Update Alert` Function

### 🌟 Description

This function meticulously monitors updates for your mobile app by comparing the local version with the latest versions available on iOS and Android app stores. It intuitively alerts users to both major and minor updates, seamlessly guiding them through app store redirections for updates.

### Props

| Name                     | Type   | Description                                                                                       | Default Value                                                                 |
| ------------------------ | ------ | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `iosStoreURL`            | String | The App Store URL for iOS where the app update can be downloaded.                                 | -                                                                             |
| `androidStoreURL`        | String | The Play Store URL for Android where the app update can be downloaded.                            | -                                                                             |
| `country`                | String | (Optional) Country code to specify the country for regional app store updates. Default is `"us"`. | `"us"`                                                                        |
| `majorUpdateTitle`       | String | Title for the major update alert.                                                                 | `"Update Required"`                                                           |
| `majorUpdateMessage`     | String | Message for the major update alert.                                                               | `"A major update is available. Please update your app to continue using it."` |
| `minorUpdateTitle`       | String | Title for the minor update alert.                                                                 | `"Update Available"`                                                          |
| `minorUpdateMessage`     | String | Message for the minor update alert.                                                               | `"A minor update is available. Would you like to update now?"`                |
| `minorUpdateButtonText`  | String | Text for the button in the minor update alert to postpone the update.                             | `"Later"`                                                                     |
| `minorUpdateButtonStyle` | String | Style for the button in the minor update alert (`"cancel"` or `"default"`).                       | `"cancel"`                                                                    |

### Example Usage

```javascript
import checkForAppUpdate from './path/to/checkForAppUpdate';

const YourComponent = () => {
  // Example usage with required props
  useEffect(() => {
    checkForAppUpdate({
      iosStoreURL: "https://apps.apple.com/app-id",
      androidStoreURL: "https://play.google.com/store/apps/details?id=your.package.name",
    });
  }, []);

  // Your component's UI or logic
  return (
    // Your component's JSX
  );
};
```

## 🚀 Contributions and License

Contributions are welcome! Feel free to fork the repository, create pull requests, and suggest new features or improvements. Please ensure to follow the guidelines in the [CONTRIBUTING.md](link-to-contributing-file) file.

This project is licensed under the MIT License.

## Created By

<img src="https://github.com/Raiden-16F7/TourXpress/blob/master/Social-handle-(Dark)-[remix].gif" alt="TourXpress Logo" width="450" height="150" />
