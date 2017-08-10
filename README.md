# firebase-contact
 :mailbox: Firebase function which sends mail upon POST request
## Pre-requisites
You should, of course, already have a Firebase account and project set up. If you haven't installed the Firebase CLI tools, open a terminal and run
```
npm install -g firebase-tools
firebase login
```
and follow authentication prompts. Then set up this repository with
```
git clone https://github.com/jameslave/firebase-contact
cd firebase-contact/functions
npm i
```
:warning: Note that `node_modules` are installed in the `functions` sub-directory rather than the main project directory.

## Run
1. Inside the `firebase-contact` directory, create a `.env` file with the [parameters](https://github.com/motdotla/dotenv)
```
HOST=<<your smtp server>>
USER=<<from username>>
PASS=<<from password>>
FROM=<<from address - can omit if same as USER above>>
TO=<<send-to address>>
```
2. Also create `.firebaserc` containing
```
{
  "projects": {
    "default": "<<your project ID>>"
  }
}
```
3. Run
```
firebase deploy --only functions
```
If the stars align and you're exceptionally lucky, you should see some status messages followed by `Deploy complete!`.
