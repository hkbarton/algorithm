exports.readInput = async (terminator) => {
  return new Promise((resolve) => {
    let input = ""
    process.stdin.setEncoding("utf8")
    process.stdin.on("readable", () => {
      let chunk
      while ((chunk = process.stdin.read()) !== null) {
        input += chunk.trim()
        if (chunk.endsWith(terminator)) {
          process.stdin.destroy()
          break
        }
      }
    })
    process.stdin.on("close", () => {
      resolve(input)
    })
  })
}
