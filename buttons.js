// Verify that WebPage has loaded before executing any JavaScript */
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoader', ready)
} else {
    ready()
}

// // CREATING EVENT LISTNERS
function ready() {
    console.log('Ready')
    }