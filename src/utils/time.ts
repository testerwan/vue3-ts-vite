export const getTimeMsg = () => {
  let msg = ''
  let hours = new Date().getHours()
  if (hours < 5) {
    msg = '凌晨'
  } else if (hours <= 9) {
    msg = '早上'
  } else if (hours <= 11) {
    msg = '上午'
  } else if (hours <= 13) {
    msg = '中午'
  } else if (hours <= 18) {
    msg = '下午'
  } else if (hours <= 24) {
    msg = '晚上'
  }
  return msg
}
