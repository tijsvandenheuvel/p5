// usefull functions

getListOfWordsAsString = (text) => {
    new_text = text.replace(/[,.]+/g, '').toLowerCase().split(' ')
    return(new_text)
}