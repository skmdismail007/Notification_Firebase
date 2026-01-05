
To set up Google Login perfectly, we will go **one step at a time**.

We will start with the **Google Cloud Console** setup, as nothing works without the correct IDs.

### Step 1: Create a Project in Google Cloud

1. Open the [Google Cloud Console](https://console.cloud.google.com/).
2. Click the **Project Dropdown** (top left) and select **New Project**.
3. Give it a name (e.g., "MyAuthApp") and click **Create**.

---

### Step 2: Configure the OAuth Consent Screen

Before getting IDs, Google needs to know what your app is.

1. In the sidebar, go to **APIs & Services** > **OAuth consent screen**.
2. Select **External** and click **Create**.
3. Fill in the **App Information**:
* **App name**: Your app name.
* **User support email**: Your email.
* **Developer contact info**: Your email.


4. Click **Save and Continue** through the next screens (Scopes and Test Users) until you are back at the dashboard.

---

### Step 3: Generate the "Web Client ID" (The Logic Key)

*Even though you are building a mobile app, the library requires a "Web" ID to act as the bridge.*

1. Go to **APIs & Services** > **Credentials**.
2. Click **+ Create Credentials** at the top and select **OAuth client ID**.
3. Under **Application type**, select **Web application**.
4. Name it `Web Client for Auth`.
5. Click **Create**.
6. **IMPORTANT:** A popup will show "Your Client ID". **Copy this string.** You will paste this into your React Native code later as `webClientId`.

---

### Step 4: Generate the "Android Client ID" (The Security Key)

1. Click **+ Create Credentials** > **OAuth client ID** again.
2. Under **Application type**, select **Android**.
3. **Package Name**: Open your project in VS Code and find it in:
`android/app/build.gradle` → look for `applicationId` (e.g., `com.yourname.appname`).
4. **SHA-1 Certificate Fingerprint**: You need to generate this from your computer.
* Open your terminal/command prompt.
* Type: `cd android && ./gradlew signingReport`
* Look for the **Variant: debug** section and copy the **SHA1** hex string.


5. Paste the **Package Name** and **SHA-1** into the Google Console.
6. Click **Create**.

---

### Step 5: Download the Configuration File

1. In the Credentials list, you will now see your Android Client ID.
2. Look for the **Download icon** (or the "JSON" link) for the Android entry.
3. Download it, rename it to **`google-services.json`**, and move it into your project folder at:
`android/app/google-services.json`

---

**Are you finished with these steps? Once you have the `webClientId` and the `google-services.json` file in place, tell me "Done" and I will give you the Step-by-Step for the Code Configuration.**
