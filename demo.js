async function doAsync() {
  await new Promise((res) => setTimeout(() => res(42), 2000))
  console.log("after await in doAsync")
}

;(async () => {
  await doAsync()
  console.log("after call doAsync")
})()
