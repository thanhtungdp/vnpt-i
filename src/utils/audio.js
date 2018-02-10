export default function playSound(soundPath) {
  let trident = !!navigator.userAgent.match(/Trident\/7.0/)
  let net = !!navigator.userAgent.match(/.NET4.0E/)
  let ie11 = trident && net
  let ieOld = navigator.userAgent.match(/MSIE/i) ? true : false
  if (ie11 || ieOld) {
    document.all.sound.src = soundPath
  } else {
    var snd = new Audio(soundPath)
    snd.play()
  }
}
