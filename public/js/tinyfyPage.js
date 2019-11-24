;(function() {
  'use strict'
  const copyButtons = document.querySelectorAll('.copy-button')
  const closeables = document.querySelectorAll('.closeable')

  copyButtons.forEach(button => button.addEventListener('click', copyTinyUrl))
  closeables.forEach(closeable =>
    closeable.addEventListener('click', closeNotification, { once: true })
  )

  function copyTinyUrl(event) {
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

    const feedback = successful ? 'Copied' : 'Failed'
    const feedbackClasses = successful ? 'copy-success' : 'copy-fail'

    const originalButtonText = button.innerText
    button.classList.add(feedbackClasses)
    button.innerText = feedback
    setTimeout(() => {
      button.classList.remove(feedbackClasses)
      button.innerText = originalButtonText
    }, 1000)
  }

  function closeNotification(event) {
    event.target.parentElement.remove()
  }
})()
