iNotes2MD
=========

A small tool to export iCloud notes to a local directory.

All folders except for the trash are exported to local subdirectories.
Notes in the folders will be put into the subdirectories; the file name will be the "shortGUID" of the note + ".md".

On startup the script will ask you for your iCloud credentials, possibly triggering a 2FA login.
The session with the login will be saved in a local file.

* On Microsoft Windows: %USERPROFILE%\.icloud-session.json 
* On macOS and Linux: ~/.icloud-session.json

The script is based heavily on the work of Maurice Conrad: https://github.com/MauriceConrad/iCloud-API

Installation
------------

The script is not available on npmjs.com. You need to install it from GitHub directly:

```
npm install -g zudljk/inotes2md
```

Usage
-----

```
user@host # cd <target dir>
user@host # inotes2md
```

The script will download all your iCloud notes to the current directory, creating subdirectories for your notes folders.
Your trash folder (where iCloud stores deleted notes for up to 30 days) will NOT be downloaded.

Known issues
------------

* Some notes seem to cause problem when trying to download them; they appear in the folder overview but can't be resolved. These notes will be skipped.