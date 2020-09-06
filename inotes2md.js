#!/usr/bin/env node

const promptiCloud = require("./prompt-credentials.js");
const fs = require("fs");

function createFolderDir(name) {
    try {
        fs.mkdirSync(name);
    }
    catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }
}

function saveNote(note) {
    var outputDir = note.fields["Folder"].value["recordName"];
    var outputFile = note.shortGUID + ".md";
    var data =
        "---\n";
    for (let field in note.fields) {
        if (field !== "text" &&
            !field.endsWith("Encrypted") &&
            note.fields[field].value !== undefined &&
            !(typeof note.fields[field].value === "object")) {
            data = data + field + ": " + note.fields[field].value + "\n";
        }
        else if(typeof note.fields[field] === "string") {
            data = data + field + ": " + note.fields[field] + "\n";
        }
    }
    data = data +
        "folder: " + outputDir + "\n" +
        "---\n" +
        note.fields["text"].string;

    console.log("Writing file "+outputDir + "/" + outputFile);
    fs.writeFileSync(outputDir + "/" + outputFile, data);
    /*, err => {
        if (err) {
            console.log(err);
        }
    });*/
}

function downloadNotes(cloud) {
    const notes = cloud.Notes.fetch();
    const myCloud = cloud;

    notes.on("end", async zone => {

        if (notes.folders.length > 0) {
            var folders = notes.folders.filter(f => !f.recordName.startsWith("TrashFolder"));
            folders.forEach(async folder => {
                createFolderDir(folder.recordName);
                folder.notes
                    .filter(n => n.shortGUID)
                    .map(note => myCloud.Notes
                        .resolve(note)
                        .then(pv => pv.forEach(pve => saveNote(pve))
                        )
                    );
            });
        }

    });
}

(async () => {
    const myCloud = await promptiCloud();
    downloadNotes(myCloud);
})();



