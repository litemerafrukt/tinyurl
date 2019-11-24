;(function() {
  'use strict'
  const copyButtons = document.querySelectorAll('.copy-button')

  copyButtons.forEach(button => button.addEventListener('click', copyTinyUrl))

  async function copyTinyUrl(event) {
    const button = event.target
    const tinyUrl = button.dataset.tinyUrl
    const textInput = document.createElement('input')

    textInput.classList.add('copy-input')
    textInput.type = 'text'
    textInput.value = tinyUrl
    document.body.appendChild(textInput)
    textInput.select()
    document.execCommand('copy')

    const successful = document.execCommand('copy')
    document.body.removeChild(textInput)

    const feedback = successful ? 'Copied!' : 'Failed :('
    const feedbackClass = successful ? 'copy-success' : 'copy-fail'

    const originalButtonText = button.innerText
    button.classList.add(feedbackClass)
    button.innerText = feedback
    setTimeout(() => {
      button.classList.remove(feedbackClass)
      button.innerText = originalButtonText
    }, 1000)
  }
})()
