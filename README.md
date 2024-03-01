# Google Play Book Notes to JSON

This code is used to convert the `.docx` files creates by Google Play Books to a `.json` format, more flexible for whatever use.

**Make sure you have enabled the option**:

1. Open Google Play Books
2. Tap on your profile on the up right
3. Open "Play Books settings"
4. Make sure "Save notes, highlights and bookmarks in Google Drive"

## How to use

Open the Google Drive where your notes are saved and download them.
They should be a list of `.docx` files

1. Place the `.docx` files inside the `play-books-notes` folder
2. Type `npm run start` on the terminal
3. You should see the `play-books-notes-html` and `play-books-notes-json` populated with the requested files.

## Known issues
### New format
Recently (don't know exactly when) the `.docx` notes have been formatted in such a way that they are grouped by colors, then, down the document, you can find the previous format where they are grouped by the progress in the book, showing the chapters associated with them.

This new format makes my job easier as there's less code required to categorize the color of the note. But **older notes may not have been updated.** 

In case of error, **open the book and make whatever edit in the notes for the update to take place.**

### Language
I have a book in english, but the notes file is in another language. Unfortunately the code takes for granted that the notes are in english, using the titles and color definititions for grouping.

If for some reason your play book notes do not begin with "Notes from <BOOK_NAME>" this code will not work. Though you are free to modify it to your needs or open a pull requests.
