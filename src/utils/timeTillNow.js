export function timeTillNow(data) {
  const date = new Date(data)
  const today = new Date()
  const timeDiff = today.getTime() - date.getTime()
  const daysDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24))
  return daysDiff
}