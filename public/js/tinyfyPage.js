;(function() {
  'use strict'
  const copyButtons = document.querySelectorAll('.copy-button')

  copyButtons.forEach(button => button.addEventListener('click', copyTinyUrl))

  async function copyTinyUrl(event) {
    const tinyUrl = event.target.dataset.tinyUrl
    const textInput = document.createElement('input')
    textInput.classList.add('copy-input')
    textInput.type = 'text'
    textInput.value = tinyUrl
    document.body.appendChild(textInput)
    textInput.select()
    document.execCommand('copy')
    const successful = document.execCommand('copy')

    const msg = successful ? 'successful' : 'unsuccessful'
    console.log('Copying text command was ' + msg)

    document.body.removeChild(textInput)
  }
})()
