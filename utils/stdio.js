exports.readInput = async () => {
  return new Promise((resolve) => {
    let input = ""
    process.stdin.setEncoding("utf8")
    process.stdin.on("readable", () => {
      let chunk
      while ((chunk = process.stdin.read()) !== null) {
        input += chunk.trim()
        if (chunk.endsWith("\n")) {
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
