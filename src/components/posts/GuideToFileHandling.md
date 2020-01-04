# Using Files in Client-Side JavaScript

## An in depth guide to FileReader API and object URLs.

This guide covers:

- using **objectURLs** and **FileReader** to read files from the user's filesystem
- getting a file's information like: size, type and more
- showing previews of selected image files
- handling errors and loading states

It also acts as an introduction to my guide on using the `Canvas` API, which is coming very soon, so stay tuned for that!

---

# Selecting files from the filesystem

To allow your users to select a file from their device, you will first have to create an `input` with the type of **file**.

```html
<input type="file" id="inputElement" />
```

To actually get the files from this input, you will need to access the `files` property of the input element. It's best to do that by registering a **change** event listener on the input element. This way a callback function will be called every time a user selects a file.

The way you do that will depend on the framework you're using. To make this guide as widely applicable as possible, we will be using vanilla JS.

```javascript
// get a reference to the inputElement in any way you choose
const inputElement = document.getElementById("inputElement")

// get the value once
inputElement.files[0]

// get the value every time the user selects a new file
inputElement.addEventListener("change", (e) => {
  // e.target points to the input element
  const selectedFile = e.target.files[0]
})
```

The resulting **selectedFile** is a `File` object.

---

# Properties of files

The file input gives us `File` objects, so in addition to the contents of the file itself, we have access to some additional information, such as:

- `name` - the file's name, including the extension but without the path (e.g. "cat_photo.png")
- `size` - the file's size in bytes. To get the size in a more human readable format, you can use a library like [filesize](https://www.npmjs.com/package/filesize) or [bytes](https://www.npmjs.com/package/bytes). For simple use cases, you can even write your own conversion logic.
- `type` - the file's [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) (e.g. "text/plain", "image/png")
- `lastModified` - the last modified date of the file, represented as the number of milliseconds since the Unix epoch (January 1, 1970 at midnight). You can use the [Date constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) to convert this timestamp to a more useful javascript `Date` object.

`File`s also have two other properties: `File.lastModifiedDate` and `File.webkitRelativePath`, the first of which is deprecated and the other non-standard, so you should probably avoid using them. Keep in mind that all of these properties are read-only.

## Files & Blobs

In addition to `File`, javascript has another way of representing files, called `Blob`

`Blob` contains a generic file's data, along with information about its size and type. `File` is actually just a more specialised `Blob`, used to represent specifically files in a user's filesystem. It inherits all of Blob's methods and properties and contains some additional information about the file's name and last modified date.

These two are basically interchangeable, and you can use one almost everywhere you can use the other. If you absolutely need to convert them though, you can do so using the other type's constructor.

```javascript
const file = new File([blob], "fileName", { type: blob.type })
const blob = new Blob([file], { type: file.type })
```

---

# Reading the contents of files

Okay, so we know how to select and get information about files, but how do we actually read what's inside them? Well, that depends on what kind of file it is and what you want to do with it. For the purposes of this article, we will only focus on images and text files.

The most flexible and well-supported method of reading a file's contents is the [FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader). It's an event driven API, so instead of simply calling a function and getting the file's contents, we must take some extra steps.

Let's start with reading a text file:

```javascript
const inputElement = document.getElementById("inputElement")

inputElement.onchange = (e) => {
  const file = inputElement.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    // e.target points to the reader
    const textContent = e.target.result
    console.log(`The content of ${file.name} is ${textContent}`)
  }
  reader.onerror = (e) => {
    const error = e.target.error
    console.error(`Error occured while reading ${file.name}`, error)
  }
  reader.readAsText(file)
}
```

1. First we get the file input element, and register a **change** event listener on it by assigning a callback function to its `onchange` property
2. We get the selected file
3. We check if a file was actually selected and if not, (which might happen for example if a user clicks 'cancel' in the selection window) we exit the function
4. Next, we create an instance of FileReader
5. Then we register any event handlers we might need. To access the file contents we only really need the **load** event, which triggers when the read operation has finished **succesfully**. However it's usually a good idea to register an error handler as well. A full list of possible events is available a bit further into the article, along with some error handling tips, so keep reading 😉
6. **After** all event listeners are registered, we initiate the read operation by calling one of the **readAs** methods, in this case `readAsText`
7. After the reading operation is finished, the file contents will be available in the `reader.result` property, which we can access inside the **load** event handler (the `reader.onload` callback function).

**Quick tip:** You can access the reader inside an event handler in multiple ways: `reader === e.target === this`. Keep in mind that `this` is not available in arrow functions.

```javascript
reader.onchange = () => console.log(reader.result) // closure
reader.onchange = (e) => console.log(e.target.result) // event target
reader.onchange = function() => console.log(this.result) // 'this'
```

## Error Handling

In case of an error, the _error_ event handler is called, and you can find the Error object in `reader.error`. Possible error codes are:

- `FileError.NOT_FOUND_ERR` - the file was not found
- `FileError.NOT_READABLE_ERR` - the file could not be read
- `FileError.SECURITY_ERR` - there was a security issue
- `FileError.ABORT_ERR` - thrown when `reader.abort()` is called while there's no read operation in progress

Most of the time there is no need to differentiate between these error types, maybe except for `ABORT_ERR` which is generally harmless and can be ignored.

## Ready State

The read operation is **asynchronous**, so don't try accessing `reader.result` right after the **readAs** call. If you really need to check the `reader.result` value outside of the **load** event handler, make sure to first check the value of `reader.readyState`, which will be one of 3 values:

- `0` - The reader has been created, but no **readAs** method was called yet. (EMPTY)
- `1` - One of the **readAs** methods has been called. A read operation is in progress, and no errors have occurred yet. (LOADING)
- `2` - The operation has finished. This could mean one of three things: the `File` has been read succesfully, a read error has occured, or `reader.abort()` was called and the operation was canceled. (DONE)

The `reader.result` property will be populated only in case of a successful read operation. In all other cases it will be `null`.

```javascript
const reader = new FileReader()
// readyState is 0, result is null
reader.onload = () => {
  // readyState is 2, result is the file's content
}
reader.onerror = () => {
  // readyState is 2, result is null
}
// readyState is 0, result is null
reader.readAsText(file)
// readyState is 1, result is null
```

The same applies to `reader.error` which should be accessed inside the **error** event handler.

## FileReader Event Types

We've already explored the two most common read event types, now let's quickly cover the rest. FileReader has six event types:

- `load` - triggered when a read operation is **successfully** completed
- `error` - triggered when a read operation encounters an error
- `progress` - triggered periodically while a `File` or `Blob` is being read and contains information about the progress of the operation. Can be used to implement loading bars.
- `abort` - triggered when a read operation is cancelled, i.e. when `reader.abort()` is called
- `loadstart` - triggered when a read operation starts
- `loadend` - triggered when a read operation is finished, regardless of if it succeeded or failed

You've probably noticed that FileReader events work similarly to regular DOM events. I find that thinking about them as such makes it a lot easier to understand their non-linear, asynchronous nature.

💡 **Sidenote:** Just as with DOM events, it's possible to register event handlers by using `addEventListener`, or by assigning a callback function to the "oneventname" property of a reader.

## Blob.text()

It's also worth noting that for reading text files there exists a newer and simpler method: `Blob.text()`. Remember that `File` is just a `Blob` with some added functionality, so it inherits all of Blob's methods, including this one. This means you can use this method on both Blobs and Files.

```javascript
// using promise.then()
file.text().then(text => /* do something */);
// using async/await
const text = await file.text();
```

Doesn't it look nicer? I think it does, but there's a catch. This API is quite new and the [browser support](https://caniuse.com/#feat=mdn-api_blob_text) is still pretty poor.

---

# Working with images

Now that we know how to read text files, let's move on to something more exciting: images. To illustrate this topic, we're going to build a simple preview of the selected image.

## File types

First let's make sure that the selected file is actually an image. We can do that with the help of the `accept` attribute.

```html
<!-- any image type will be accepted -->
<input type="file" accept="image/*" />
<!-- only .png, .jpg, and .gif files will be accepted -->
<input type="file" accept="image/png, image/jpeg, image/gif" />
```

The `accept` attribute, allows you to specify what kind of files the user will be allowed to select. It uses a comma-separated list of unique file type specifiers. Each type specifier can be in one of the following formats:

- A case-insensitive filename extension, starting with a period (".") character. For example: `.jpg`, `.JPEG`, `.gif`, `.doc`
- A [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types), for example: `image/jpeg`, `image/png`, `text/plain`, `audio/wav`
- `image/*` which means "any image file"
- `audio/*` which means "any audio file"
- `video/*` which means "any video file"

You can mix and match these to suite your particular use-case.

HTML validation isn't perfect though. For example, on Windows it will only hide the files not matching your criteria, but you can still select "All files (\*.\*)" or use drag-and-drop to select any file you want. All of this means that it's also a good idea to check the file type inside your javascript code.

```javascript
// allows any image file
if (file.type.startsWith("image/")) {
  /* handle the files */
}

// only allows specified types
if (["image/png", "image/jpeg"].includes(file.type)) {
  /* handle the files */
}
```

Or you could set up separate processing flows for different file types

```javascript
// assuming that processImage and processText are functions
if (file.type.startsWith("image/")) {
  reader.onload = processImage
  reader.readAsDataURL(file)
} else if (file.type.startsWith("text/")) {
  reader.onload = processText
  reader.readAsText(file)
}
```

Unfortunately `startsWith()` and `includes()` don't work in older browsers like Internet Explorer, so if you need to support them, you might want to look into some workarounds or polyfills.

Also, keep in mind that "any image file" will match (among others):

- images with less-than-perfect browser support, like `webp`
- images with transparency, like `png`
- animated images, like `gif`'s

So make sure you support all of these functionalities, or explicitly specify only the types you plan on supporting.

## Data URLs & Object URLs

To display a selected image, we will need an HTML img and a URL for the `img.src` attribute. There are two different ways to represent an image file as a URL: a **dataURL** and **objectURL**. There are some important differences between the two, so let's quickly run through them.

**DataURL**

It's the result of `reader.readAsDataURL()`. It's a string containing the file's type and the actual binary data of the file, encoded using base64.

It's format can vary a bit depending on the type of data it represents, but for most files it looks like this: `data:<mediatype>;base64,<data>`, where `<mediatype>` is a [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) and `<data>` is the base64-encoded file.

Because it actually contains the file's data, it can be used anywhere after it's generated, without the need for the original file. Pretty cool!

**ObjectURL**

Also known as **blob URL**. It's the result of `URL.createObjectURL()`. It is a newer API, but still [pretty well supported](https://caniuse.com/#feat=bloburls). It won't however work in IE version 9 and lower.

It's faster and more concise than `FileReader` but it comes with its own set of headaches and limitations. In contrast to dataURL, it doesn't contain any file data. It's just a reference to a file. Another important difference is the fact that `URL.createObjectURL()` is **synchronous**.

The objectURL has to be revoked when it is no longer needed. The browser will do it automatically when the document is unloaded, however for optimal performance and memory usage, you shouldn't rely on that behavior, especially in large applications with many objectURLs. Instead you should explicitly call `URL.revokeObjectURL()` when the url is no longer needed, for example in the `image.onload` event handler, which we will discuss later.

💡 **Sidenote** - to get the base64-encoded file data from a dataURL, simply extract the part of the string after the comma, like this: `dataUrl.slice(dataUrl.indexOf(",") + 1)`

## Displaying selected images

Most of the time objectURLs and dataURLs can be used interchangeably, but they each have their own strengths and weaknesses. This means you should probably learn both and choose which one to use on a case-by-case basis. Let's look at examples of both of them, to get a better feeling for how each one works.

```html
<!-- HTML markup for the next two examples -->
<input type="file" id="inputElement" accept="image/*" />
<div id="previewContainer">
  <!-- The preview will go here -->
</div>
```

**Using FileReader & dataURLs**

```javascript
const inputElement = document.getElementById("inputElement")
const previewContainer = document.getElementById("previewContainer")

inputElement.onchange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = document.createElement("img")
    const dataURL = e.target.result
    img.src = dataURL
    previewContainer.appendChild(img)
  }
  reader.readAsDataURL(file)
}
```

1. We register a **change** event listener on the file input
2. Inside the `onchange` callback, we get the selected file and create an instance of `FileReader`
3. We register a **load** event listener on the reader
4. Inside the `onload` callback we create a new image element,
5. Then we get the dataURL from `reader.result` (remember, `e.target` points to the `reader`) and assign it to the `img.src` attribute like we would in HTML
6. Once the **src** attribute is set, we append the entire `img` element to the DOM as a child of our **previewContainer**. (We actually could have just created the `img` tag in HTML and updated the **src** attribute in javascript, but doing it this way actually prepares us for working with multiple images at once, and manipulating images in a `Canvas`)
7. When everything is set, we start the read operation using `reader.readAsDataURL(file)`, which will trigger our `onload` listener when it finishes reading the file.

**Using objectURLs**

```javascript
const inputElement = document.getElementById("inputElement")
const previewContainer = document.getElementById("previewContainer")

inputElement.onchange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const img = document.createElement("img")
  img.onload = (e) => {
    URL.revokeObjectURL(e.target.src) // optional, but recommended
  }
  const objectURL = URL.createObjectURL(file)
  img.src = objectURL
  previewContainer.appendChild(img)
}
```

1. We register a **change** event listener on the file input
2. Inside the `onchange` callback, we get the selected file and create a new image element
3. We register a **load** event handler on the image
4. Inside the `onload` callback, `URL.revokeObjectURL()` will revoke the objectURL once the image is fully loaded and the url is no longer needed. This step is not necessary, but highly recommended. Keep in mind that if you are going to need that url somewhere else later, you shouldn't revoke it yet.
5. Once the image is fully loaded, we won't need the objectURL anymore. So inside the `onload` callback, we revoke that url. To do that, we pass it as an argument to `URL.revokeObjectURL()`. We can get the url straight from the image's **src** attribute.
6. We create the objectURL, by passing the selected file as an argument to `URL.createObjectURL()` and assign it to the `img.src` attribute.
7. Once the **src** attribute is set, we append the entire `img` element to the DOM as a child of our **previewContainer**.

💡 **Sidenote:** Elsewhere you might see images created by using the Image constructor i.e. `const img = new Image()`. Most of the time it's equivalent to `document.createElement("img")` and I've never had any problems with either of them. However there might be some edge cases (described in this [StackOverflow thread](https://stackoverflow.com/questions/6241716/is-there-a-difference-between-new-image-and-document-createelementimg)), which seem to make the latter a more reliable option.

---

## FileList

Before we move on to reading multiple files, let's clear something up. The `files` property isn't actually an `Array`, even though it looks like one 😮. It's a special `FileList` data type. This means it doesn't have access to the normal array methods (like `map`, `forEach`, `reduce`), so to iterate over the list you will have to get creative. I will show you a few different ways to do this, but if you want to know more, check out this [StackOverflow thread](https://stackoverflow.com/questions/40902437/cant-use-foreach-with-filelist).

```javascript
// use a 'for' loop
for (let i = 0; i < files.length; i++) {
  /* ... */
}

// use a 'for...of' loop
for (let file of files) {
  /* ... */
}

// below, I used 'forEach' as an example but it'll work with any array method

// call the function with a bound 'this'
Array.prototype.forEach.call(files, file => {/* ... */})
[].forEach.call(files, file => {/* ... */})

// use ES6 spread syntax to transform it into an Array
[...files].forEach(files, file => {/* ... */})

// use Array.from() to transform it into an Array (equivalent to spread syntax)
Array.from(files).forEach(files, file => {/* ... */})
```

You might also have noticed that even though we've only been working with a singe file (until now), we always had to write `files[0]`. That's because regardless of whether the `multiple` attribute is set or not, `inputElement.files` is always a `FileList`. This means that even if the input only accepts a single file, you still have to provide the index, which in the case of an only item is 0.

```javascript
// get number of selected files
let numFiles = inputElement.files.length

let file
// get a single file
file = inputElement.files[0]
// or using the special 'FileList.item()' method
file = inputElement.files.item(0)
```

💡 **Sidenote** - According to the [w3c working draft](https://w3c.github.io/FileAPI/#filelist-section), `FileList` might be replaced by a regular `Array` in the near future. Fingers crossed 🤞

> The FileList interface should be considered "at risk" since the general trend on the Web Platform is to replace such interfaces with the Array platform object in ECMAScript [ECMA-262]. In particular, this means syntax of the sort filelist.item(0) is at risk; most other programmatic use of FileList is unlikely to be affected by the eventual migration to an Array type.

---

# Reading Multiple Files

By default the file input only allows us to select a single file. To allow selecting multiple files at once, add the `multiple` attribute to the html element.

```html
<input type="file" multiple />
```

In this example I'll be using `FileReader` because it's asynchronous and won't block the UI when processing many files. But if you want to you can use objectURLs instead and in most cases you should be fine.

Because we've already done most of this before, I'll only use comments to call out important bits of the code. If you skipped the previous sections, I recommend you go back and catch up, I'll wait 😉

```html
<!-- Modified HTML from the previous example. Notice the 'multiple' attribute -->
<input type="file" id="inputElement" accept="image/*" multiple />
<ul id="previewList">
  <!-- The previews will go here, inside individual list items -->
</ul>
```

```javascript
const inputElement = document.getElementById("inputElement")
const previewList = document.getElementById("previewList")

inputElement.onchange = (e) => {
  const files = Array.from(e.target.files) // transform FileList into an Array

  files.forEach((file) => {
    if (!file) return // if you use a regular 'for' loop, use continue instead

    // if the file isn't an image, we skip it
    if (!file.type.startsWith("image/")) return

    // create a separate reader for every file to avoid conflicts
    const reader = new FileReader()

    reader.onload = (e) => {
      const listItem = document.createElement("li")
      const img = document.createElement("img")

      const dataURL = e.target.result
      img.src = dataURL
      img.height = 100 // set a uniform height for all images (optional)

      listItem.appendChild(img)
      previewList.appendChild(listItem)
    }

    reader.readAsDataURL(file)
  })
}
```

As you can see, we create a separate `FileReader` instance for every file. The same could probably be achieved by calling `readAsDataURL` inside a `loadend` event handler, but this does the job and is probably faster anyway.

---

Like I said at the beginning I'm currently working on part 2 of this guide, which will cover the Canvas API, so consider following me here, or on [my twitter](https://twitter.com/HadrysMateusz), to know when it comes out.
